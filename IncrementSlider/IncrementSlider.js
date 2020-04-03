/**
 * An interactive numeric range picker with increment decrement
 *
 * @example
 * <IncrementSlider
 *   decrementIcon="minus"
 *   defaultValue={-25}
 *   incrementIcon="plus"
 *   knobStep={25}
 *   max={100}
 *   min={-100}
 *   step={5}
 * />
 *
 * @module agate/IncrementSlider
 * @exports IncrementSlider
 * @exports IncrementSliderBase
 * @exports IncrementSliderDecorator
 */

import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import Slottable from '@enact/ui/Slottable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Skinnable from '../Skinnable';
import {SliderBase} from '../Slider';
import {emitChange} from '../Slider/utils';
import SliderBehaviorDecorator from '../Slider/SliderBehaviorDecorator';

import IncrementSliderButton from './IncrementSliderButton';
import componentCss from './IncrementSlider.module.less';

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');

const Slider = Spottable(Skinnable(SliderBase));

const forwardWithType = (type, props) => forward(type, {type}, props);

/**
 * A stateless Slider with IconButtons to increment and decrement the value. In most circumstances,
 * you will want to use the stateful version: {@link agate/IncrementSlider.IncrementSlider}.
 *
 * @class IncrementSliderBase
 * @memberof agate/IncrementSlider
 * @extends agate/Slider.SliderBase
 * @mixes agate/Skinnable.Skinnable
 * @mixes spotlight/Spottable.Spottable
 * @ui
 * @public
 */
const IncrementSliderBase = kind({
	name: 'IncrementSlider',

	propTypes: /** @lends agate/IncrementSlider.IncrementSliderBase.prototype */ {
		/**
		 * Sets the knob to selected state and allows it to move via 5-way controls.
		 *
		 * @type {Boolean}
		 * @public
		 */
		active: PropTypes.bool,

		/**
		 * Prevents read out of both the slider and the increment and decrement
		 * buttons.
		 *
		 * @type {Boolean}
		 * @memberof agate/IncrementSlider.IncrementSliderBase.prototype
		 * @public
		 */
		'aria-hidden': PropTypes.bool,

		/**
		 * Overrides the `aria-valuetext` for the slider. By default, `aria-valuetext` is set
		 * to the current value. This should only be used when the parent controls the value of
		 * the slider directly through the props.
		 *
		 * @type {String|Number}
		 * @memberof agate/IncrementSlider.IncrementSliderBase.prototype
		 * @public
		 */
		'aria-valuetext': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

		/**
		 * Background progress, as a proportion between `0` and `1`.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		backgroundProgress: PropTypes.number,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * The `data-webos-voice-group-label` for the IconButton of IncrementSlider.
		 *
		 * @type {String}
		 * @memberof agate/IncrementSlider.IncrementSliderBase.prototype
		 * @public
		 */
		'data-webos-voice-group-label': PropTypes.string,

		/**
		* Sets the hint string read when focusing the decrement button.
		*
		* @default 'press ok button to decrease the value'
		* @type {String}
		* @public
		*/
		decrementAriaLabel: PropTypes.string,

		/**
		 * Assign a custom icon for the decrementer. All strings supported by [Icon]{@link agate/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link agate/IncrementSlider.IncrementSlider#vertical} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		decrementIcon: PropTypes.string,

		/**
		 * Disables the slider and prevents events from firing.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Indicates focused state.
		 * @type {Boolean}
		 * @public
		 */
		focused: PropTypes.bool,

		/**
		 * The slider id reference for setting aria-controls.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		* Sets the hint string read when focusing the increment button.
		*
		* @default 'press ok button to increase the value'
		* @type {String}
		* @public
		*/
		incrementAriaLabel: PropTypes.string,

		/**
		 * Assign a custom icon for the incrementer. All strings supported by [Icon]{@link agate/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link agate/IncrementSlider.IncrementSlider#vertical} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		incrementIcon: PropTypes.string,

		/**
		 * The amount to increment or decrement the position of the knob via 5-way controls.
		 *
		 * If not specified, `step` is used for the default value.
		 *
		 * @type {Number}
		 * @public
		 */
		knobStep: PropTypes.number,

		/**
		 * The maximum value of the increment slider.
		 *
		 * @type {Number}
		 * @default 100
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the increment slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * Hides the slider bar fill and prevents highlight when spotted.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noFill: PropTypes.bool,

		/**
		 * Called when the knob is activated or deactivated by selecting it via 5-way.
		 *
		 * @type {Function}
		 * @public
		 */
		onActivate: PropTypes.func,

		/**
		 * Called when the value is changed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.value The current value
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called run when the decrement button becomes disabled.
		 *
		 * @type {Function}
		 * @private
		 */
		onDecrementSpotlightDisappear: PropTypes.func,

		/**
		 * Forwarded from SliderBehaviorDecorator onto the internal slider.
		 *
		 * @type {Function}
		 * @private
		 */
		onDragEnd: PropTypes.func,

		/**
		 * Forwarded from SliderBehaviorDecorator onto the internal slider.
		 *
		 * @type {Function}
		 * @private
		 */
		onDragStart: PropTypes.func,

		/**
		 * Called when the increment button becomes disabled.
		 *
		 * @type {Function}
		 * @private
		 */
		onIncrementSpotlightDisappear: PropTypes.func,

		/**
		 * Called when the increment button becomes disabled.
		 *
		 * @type {Function}
		 * @private
		 */
		onSpotlightDirection: PropTypes.func,

		/**
		 * Called when the component is removed while retaining focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Called prior to focus leaving the component when the 5-way down key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDown: PropTypes.func,

		/**
		 * Called prior to focus leaving the component when the 5-way left key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightLeft: PropTypes.func,

		/**
		 * Called prior to focus leaving the component when the 5-way right key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightRight: PropTypes.func,

		/**
		 * Called prior to focus leaving the component when the 5-way up key is pressed.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightUp: PropTypes.func,

		/**
		 * Sets the orientation of the slider, whether the slider moves left and right or up and
		 * down. Must be either `'horizontal'` or `'vertical'`.
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * Disables spotlight navigation into the component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The value of the increment slider.
		 *
		 * Defaults to the value of `min`.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		backgroundProgress: 0,
		decrementIcon: 'minus',
		incrementIcon: 'plus',
		max: 100,
		min: 0,
		noFill: false,
		orientation: 'horizontal',
		spotlightDisabled: false,
		step: 1
	},

	styles: {
		css: componentCss,
		className: 'incrementSlider',
		publicClassNames: ['incrementSlider']
	},

	handlers: {
		onDecrement: emitChange(-1),
		onIncrement: emitChange(1),
		onKeyDown: (ev, props) => {
			const {orientation} = props;

			forward('onKeyDown', ev, props);

			// if the source of the event is the slider, forward it along
			if (ev.target.classList.contains(componentCss.slider)) {
				forward('onSpotlightDirection', ev, props);
				return;
			}

			const isIncrement = ev.target.classList.contains(componentCss.incrementButton);
			const isDecrement = ev.target.classList.contains(componentCss.decrementButton);

			if (isRight(ev.keyCode) && (isIncrement || orientation === 'vertical')) {
				forwardWithType('onSpotlightRight', props);
			} else if (isLeft(ev.keyCode) && (isDecrement || orientation === 'vertical')) {
				forwardWithType('onSpotlightLeft', props);
			} else if (isUp(ev.keyCode) && (isIncrement || orientation === 'horizontal')) {
				forwardWithType('onSpotlightUp', props);
			} else if (isDown(ev.keyCode) && (isDecrement || orientation === 'horizontal')) {
				forwardWithType('onSpotlightDown', props);
			}
		}
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation),
		decrementDisabled: ({disabled, min, value = min}) => disabled || value <= min,
		incrementDisabled: ({disabled, max, min, value = min}) => disabled || value >= max,
		decrementAriaLabel: ({'aria-valuetext': valueText, decrementAriaLabel, min, value = min}) => {
			if (decrementAriaLabel == null) {
				decrementAriaLabel = $L('press ok button to decrease the value');
			}

			return `${valueText != null ? valueText : value} ${decrementAriaLabel}`;
		},
		incrementAriaLabel: ({'aria-valuetext': valueText, incrementAriaLabel, min, value = min}) => {
			if (incrementAriaLabel == null) {
				incrementAriaLabel = $L('press ok button to increase the value');
			}

			return `${valueText != null ? valueText : value} ${incrementAriaLabel}`;
		}
	},

	render: ({active,
		'aria-hidden': ariaHidden,
		'data-webos-voice-group-label': voiceGroupLabel,
		backgroundProgress,
		css,
		decrementAriaLabel,
		decrementDisabled,
		decrementIcon,
		disabled,
		focused,
		id,
		incrementAriaLabel,
		incrementDisabled,
		incrementIcon,
		knobStep,
		max,
		min,
		noFill,
		onActivate,
		onChange,
		onDecrement,
		onDecrementSpotlightDisappear,
		onDragEnd,
		onDragStart,
		onIncrement,
		onIncrementSpotlightDisappear,
		onSpotlightDisappear,
		orientation,
		spotlightDisabled,
		step,
		value,
		...rest
	}) => {
		const ariaProps = extractAriaProps(rest);
		delete rest.onSpotlightDirection;
		delete rest.onSpotlightDown;
		delete rest.onSpotlightLeft;
		delete rest.onSpotlightRight;
		delete rest.onSpotlightUp;

		console.log(incrementDisabled, id);
		console.log(decrementDisabled, id);

		return (
			<div {...rest}>
				<IncrementSliderButton
					aria-controls={!incrementDisabled ? id : null}
					aria-label={decrementAriaLabel}
					aria-hidden={ariaHidden}
					className={css.decrementButton}
					data-webos-voice-group-label={voiceGroupLabel}
					disabled={decrementDisabled}
					icon={decrementIcon}
					onTap={onDecrement}
					onSpotlightDisappear={onDecrementSpotlightDisappear}
					orientation={orientation}
					spotlightDisabled={spotlightDisabled}
				/>
				<Slider
					{...ariaProps}
					active={active}
					aria-hidden={ariaHidden}
					backgroundProgress={backgroundProgress}
					css={css}
					disabled={disabled}
					focused={focused}
					id={id}
					knobStep={knobStep}
					max={max}
					min={min}
					noFill={noFill}
					onActivate={onActivate}
					onChange={onChange}
					onDragEnd={onDragEnd}
					onDragStart={onDragStart}
					onSpotlightDisappear={onSpotlightDisappear}
					orientation={orientation}
					spotlightDisabled={spotlightDisabled}
					step={step}
					value={value}
				/>
				<IncrementSliderButton
					aria-controls={!decrementDisabled ? id : null}
					aria-hidden={ariaHidden}
					aria-label={incrementAriaLabel}
					className={css.incrementButton}
					data-webos-voice-group-label={voiceGroupLabel}
					disabled={incrementDisabled}
					icon={incrementIcon}
					onSpotlightDisappear={onIncrementSpotlightDisappear}
					onTap={onIncrement}
					orientation={orientation}
					spotlightDisabled={spotlightDisabled}
				/>
			</div>
		);
	}
});

const IncrementSliderDecorator = compose(
	Pure,
	Changeable,
	IdProvider({generateProp: null, prefix: 's_'}),
	SliderBehaviorDecorator({emitSpotlightEvents: 'onSpotlightDirection'}),
	Skinnable,
	Slottable({slots: ['knob']})
);

/**
 * An IncrementSlider with Agate styling and SliderDecorator applied with IconButtons to
 * increment and decrement the value.
 *
 * By default, `IncrementSlider` maintains the state of its `value` property. Supply the
 * `defaultValue` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `value` at creation time and update it in response to
 * `onChange` events.
 *
 * @class IncrementSlider
 * @memberof agate/IncrementSlider
 * @extends agate/IncrementSlider.IncrementSliderBase
 * @ui
 * @public
 */
const IncrementSlider = IncrementSliderDecorator(IncrementSliderBase);

export default IncrementSlider;
export {
	IncrementSlider,
	IncrementSliderBase,
	IncrementSliderDecorator
};
