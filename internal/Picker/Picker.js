/* eslint-disable react/jsx-no-bind */

/**
 * A internal Picker component.
 *
 * @module agate/internal/Picker
 * @exports Picker
 * @exports PickerDecorator
 * @private
 */

import classnames from 'classnames';
import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children, Component} from 'react';
import ReactDOM from 'react-dom';

import $L from '../$L';
import Skinnable from '../../Skinnable';

import css from './Picker.module.less';
import Spotlight from "../../../enact/packages/spotlight";

const PickerRoot = Touchable(Spottable('div'));

// Set-up event forwarding
const forwardKeyDown = forward('onKeyDown'),
	forwardKeyUp = forward('onKeyUp'),
	forwardWheel = forward('onWheel');

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
		 * When `true`, the component cannot be navigated using spotlight.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,


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
		type: 'string',
		value: 0
	};

	constructor (props) {
		super(props);

		this.initContentRef = this.initRef('contentRef');
		this.initRootRef = this.initRef('rootRef');
		this.initIndicatorRef = this.initRef('indicatorRef');

		const {value} = this.props;
		let selectedValue;
		if (value || value === 0) {
			selectedValue = this.props.children.findIndex((element) => element.props.children === value);
		}
		if (selectedValue < 0 || !value) {
			selectedValue = 0
		}

		this.state = {
			itemHeight: 0,
			selectedValue: selectedValue,
			scrollY: -1,
			lastY: 0,
			startY: 0,
			isMoving: false
		};
	}

	componentDidMount () {
		// this.contentRef.addEventListener('wheel', this.handleWheel);
		const {rootRef, indicatorRef} = this;
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState(() => {
			return ({itemHeight: indicatorRef.getBoundingClientRect().height});
		}, () => {
			this.select(this.state.selectedValue);
		});

		rootRef.addEventListener('touchstart', (evt) => this.onStart(evt.touches[0].pageY));
		rootRef.addEventListener('touchmove', (evt) => {
			evt.preventDefault();
			this.onMove(evt.touches[0].pageY);
		});
		rootRef.addEventListener('touchend', this.onFinish);
		rootRef.addEventListener('touchcancel', this.onFinish);
		rootRef.addEventListener('mousedown', (evt) => this.onStart(evt.pageY));
		rootRef.addEventListener('mousemove', (evt) => {
			evt.preventDefault();
			this.onMove(evt.pageY);
		});
		rootRef.addEventListener('mouseup', this.onFinish);
		rootRef.addEventListener('wheel', this.handleWheel);
	}

	componentWillUnmount () {
		const {rootRef} = this;

		rootRef.removeEventListener('touchstart', (evt) => this.onStart(evt.touches[0].pageY));
		rootRef.removeEventListener('touchmove', (evt) => {
			evt.preventDefault();
			this.onMove(evt.touches[0].pageY);
		});
		rootRef.removeEventListener('touchend', this.onFinish);
		rootRef.removeEventListener('touchcancel', this.onFinish);
		rootRef.removeEventListener('mousedown', (evt) => this.onStart(evt.pageY));
		rootRef.removeEventListener('mousemove', (evt) => {
			evt.preventDefault();
			this.onMove(evt.pageY);
		});
		rootRef.removeEventListener('mouseup', this.onFinish);
	}

	setTransform = (nodeStyle, value) => {
		nodeStyle.transform = value;
		nodeStyle.webkitTransform = value;
	};

	scrollTo = (y) => {
		if (this.state.scrollY !== y) {
			this.setState(() => {
				return ({scrollY: y});
			}, () => {
				this.setTransform(this.contentRef.style, `translate(0,${-y}px)`);
				this.scrollingComplete();
			});
		}
	};

	onStart = (y) => {
		if (this.props.disabled) {
			return;
		}
		this.setState(prevState => ({
			isMoving: true,
			startY: y,
			lastY: prevState.scrollY}));
	};

	onMove = (top) => {
		if (this.props.disabled || !this.state.isMoving) {
			return;
		}

		this.setState(prevState => {
			return ({scrollY: prevState.lastY - top + prevState.startY});
		}, () => {
			this.setTransform(this.contentRef.style, `translate3d(0,${-this.state.scrollY}px,0)`);
		});
	};

	onFinish = () => {
		this.setState(() => {
			return ({isMoving: false});
		}, () => {
			let targetY = this.state.scrollY;
			const height = ((this.props.children).length - 1) * this.state.itemHeight;
			if (targetY % this.state.itemHeight !== 0) {
				targetY = Math.round(targetY / this.state.itemHeight) * this.state.itemHeight;
			}

			if (targetY < 0) {
				targetY = 0;
			} else if (targetY > height) {
				targetY = height;
			}

			this.scrollTo(targetY);
		});
	};

	select = (value) => {
		if (!this.state.itemHeight) return;

		const {children} = this.props;
		for (let i = 0, len = children.length; i < len; i++) {
			if (children[i].props.children === value) {
				this.scrollTo(i * this.state.itemHeight);
				return;
			}
		}
		this.scrollTo(0);
	};

	scrollingComplete = () => {
		const top = this.state.scrollY;
		if (top >= 0) {
			const {children} = this.props;
			const index = this.computeChildIndex(top, children.length);
			const child = children[index].props.children;
			if (child || child === 0) {
				this.fireValueChange(child, index);
			}
		}
	};

	computeChildIndex (top, childrenLength) {
		const index = Math.round(top / this.state.itemHeight);
		return Math.min(index, childrenLength - 1);
	}

	fireValueChange = (selectedValue, selectedValueIndex) => {
		const {onChange} = this.props;
		if (selectedValue !== this.state.selectedValue) {
			this.setState({
				selectedValue
			});
			onChange({value: selectedValueIndex});
		}
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

	calcAriaLabel = ({'aria-label': ariaLabel, 'aria-valuetext': valueText}) => {
		if (ariaLabel != null) {
			return ariaLabel;
		}

		return valueText;
	};

	handleKeyDown = (ev) => {
		const {
			joined,
			onSpotlightDown,
			onSpotlightLeft,
			onSpotlightRight,
			onSpotlightUp,
			orientation
		} = this.props;
		const {keyCode} = ev;
		forwardKeyDown(ev, this.props);

		if (joined && !this.props.disabled) {
			const direction = getDirection(keyCode);

			const directions = {
				up: this.setIncPickerButtonPressed,
				down: this.setDecPickerButtonPressed
			};

			const isVertical = orientation === 'vertical' && (isUp(keyCode) || isDown(keyCode));
			const isHorizontal = orientation === 'horizontal' && isEnter(keyCode);

			if (isVertical) {
				directions[direction]();
			} else if (isHorizontal) {
				this.setIncPickerButtonPressed();
			} else if (orientation === 'horizontal' && isDown(keyCode) && onSpotlightDown) {
				onSpotlightDown(ev);
			} else if (orientation === 'horizontal' && isUp(keyCode) && onSpotlightUp) {
				onSpotlightUp(ev);
			} else if (orientation === 'vertical' && isLeft(keyCode) && onSpotlightLeft) {
				onSpotlightLeft(ev);
			} else if (orientation === 'vertical' && isRight(keyCode) && onSpotlightRight) {
				onSpotlightRight(ev);
			}
		}
	};

	handleKeyUp = (ev) => {
		const {
			joined,
			orientation
		} = this.props;
		const {keyCode} = ev;
		forwardKeyUp(ev, this.props);

		if (joined && !this.props.disabled) {
			const isVertical = orientation === 'vertical' && (isUp(keyCode) || isDown(keyCode));
			const isHorizontal = orientation === 'horizontal' && (isEnter(keyCode));

			if (isVertical || isHorizontal) {
				this.pickerButtonPressed = 0;
			}
		}
	};

	handleWheel = (ev) => {
		const {step} = this.props;
		forwardWheel(ev, this.props);

		const isContainerSpotted = this.containerRef === Spotlight.getCurrent();

		if (isContainerSpotted) {
			const dir = -Math.sign(ev.deltaY);

			// We'll sometimes get a 0/-0 wheel event we need to ignore or the wheel event has reached
			// the bounds of the picker
			if (dir && !this.hasReachedBound(step * dir)) {
				// fire the onChange event
				if (dir > 0) {
					this.throttleWheelInc.throttle();
				} else if (dir < 0) {
					this.throttleWheelDec.throttle();
				}
				// simulate mouse down
				this.setPressedState(dir);
				// set a timer to simulate the mouse up
				this.emulateMouseUp.start();
				// prevent the default scroll behavior to avoid bounce back
				ev.preventDefault();
				ev.stopPropagation();
			}
		}
	};

	valueId =  ({id}) => `${id}_value`;

	initRef (prop) {
		return (ref) => {
			// eslint-disable-next-line react/no-find-dom-node
			this[prop] = ref && ReactDOM.findDOMNode(ref);
		};
	}

	render ()  {
		const {
		// 'aria-label': ariaLabel,
			children: values,
			className,
			decrementAriaLabel: decAriaLabel,
			disabled,
			incrementAriaLabel: incAriaLabel,
			width,
			...rest
		} = this.props;

		const decrementAriaLabel = `${this.currentValueText} ${decAriaLabel}`;
		const incrementAriaLabel = `${this.currentValueText} ${incAriaLabel}`;

		let sizingPlaceholder = null;
		if (typeof width === 'number' && width > 0) {
			sizingPlaceholder = <div aria-hidden className={css.sizingPlaceholder}>{'0'.repeat(width)}</div>;
		}

		delete rest['aria-valuetext'];
		delete rest.accessibilityHint;
		delete rest.decrementAriaLabel;
		delete rest.incrementAriaLabel;
		delete rest.noAnimation;
		delete rest.onChange;
		delete rest.orientation;
		delete rest.wrap;
		delete rest.spotlightDisabled;

		const mapItems = (item) => {
			return (
				<div className={this.state.selectedValue === item.props.children ? classnames(css.selected, css.item) : css.item}>
					{sizingPlaceholder}
					{item}
				</div>
			);
		};

		const items = Children ? Children.map(values, mapItems) : ([]).concat(values).map(mapItems);

		return (
			<div {...rest} className={classnames(className, css.picker)} ref={this.initRootRef}>
				<div
					aria-controls={this.valueId}
					aria-disabled={disabled}
					aria-label={decrementAriaLabel}
					className={classnames(css.itemDecrement, css.item, className)}
					disabled={disabled}
				/>
				<div
					aria-label={this.calcAriaLabel}
					aria-valuetext={this.currentValueText}
					className={classnames(css.indicator, css.item, className)}
					ref={this.initIndicatorRef}
				/>
				<div
					aria-controls={this.valueId}
					aria-disabled={disabled}
					aria-label={incrementAriaLabel}
					className={classnames(css.itemIncrement, css.item, className)}
					disabled={disabled}
				/>
				<PickerRoot
					className={css.root}
					onKeyDown={this.handleKeyDown}
					onKeyUp={this.handleKeyUp}
					ref={this.initContentRef}
				>
					{items}
				</PickerRoot>
			</div>
		);
	}
};

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

/**
 * Applies Agate specific behaviors to [Picker]{@link agate/Picker.Picker}.
 *
 * @hoc
 * @memberof agate/internal/Picker
 * @mixes ui/Changeable.Changeable
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const PickerDecorator = compose(
	IdProvider({generateProp: null}),
	Changeable,
	Skinnable
);

const Picker = PickerDecorator(PickerBase);

export default Picker;
export {
	ChangeAdapter,
	Picker,
	PickerBase
};
export PickerItem from './PickerItem';
