/**
 * Agate styled item with an icon and a label below.
 *
 * @example
 * <SliderItem decrementIcon="minus" incrementIcon="plus" />
 *
 * @module agate/SliderItem
 * @exports SliderItem
 * @exports SliderItemBase
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import Changeable from '@enact/ui/Changeable';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';
import React from 'react';

import Skinnable from '../Skinnable';
import {SliderBase} from '../Slider';
import {emitChange} from '../Slider/utils';
import {SlotItemBase} from '../SlotItem';

import SliderButton from './SliderButton';
import componentCss from './SliderItem.module.less';

const Slider = Spottable(Skinnable(SliderBase));

const sliderButtonDisabled = ({disabled, min, max, value = min}) => disabled || (max ? value >= max : value <= min);

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class SliderItemBase
 * @memberof agate/SliderItem
 * @extends agate/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Marquee.MarqueeController
 * @ui
 * @public
 */
const SliderItemBase = kind({
	name: 'SliderItem',

	propTypes: /** @lends agate/SliderItem.SliderItemBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * Assign a custom icon for the decrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link moonstone/IncrementSlider.IncrementSlider#vertical} is changed.
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
		 * Shows the tooltip, when present.
		 * @type {Boolean}
		 * @public
		 */
		focused: PropTypes.bool,

		/**
		 * Assign a custom icon for the incrementer. All strings supported by [Icon]{@link moonstone/Icon.Icon} are
		 * supported. Without a custom icon, the default is used, and is automatically changed when
		 * [vertical]{@link moonstone/IncrementSlider.IncrementSlider#vertical} is changed.
		 *
		 * @type {String}
		 * @public
		 */
		incrementIcon: PropTypes.string,

		/**
		 * The amount to increment or decrement the position of the knob via 5-way controls.
		 *
		 * It must evenly divide into the range designated by `min` and `max`. If not specified,
		 * `step` is used for the default value.
		 *
		 * @type {Number}
		 * @public
		 */
		knobStep: PropTypes.number,

		/**
		 * The maximum value of the increment slider.
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link moonstone/IncrementSlider.IncrementSliderBase.step}.
		 *
		 * @type {Number}
		 * @default 100
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the increment slider.
		 *
		 * The range between `min` and `max` should be evenly divisible by
		 * [step]{@link moonstone/IncrementSlider.IncrementSliderBase.step}.
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
		 * Sets the orientation of the slider, whether the slider moves left and right or up and
		 * down. Must be either `'horizontal'` or `'vertical'`.
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * The amount to increment or decrement the value.
		 *
		 * It must evenly divide into the range designated by `min` and `max`.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * Enables the built-in tooltip
		 *
		 * To customize the tooltip, pass either a custom Tooltip component or an instance of
		 * [IncrementSliderTooltip]{@link moonstone/IncrementSlider.IncrementSliderTooltip} with
		 * additional props configured.
		 *
		 * ```
		 * <IncrementSlider
		 *   tooltip={
		 *     <IncrementSliderTooltip percent side="after" />
		 *   }
		 * />
		 * ```
		 *
		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
		 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
		 *
		 * ```
		 * <IncrementSlider>
		 *   <IncrementSliderTooltip percent side="after" />
		 * </IncrementSlider>
		 * ```
		 *
		 * @type {Boolean|Element|Function}
		 * @public
		 */
		tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),

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
		max: 100,
		min: 0,
		noFill: false,
		step: 1
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: true
	},

	handlers: {
		onDecrement: emitChange(-1),
		onIncrement: emitChange(1)
	},

	computed: {
		slotBefore: ({css, decrementIcon, disabled, min, onDecrement, value}) => decrementIcon ? <SliderButton
			className={css.decrementButton}
			disabled={sliderButtonDisabled({disabled, min, value})}
			onTap={onDecrement}
		>
			{decrementIcon}
		</SliderButton> : null,
		slotAfter: ({css, disabled, incrementIcon, max, min, onIncrement, value}) => incrementIcon ? <SliderButton
			className={css.incrementButton}
			disabled={sliderButtonDisabled({disabled, min, max, value})}
			onTap={onIncrement}
		>
			{incrementIcon}
		</SliderButton> : null
	},

	render: ({
		backgroundProgress,
		css,
		disabled,
		focused,
		knobStep,
		max,
		min,
		noFill,
		onActivate,
		onChange,
		onDragEnd,
		onDragStart,
		step,
		tooltip,
		value,
		...rest
	}) => {
		delete rest.onDecrement;
		delete rest.onIncrement;
		delete rest.decrementIcon;
		delete rest.incrementIcon;

		return (
			<SlotItemBase
				disabled={disabled}
				{...rest}
			>
				<Slider
					className={css.slider}
					disabled={disabled}
					focused={focused}
					knobStep={knobStep}
					max={max}
					min={min}
					noFill={noFill}
					onActivate={onActivate}
					onChange={onChange}
					onDragEnd={onDragEnd}
					onDragStart={onDragStart}
					orientation="horizontal"
					step={step}
					tooltip={tooltip}
					value={value}
				/>
			</SlotItemBase>
		);
	}
});

const SliderItemDecorator = compose(
	Changeable,
	Spottable,
	Pure,
	Touchable,
	Skinnable
);

/**
 * A Agate styled labeled item with built-in support for marqueed text.
 *
 * @class SliderItem
 * @memberof agate/SliderItem
 * @extends agate/SliderItem.SliderItemBase
 * @ui
 * @public
 */
const SliderItem = SliderItemDecorator(SliderItemBase);

export default SliderItem;
export {SliderItem, SliderItemBase};
