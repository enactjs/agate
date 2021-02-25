/* eslint-disable react/jsx-no-bind */

/**
 * A internal Picker component.
 *
 * @module agate/internal/Picker
 * @exports Picker
 * @exports PickerDecorator
 * @private
 */

import {adaptEvent, forEventProp, forward, handle, oneOf, stop, stopImmediate} from '@enact/core/handle';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import Touchable from '@enact/ui/Touchable';
import {SlideLeftArranger, SlideTopArranger, ViewManager} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import {Children,Component} from 'react';

import $L from '../$L';
import {PickerItem} from './Picker';
import Skinnable from '../../Skinnable';

import css from './Picker.module.less';
import platform from "../../../enact/packages/core/platform";
import {cap, Job, mergeClassNameMaps} from "../../../enact/packages/core/util";
import Spotlight, {getDirection} from "../../../enact/packages/spotlight";
import Layout, {Cell} from "../../../enact/packages/ui/Layout";
import classnames from "classnames";

import ReactDOM from 'react-dom';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

const wrapRange = (min, max, value) => {
	if (value > max) {
		return min + (value - max - 1);
	} else if (value < min) {
		return max - (min - value - 1);
	} else {
		return value;
	}
};

/**
 * The base component for {@link agate/internal/Picker.Picker}.
 *
 * @class Picker
 * @memberof agate/internal/Picker
 * @ui
 * @private
 */
const PickerBase = class extends Component {
	static displayName = 'Picker';

	static propTypes = /** @lends agate/internal/Picker.Picker.prototype */ {
		/**
		 * Index for internal ViewManager
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		index: PropTypes.number.isRequired,

		/**
		 * The maximum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/Picker.Picker.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		max: PropTypes.number.isRequired,

		/**
		 * The minimum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/Picker.Picker.step}.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		min: PropTypes.number.isRequired,

		/**
		 * Accessibility hint
		 *
		 * For example, `hour`, `year`, and `meridiem`
		 *
		 * @type {String}
		 * @default ''
		 * @public
		 */
		accessibilityHint: PropTypes.string,

		/**
		 * The "aria-label" for the picker.
		 *
		 * By default, `aria-valuetext` is set to the current value.
		 * This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Overrides the `aria-valuetext` for the picker. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the picker directly through the props.
		 *
		 * @type {String|Number}
		 * @memberof agate/internal/Picker.Picker.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

		/**
		 * Children from which to pick
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Class name for component.
		 *
		 * @type {String}
		 * @public
		 */
		className: PropTypes.string,

		/**
		 * Customize component style
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Sets the hint string read when focusing the decrement button.
		 *
		 * @type {String}
		 * @default 'previous item'
		 * @public
		 */
		decrementAriaLabel: PropTypes.string,

		/**
		 * Disables the picker.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The picker id reference for setting aria-controls.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the increment button.
		 *
		 * @default 'next item'
		 * @type {String}
		 * @public
		 */
		incrementAriaLabel: PropTypes.string,

		/**
		 * By default, the picker will animate transitions between items if it has a defined
		 * `width`. Specifying `noAnimation` will prevent any transition animation for the
		 * component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * A function to run when the control should increment or decrement.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * A function to run when the picker is removed while retaining focus.
		 *
		 * @type {Function}
		 * @private
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Orientation of the picker.
		 *
		 * Controls whether the buttons are arranged horizontally or vertically around the value.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @default 'vertical'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * When it's `true` it changes the direction of the transition animation.
		 *
		 * @type {Boolean}
		 * @public
		 */
		reverseTransition: PropTypes.bool,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,

		/**
		 * When `true`, the component cannot be navigated using spotlight.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * Allow the picker to only increment or decrement by a given value.
		 *
		 * A step of `2` would cause a picker to increment from 10 to 12 to 14, etc. It must evenly
		 * divide into the range designated by `min` and `max`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The type of picker. It determines the aria-label for the next and previous buttons.
		 *
		 * Depending on the `type`, `decrementAriaLabel`, and `incrementAriaLabel`,
		 * the screen readers read out differently when Spotlight is on the next button, the previous button,
		 * or the picker itself.
		 *
		 * For example, if Spotlight is on the next button
		 * and aria label props(`decrementAriaLabel` and `incrementAriaLabel`) are not defined,
		 * then the screen readers read out as follows.
		 *	`'string'` type: `'next item'`
		 * 	`'number'` type: `'increase the value'`
		 *
		 * @type {('number'|'string')}
		 * @default 'string'
		 * @public
		 */
		type: PropTypes.oneOf(['number', 'string']),

		/**
		 * Index of the selected child.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		value: PropTypes.number,

		/**
		 * Choose a specific size for your picker. `'small'`, `'medium'`, `'large'`, or set to `null` to
		 * assume auto-sizing. `'small'` is good for numeric pickers, `'medium'` for single or short
		 * word pickers, `'large'` for maximum-sized pickers.
		 *
		 * You may also supply a number. This number will determine the minimum size of the Picker.
		 * Setting a number to less than the number of characters in your longest value may produce
		 * unexpected results.
		 *
		 * @type {('small'|'medium'|'large'|Number)}
		 * @public
		 */
		width: PropTypes.oneOfType([
			PropTypes.oneOf([null, 'small', 'medium', 'large']),
			PropTypes.number
		]),

		/**
		 * Should the picker stop incrementing when the picker reaches the last element? Set `wrap`
		 * to `true` to allow the picker to continue from the opposite end of the list of options.
		 *
		 * @type {Boolean}
		 * @public
		 */
		wrap: PropTypes.bool
	};

	static defaultProps = {
		accessibilityHint: '',
		orientation: 'vertical',
		step: 1,
		type: 'string',
		value: 0
	};

	scrollHanders = (() => {
		let scrollY = -1;
		let lastY = 0;
		let startY = 0;
		let scrollDisabled = false;
		let isMoving = false;

		const setTransform = (nodeStyle, value) => {
			nodeStyle.transform = value;
			nodeStyle.webkitTransform = value;
		};

		const setTransition = (nodeStyle, value) => {
			nodeStyle.transition = value;
			nodeStyle.webkitTransition = value;
		};

		const scrollTo = (_x, y, time = .3) => {
			if (scrollY !== y) {
				scrollY = y;
				if (time && !this.props.noAnimate) {
					setTransition(this.contentRef.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`);
				}
				setTransform(this.contentRef.style, `translate3d(0,${-y}px,0)`);
				setTimeout(() => {
					this.scrollingComplete();
					if (this.contentRef) {
						setTransition(this.contentRef.style, '');
					}
				}, +time * 1000);
			}
		};

		const Velocity = ((minInterval = 30, maxInterval = 100) => {
			let _time = 0;
			let _y = 0;
			let _velocity = 0;
			const recorder = {
				record: (y) => {
					const now = +new Date();
					_velocity = (y - _y) / (now - _time);
					if (now - _time >= minInterval) {
						_velocity = now - _time <= maxInterval ? _velocity : 0;
						_y = y;
						_time = now;
					}
				},
				getVelocity: (y) => {
					if (y !== _y) {
						recorder.record(y);
					}
					return _velocity;
				},
			};
			return recorder;
		})();

		const onFinish = () => {
			isMoving = false;
			let targetY = scrollY;
			const height = ((this.props.children).length - 1) * this.itemHeight;

			let time = .3;

			const velocity = Velocity.getVelocity(targetY) * 4;
			if (velocity) {
				targetY = velocity * 40 + targetY;
				time = Math.abs(velocity) * .1;
			}

			if (targetY % this.itemHeight !== 0) {
				targetY = Math.round(targetY / this.itemHeight) * this.itemHeight;
			}

			if (targetY < 0) {
				targetY = 0;
			} else if (targetY > height) {
				targetY = height;
			}

			scrollTo(0, targetY, time < .3 ? .3 : time);
			this.onScrollChange();
		};

		const onStart = (y) => {
			if (scrollDisabled) {
				return;
			}

			isMoving = true;
			startY = y;
			lastY = scrollY;
		};

		const onMove = (y) => {
			if (scrollDisabled || !isMoving) {
				return;
			}

			scrollY = lastY - y + startY;
			Velocity.record(scrollY);

			this.onScrollChange();
			setTransform(this.contentRef.style, `translate3d(0,${-scrollY}px,0)`);
		};

		return {
			touchstart: (evt) => onStart(evt.touches[0].pageY),
			mousedown: (evt) => onStart(evt.pageY),
			touchmove: (evt) => {
				evt.preventDefault();
				onMove(evt.touches[0].pageY);
			},
			mousemove: (evt) => {
				evt.preventDefault();
				onMove(evt.pageY);
			},
			touchend: () => onFinish(),
			touchcancel: () => onFinish(),
			mouseup: () => onFinish(),
			getValue: () => {
				return scrollY;
			},
			scrollTo,
			setDisabled: (disabled = false) => {
				scrollDisabled = disabled;
			},
		};
	})();

	constructor (props) {
		super(props);



		this.initContentRef = this.initRef('contentRef');
		this.initRootRef = this.initRef('rootRef');
		this.initIndicatorRef = this.initRef('indicatorRef');

		let selectedValueState;
		const { value, defaultSelectedValue } = this.props;

		if (value !== undefined) {
			const children = Children.toArray(this.props.children);
			//console.log(children);
			selectedValueState = children[value];
			console.log(selectedValueState);
		} else if (defaultSelectedValue !== undefined) {
			selectedValueState = defaultSelectedValue;
		} else {
			const children = Children.toArray(this.props.children);
			selectedValueState = children && children[0] && children[0].value;
		}
		this.state = {
			itemHeight: 0,
			selectedValue: selectedValueState
		};


		// const { value, defaultValue } = this.props;
		// if (value !== undefined) {
		// 	selectedValueState = value;
		// } else if (defaultValue !== undefined) {
		// 	selectedValueState = defaultValue;
		// } else {
		// 	console.log(this.props.children);
		// 	const children = Children.toArray(this.props.children);
		// 	selectedValueState = children && children[0] && children[0].props.value;
		// }

	}

	componentDidMount () {
		//this.contentRef.addEventListener('wheel', this.handleWheel);
		const { contentRef, rootRef, indicatorRef } = this;
		const rootHeight =  rootRef.getBoundingClientRect().height;
		const itemHeight = this.itemHeight = indicatorRef.getBoundingClientRect().height;
		let num = Math.floor(rootHeight / itemHeight);
		if (num % 2 === 0) {
			num--;
		}
		num--;
		num /= 2;
		
		contentRef.style.padding = `${itemHeight * num}px 0`;
		indicatorRef.style.top = `${itemHeight * num}px`;

		//this.scrollHanders.setDisabled(this.props.disabled);
		this.select(this.state.selectedValue, this.itemHeight, this.scrollTo);

		const passiveSupported = this.passiveSupported();
		const willPreventDefault = passiveSupported ? { passive: false } : false;
		const willNotPreventDefault = passiveSupported ? { passive: true } : false;
		Object.keys(this.scrollHanders).forEach(key => {
			if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
				const pd = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault;
				(rootRef).addEventListener(key, this.scrollHanders[key], pd );
			}
		});

	}

	passiveSupported() {
		let passiveSupported = false;

		try {
			const options = Object.defineProperty({}, 'passive', {
				get: () => {
					passiveSupported = true;
				},
			});
			window.addEventListener('test', null , options);
		} catch (err) { }
		return passiveSupported;
	}

	componentDidUpdate (prevProps) {
		this.select(this.state.selectedValue, this.itemHeight, this.scrollToWithoutAnimation);
	}

	componentWillUnmount () {

		this.contentRef.removeEventListener('wheel', this.handleWheel);
	}

	scrollTo = (top) => {
		this.scrollHanders.scrollTo(0, top);
	}

	scrollToWithoutAnimation = (top) => {
		this.scrollHanders.scrollTo(0, top, 0);
	}

	computeChildIndex(top, itemHeight, childrenLength) {
		const index = Math.round(top / itemHeight);
		return Math.min(index, childrenLength - 1);
	}

	onScrollChange = () => {
		const top = this.scrollHanders.getValue();
		if (top >= 0) {
			const children = Children.toArray(this.props.children);
			const index = this.computeChildIndex(top, this.itemHeight, children.length);
			if (this.scrollValue !== index) {
				this.scrollValue = index;
				const child = children[index];
				if (child && this.props.onScrollChange) {
					this.props.onScrollChange(child);
				} else if (!child && console.warn) {
					console.warn('child not found', children, index);
				}
			}
		}
	}

	scrollingComplete = () => {
		const top = this.scrollHanders.getValue();
		if (top >= 0) {
			this.doScrollingComplete(top, this.itemHeight, this.fireValueChange);
		}
	}

	doScrollingComplete = (top, itemHeight, fireValueChange) => {
		const children = Children.toArray(this.props.children);
		const index = this.computeChildIndex(top, itemHeight, children.length);
		const child = children[index];
		console.log(index);
		if (child) {
			fireValueChange(child);
		} else if (console.warn) {
			console.warn('child not found', children, index);
		}
	}

	select = (value, itemHeight, scrollTo) => {
		const children = Children.toArray(this.props.children);
		for (let i = 0, len = children.length; i < len; i++) {
			if (children[i] === value) {
				this.selectByIndex(i, itemHeight, scrollTo);
				return;
			}
		}
		this.selectByIndex(0, itemHeight, scrollTo);
	}

	fireValueChange = (selectedValue) => {
		if (selectedValue !== this.state.selectedValue) {
			if (!('selectedValue' in this.props)) {
				this.setState({
					selectedValue,
				});
			}
			if (this.onValueChange) {
				this.onValueChange(selectedValue);
			}
		}
	}

	selectByIndex(index, itemHeight, zscrollTo) {
		if (index < 0 || index >= Children.count(this.props.children) || !itemHeight) {
			return;
		}
		zscrollTo(index * itemHeight);
	}


	initRef (prop) {
		return (ref) => {
			this[prop] = ref && ReactDOM.findDOMNode(ref);
		};
	}

	handleChange = direction => handle(
		adaptEvent(
			(ev, {min, max, step, value, wrap}) => ({
				value: wrap ? wrapRange(min, max, value + (direction * step)) :  clamp(min, max, value + (direction * step)),
				reverseTransition: direction < 0
			}),
			forward('onChange')
		)
	);

	handleDecrement = () => {
		this.handleChange(-1);
	};

	handleIncrement = () => {
		this.handleChange(1);
	};

	handleFlick = () => handle(
			() => {console.log("flicking"); increment},
			//forEventProp('orientation', 'vertical'),
			// ignore "slow" flicks by filtering out velocity below a threshold
			oneOf(
				[({velocityX}) => {console.log(velocityX),velocityX < 0, this.handleIncrement()}],
				[({velocityX}) => {console.log(velocityX),velocityX > 0, this.handleDecrement()}]
			)
		);

			currentItemIndex = ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index);
				} else return index;
			} else return 0;
		};
		currentValueText = ({accessibilityHint, 'aria-valuetext': ariaValueText, children, value}) => {
			if (ariaValueText != null) {
				return ariaValueText;
			}

			let valueText = value;

			if (children && Array.isArray(children)) {
				if (children[value] && children[value].props) {
					valueText = children[value].props.children;
				} else {
					valueText = children[value];
				}
			}

			if (accessibilityHint) {
				valueText = `${valueText} ${accessibilityHint}`;
			}

			return valueText;
		};

		decrementAriaLabel = ({decrementAriaLabel, type}) => {
			if (decrementAriaLabel != null) {
				return decrementAriaLabel;
			}

			if (type === 'number') {
				return `${$L('decrease the value')}`;
			} else {
				return `${$L('previous item')}`;
			}
		};

		decrementItemIndex = ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index - 1);
				} else return index - 1;
			} else return 0;
		};

		incrementAriaLabel= ({incrementAriaLabel, type}) => {
			if (incrementAriaLabel != null) {
				return incrementAriaLabel;
			}

			if (type === 'number') {
				return `${$L('increase the value')}`;
			} else {
				return `${$L('next item')}`;
			}
		};

		incrementItemIndex=  ({children: values, index, max, min, wrap}) => {
			if (Array.isArray(values)) {
				if (wrap) {
					return wrapRange(min, max, index + 1);
				} else return index + 1;
			} else return 0;
		};

		activeClassName = ({styler}) => styler.join('active', 'item');


		calcAriaLabel = ({'aria-label': ariaLabel, 'aria-valuetext': valueText}) => {
			if (ariaLabel != null) {
				return ariaLabel;
			}

			return valueText;
		};

		className = ({orientation, styler}) => styler.append(orientation);

		valueId =  ({id}) => `${id}_value`



		render ()  {
		const {
			//'aria-label': ariaLabel,
			children: values,
			className,
			currentItemIndex,
			currentValueText,
			decrementAriaLabel: decAriaLabel,
			decrementItemIndex,
			disabled,
			handleDecrement,
			handleFlick,
			handleIncrement,
			incrementAriaLabel: incAriaLabel,
			incrementItemIndex,
			min,
			max,
			noAnimation,
			onSpotlightDisappear,
			orientation,
			reverseTransition,
			secondaryDecrementItemIndex,
			secondaryIncrementItemIndex,
			skin,
			spotlightDisabled,
			step,
			value,
			valueId,
			width,
			wrap,
			prefixCls,
			itemStyle,
			indicatorStyle,
			indicatorClassName = '',
			...rest
		} = this.props;



		const isFirst = value <= min;
		const isLast = value >= max;
		const isSecond = value <= min + step;
		const isPenultimate = value >= max - step;
		const decrementAriaLabel = `${currentValueText} ${decAriaLabel}`;
		const incrementAriaLabel = `${currentValueText} ${incAriaLabel}`;
		const transitionDuration = 150;

		// const decrementValue = () => {
		// 	const restrictedDecrementValue = wrap ? wrapRange(min, max, value - step) : clamp(min, max, value - step);
		// 	if (isFirst && !wrap) {
		// 		return '';
		// 	} else if (Array.isArray(values)) {
		// 		return values;
		// 	} else {
		// 		return (<PickerItem key={restrictedDecrementValue} style={{direction: 'ltr'}}>{restrictedDecrementValue}</PickerItem>);
		// 	}
		// };
		//
		// const incrementValue = () => {
		// 	const restrictedIncrementValue = wrap ? wrapRange(min, max, value + step) : clamp(min, max, value + step);
		// 	if (isLast && !wrap) {
		// 		return '';
		// 	} else if (Array.isArray(values)) {
		// 		return values;
		// 	} else {
		// 		return (<PickerItem key={restrictedIncrementValue} style={{direction: 'ltr'}}>{restrictedIncrementValue}</PickerItem>);
		// 	}
		// };

		let sizingPlaceholder = null;
		if (typeof width === 'number' && width > 0) {
			sizingPlaceholder = <div aria-hidden className={css.sizingPlaceholder}>{'0'.repeat(width)}</div>;
		}

		const horizontal = orientation === 'horizontal';
		const arranger = horizontal ? SlideLeftArranger : SlideTopArranger;

		delete rest['aria-valuetext'];
		delete rest.accessibilityHint;
		delete rest.decrementAriaLabel;
		delete rest.incrementAriaLabel;
		delete rest.noAnimation;
		delete rest.onChange;
		delete rest.orientation;
		delete rest.wrap;

			const { selectedValue } = this.state;
		const map = (item) => {
			console.log(item);
			//const { value } = item.props;

			return (
				<div
					//style={{ ...itemStyle, ...style }}
					className={selectedValue === item ? classnames(css.selected, css.item) : css.item}
					//key={value}
				>
					{item}
				</div>
			);
		};

			// compatibility for preact
			const items = Children ? Children.map(values, map) : ([]).concat(values).map(map);


			return (
			<div {...rest} className={classnames(className, css.picker)} ref={this.initRootRef}>
				<div
					className={classnames(
						css.indicator,
						css.item,
						className
					)}
					ref={el => this.indicatorRef = el}
					style={indicatorStyle}
				/>
			<PickerRoot className={css.root} onFlick={handleFlick}  ref={this.initContentRef} >
				{items}

				{/*<div*/}
				{/*	aria-label={calcAriaLabel}*/}
				{/*	aria-valuetext={currentValueText}*/}
				{/*	className={this.activeClassName}*/}
				{/*	id={valueId}*/}
				{/*	role="spinbutton"*/}
				{/*>*/}
				{/*	{sizingPlaceholder}*/}

				{/*	<ViewManager*/}
				{/*		aria-hidden*/}
				{/*		arranger={arranger}*/}
				{/*		className={css.viewManager}*/}
				{/*		duration={transitionDuration}*/}
				{/*		index={currentItemIndex}*/}
				{/*		noAnimation={noAnimation || disabled}*/}
				{/*		reverseTransition={reverseTransition}*/}
				{/*	>*/}
				{/*		{values}*/}
				{/*	</ViewManager>*/}
				{/*</div>*/}


			</PickerRoot>
				</div>
		);
	}
};

const Picker = IdProvider(
	{generateProp: null, prefix: 'p_'},
	Skinnable(
		PickerBase
	)
);


/**
 * A higher-order component that filters the values returned by the onChange event on {@link agate/internal/Picker.Picker}
 *
 * @class ChangeAdapter
 * @hoc
 * @memberof agate/internal/Picker
 * @private
 */
const ChangeAdapter = hoc((config, Wrapped) => {
	return kind({
		name: 'ChangeAdapter',

		handlers: {
			onChange: handle(
				adaptEvent(({value}) => {
					return ({value});
				},
				forward('onChange'))
			)
		},

		render: (props) => {
			return <Wrapped {...props} />;
		}
	});
});

// /**
//  * Applies Agate specific behaviors to [Picker]{@link agate/Picker.Picker}.
//  *
//  * @hoc
//  * @memberof agate/internal/Picker
//  * @mixes ui/Changeable.Changeable
//  * @mixes agate/Skinnable.Skinnable
//  * @private
//  */
// const PickerDecorator = compose(
// 	IdProvider({generateProp: null}),
// 	Changeable,
// 	Changeable({prop: 'reverseTransition'}),
// 	Skinnable({prop: 'skin'})
// );
//
// const Picker = PickerDecorator(PickerBase);

export default Picker;
export {
	ChangeAdapter,
	Picker,
	PickerBase
};
export PickerItem from './PickerItem';
