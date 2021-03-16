/* eslint-disable react/jsx-no-bind */

/**
 * A internal DrumPicker component.
 *
 * @module agate/internal/DrumPicker
 * @exports DrumPicker
 * @exports DrumPickerDecorator
 * @private
 */

import classnames from 'classnames';
import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import {clamp} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import IdProvider from '@enact/ui/internal/IdProvider';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Children, Component} from 'react';
import ReactDOM from 'react-dom';

import $L from '../$L';
import Skinnable from '../../Skinnable';

import DrumPickerItem from './DrumPickerItem';

import css from './DrumPicker.module.less';
import * as ri from '@enact/ui/resolution';

const Div = Spottable('div');

// Set-up event forwarding
const forwardKeyDown = forward('onKeyDown');

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');

/**
 * The base component for {@link agate/internal/DrumPicker.DrumPicker}.
 *
 * @class DrumPicker
 * @memberof agate/internal/DrumPicker
 * @ui
 * @private
 */
const DrumPickerBase = class extends Component {
	static displayName = 'DrumPicker';

	static propTypes = /** @lends agate/internal/DrumPicker.DrumPicker.prototype */ {
		/**
		 * The maximum value selectable by the picker (inclusive).
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link agate/internal/DrumPicker.DrumPicker.step}.
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
		 * [step]{@link agate/internal/DrumPicker.DrumPicker.step}.
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
		 * @memberof agate/internal/DrumPicker.DrumPicker.prototype
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
		 * By default, the picker will animate transitions between items.
		 * Specifying `noAnimation` will prevent any transition animation for the
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
		 * You may also supply a number. This number will determine the minimum size of the DrumPicker.
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

	constructor (props) {
		super(props);

		this.initContentRef = this.initRef('contentRef');
		this.initRootRef = this.initRef('rootRef');
		this.initIndicatorRef = this.initRef('indicatorRef');

		const {min, max, step, value} = this.props;
		this.children = this.calculateChildren(min, max, step, value);

		let selectedIndex;
		if (!Array.isArray(this.props.children) && (value || value === 0)) {
			selectedIndex = clamp(0, this.children.length - 1, this.children.findIndex((element) => element.props.children === value));
		} else {
			selectedIndex = value;
		}

		this.state = {
			selectedIndex: selectedIndex
		};

		this.scrollY = -1;
		this.lastY = 0;
		this.startY = 0;
		this.scrollX = -1;
		this.lastX = 0;
		this.startX = 0;
		this.isMoving = false;
	}

	componentDidMount () {
		const {children} = this;

		for (let i = 0; i < children.length; i++) {
			if (i === this.state.selectedIndex) {
				this.scrollTo(i);
				return;
			}
		}
	}

	componentDidUpdate (prevProps, prevState) {
		const {children} = this;

		if (prevState.selectedIndex === this.state.selectedIndex) {
			const {min, max, step, value} = this.props;

			this.children = this.calculateChildren(min, max, step, value);
			let selectedIndex;
			if (!Array.isArray(this.props.children) && (value || value === 0)) {
				selectedIndex = clamp(0, this.children.length - 1, this.children.findIndex((element) => element.props.children === value));
			} else {
				selectedIndex = value;
			}

			for (let i = 0; i < children.length; i++) {
				if (i === selectedIndex) {
					this.scrollTo(i);
					return;
				}
			}
		}
	}

	calculateChildren= (min, max, step, value) => {
		if (!Array.isArray(this.props.children)) {
			const childrenArray = Array(Math.floor((max - min) / step) + 1).fill(min).map( ((x, i) => (x + i * step)) );
			return (Children.map(childrenArray, (child) => (
				<DrumPickerItem key={value} marqueeDisabled>{child}</DrumPickerItem>
			)));
		} else if (this.props.children) {
			return this.props.children;
		} else return [];
	};

	scrollTo = (val) => {
		const {orientation} = this.props;
		const {children} = this;
		if (!children || children.length === 0) return;

		const index = clamp(0, children.length, Math.min(val, children.length - 1));
		const child = children[index].props.children;

		if (orientation === 'vertical') {
			const itemHeight = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().height, 'rem').slice(0, -3));

			if (this.scrollY !== val * itemHeight) {
				this.scrollY = val * itemHeight;

				this.contentRef.style.transform = `translate(0,${-((val + 1) * itemHeight)}rem)`;

				if (this.scrollY >= 0 && (child || child === 0)) {
					this.changeValue(index, child);
				}
			}
		} else {
			const itemWidth = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().width, 'rem').slice(0, -3));

			if (this.scrollX !== val * itemWidth) {
				this.scrollX = val * itemWidth;

				this.contentRef.style.transform = `translate(${-((val + 1) * itemWidth)}rem,0)`;

				if (this.scrollX >= 0 && (child || child === 0)) {
					this.changeValue(index, child);
				}
			}
		}
	};

	onStart = (position) => {
		if (this.props.disabled || this.children.length === 0) {
			return;
		}
		this.isMoving = true;

		if (this.props.orientation === 'vertical') {
			this.startY = position.pageY / ri.unitToPixelFactors['rem'];
			this.lastY = this.scrollY;
		} else {
			this.startX = position.pageX / ri.unitToPixelFactors['rem'];
			this.lastX = this.scrollX;
		}

	};

	onMove = (position) => {
		if (this.props.disabled || this.children.length === 0 || !this.isMoving) {
			return;
		}

		const unitToPixelFactor = ri.unitToPixelFactors['rem'];

		if (this.props.orientation === 'vertical') {
			const itemHeight = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().height, 'rem').slice(0, -3));
			this.scrollY = (this.lastY - ( position.pageY / unitToPixelFactor) + this.startY);
			this.contentRef.style.transform = `translate(0,${-this.scrollY - itemHeight}rem)`;
		} else {
			const itemWidth = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().width, 'rem').slice(0, -3));
			this.scrollX = (this.lastX - (position.pageX / unitToPixelFactor) + this.startX);
			this.contentRef.style.transform = `translate(${-this.scrollX - itemWidth}rem, 0)`;
		}
	};

	onFinish = () => {
		this.isMoving = false;

		if (this.props.orientation === 'vertical') {
			const itemHeight = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().height, 'rem').slice(0, -3));

			let targetY = this.scrollY;
			const height = (this.children.length - 1) * itemHeight;
			if (targetY % itemHeight !== 0) {
				targetY = Math.round(targetY / itemHeight) * itemHeight;
			}
			if (targetY < 0) {
				targetY = 0;
			} else if (targetY > height) {
				targetY = height;
			}
			this.scrollTo(targetY / itemHeight);
		} else {
			const itemWidth = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().width, 'rem').slice(0, -3));

			let targetX = this.scrollX;
			const height = (this.children.length - 1) * itemWidth;
			if (targetX % itemWidth !== 0) {
				targetX = Math.round(targetX / itemWidth) * itemWidth;
			}
			if (targetX < 0) {
				targetX = 0;
			} else if (targetX > height) {
				targetX = height;
			}
			this.scrollTo(targetX / itemWidth);
		}
	};

	changeValue = (index, value) => {
		const {onChange} = this.props;
		if (index !== this.state.selectedIndex) {
			this.setState({
				selectedIndex: index
			});
			if (Array.isArray(this.props.children)) {
				onChange({value: index});
			} else {
				onChange({value});
			}

		}
	};

	wrapRange = (min, max, value) => {
		if (value > max) {
			return min + (value - max - 1);
		} else if (value < min) {
			return max - (min - value - 1);
		} else {
			return value;
		}
	};

	currentValueText = () => {
		const {accessibilityHint, 'aria-valuetext': ariaValueText, children, value} = this.props;
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

	decrementAriaLabel = () => {
		const {decrementAriaLabel} = this.props;
		if (decrementAriaLabel != null) {
			return decrementAriaLabel;
		}

		if (!Array.isArray(this.props.children)) {
			return `${$L('decrease the value')}`;
		} else {
			return `${$L('previous item')}`;
		}
	};

	incrementAriaLabel= () => {
		const {incrementAriaLabel} = this.props;
		if (incrementAriaLabel != null) {
			return incrementAriaLabel;
		}

		if (!Array.isArray(this.props.children)) {
			return `${$L('increase the value')}`;
		} else {
			return `${$L('next item')}`;
		}
	};

	calcAriaLabel = () => {
		const {'aria-label': ariaLabel} = this.props;
		if (ariaLabel != null) {
			return ariaLabel;
		}
		return this.currentValueText();
	};

	handleKeyDown = (ev) => {
		const {orientation, wrap} = this.props;
		const {keyCode} = ev;
		forwardKeyDown(ev, this.props);

		if (!this.props.disabled && this.children.length > 0) {
			let itemHeight = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().height, 'rem').slice(0, -3));
			let itemWidth = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().width, 'rem').slice(0, -3));

			if (itemHeight === 0) {
				itemHeight = 1;
			}
			if (itemWidth === 0) {
				itemWidth = 1;
			}

			if (!this.props.noAnimation) {
				this.contentRef.style.transition = 'transform 300ms';
			}
			if (orientation === 'horizontal' && isLeft(keyCode)) {
				ev.stopPropagation();
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollX / itemWidth - 1) : clamp(0, this.children.length - 1, this.scrollX / itemWidth - 1));
			} else if (orientation === 'horizontal' && isRight(keyCode) ) {
				ev.stopPropagation();
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollX / itemWidth + 1) : clamp(0, this.children.length - 1, this.scrollX / itemWidth + 1));
			} else if (orientation === 'vertical' && isUp(keyCode)) {
				ev.stopPropagation();
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollY / itemHeight - 1) : clamp(0, this.children.length - 1, this.scrollY / itemHeight - 1));
			} else if (orientation === 'vertical' && isDown(keyCode) ) {
				ev.stopPropagation();
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollY / itemHeight + 1) : clamp(0, this.children.length - 1, this.scrollY / itemHeight + 1));
			}
			// remove transition for further touch related changes
			setTimeout(() => {
				this.contentRef.style.transition = 'none';
			}, 300);
		}
	};

	handleDecrement = () => {
		this.handleClick(-1);
	};

	handleIncrement = () => {
		this.handleClick(1);
	};

	handleClick = (direction) => {
		const {orientation, wrap} = this.props;

		if (!this.props.disabled && this.children.length > 0) {
			let itemHeight = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().height, 'rem').slice(0, -3));
			let itemWidth = parseFloat(ri.unit(this.indicatorRef.getBoundingClientRect().width, 'rem').slice(0, -3));

			if (itemHeight === 0) {
				itemHeight = 1;
			}
			if (itemWidth === 0) {
				itemWidth = 1;
			}

			if (!this.props.noAnimation) {
				this.contentRef.style.transition = 'transform 300ms';
			}
			if (orientation === 'horizontal') {
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollX / itemWidth + direction) : clamp(0, this.children.length - 1, this.scrollX / itemWidth + direction));
			} else if (orientation === 'vertical') {
				this.scrollTo(wrap ? this.wrapRange(0, this.children.length - 1, this.scrollY / itemHeight + direction) : clamp(0, this.children.length - 1, this.scrollY / itemHeight + direction));
			}
			// remove transition for further touch related changes
			setTimeout(() => {
				this.contentRef.style.transition = 'none';
			}, 300);
		}
	};

	valueId =  (id) => `${id}_value`;

	initRef (prop) {
		return (ref) => {
			// eslint-disable-next-line react/no-find-dom-node
			this[prop] = ref && ReactDOM.findDOMNode(ref);
		};
	}

	render ()  {
		const {
			className,
			disabled,
			id,
			onSpotlightDisappear,
			orientation,
			spotlightDisabled,
			width,
			...rest
		} = this.props;

		let {children: values} = this;

		const currentValueText = this.currentValueText();
		const decAriaLabel = this.decrementAriaLabel();
		const incAriaLabel = this.incrementAriaLabel();
		const decrementAriaLabel = `${currentValueText} ${decAriaLabel}`;
		const incrementAriaLabel = `${currentValueText} ${incAriaLabel}`;
		const indicatorAriaLabel = this.calcAriaLabel();

		let sizingPlaceholder = null;
		if (typeof width === 'number' && width > 0) {
			sizingPlaceholder = <div aria-hidden className={css.sizingPlaceholder}>{'0'.repeat(width)}</div>;
		}

		delete rest['aria-valuetext'];
		delete rest.accessibilityHint;
		delete rest.decrementAriaLabel;
		delete rest.incrementAriaLabel;
		delete rest.index;
		delete rest.max;
		delete rest.min;
		delete rest.noAnimation;
		delete rest.onChange;
		delete rest.reverseTransition;
		delete rest.step;
		delete rest.type;
		delete rest.value;
		delete rest.wrap;

		const itemDecrementProps = {
			'aria-controls': this.valueId(id),
			'aria-disabled':disabled,
			'aria-label':decrementAriaLabel,
			className: classnames(css.itemDecrement, css.item)
		};

		const itemIncrementProps = {
			'aria-controls': this.valueId(id),
			'aria-disabled':disabled,
			'aria-label':incrementAriaLabel,
			className: classnames(css.itemIncrement, css.item)
		};

		const selectedItemProps = {
			className: classnames(css.selectedItem, css.item)
		};

		const otherItemProps = {
			className: css.item
		};

		values = values.map((value, index) => {
			let itemProps;
			let onClickEvent;
			if (this.state.selectedIndex === index + 1) {
				itemProps = itemDecrementProps;
				onClickEvent = this.handleDecrement;
			} else if (this.state.selectedIndex === index - 1) {
				itemProps = itemIncrementProps;
				onClickEvent = this.handleIncrement;
			} else if (this.state.selectedIndex === index) {
				itemProps = selectedItemProps;
			} else {
				itemProps = otherItemProps;
			}
			return (
				<div
					key={index}
					{...itemProps}
					onClick={onClickEvent}
				>
					{sizingPlaceholder}
					{value}
				</div>
			);
		});

		return (
			<Div
				{...rest}
				className={classnames(className, css.drumPicker, css[orientation])}
				disabled={disabled}
				onKeyDown={this.handleKeyDown}
				onMouseDown={(evt) => this.onStart(evt)}
				onMouseMove={(evt) => {
					evt.preventDefault(); this.onMove(evt);
				}}
				onMouseUp={this.onFinish}
				onSpotlightDisappear={onSpotlightDisappear}
				onTouchCancel={this.onFinish}
				onTouchEnd={this.onFinish}
				onTouchMove={(evt) => {
					evt.preventDefault(); this.onMove(evt.touches[0]);
				}}
				onTouchStart={(evt) => this.onStart(evt.touches[0])}
				ref={this.initRootRef}
				spotlightDisabled={spotlightDisabled}
			>
				<div
					aria-label={indicatorAriaLabel}
					aria-valuetext={currentValueText}
					className={classnames(css.indicator, css.item)}
					ref={this.initIndicatorRef}
				/>
				<div
					className={css.root}
					ref={this.initContentRef}
				>
					{values}
				</div>
			</Div>
		);
	}
};

/**
 * Applies Agate specific behaviors to [DrumPicker]{@link agate/DrumPicker.DrumPicker}.
 *
 * @hoc
 * @memberof agate/internal/DrumPicker
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const DrumPickerDecorator = compose(
	IdProvider({generateProp: null}),
	Skinnable
);

const DrumPicker = DrumPickerDecorator(DrumPickerBase);

export default DrumPicker;
export {
	DrumPicker,
	DrumPickerBase
};
export DrumPickerItem from './DrumPickerItem';
