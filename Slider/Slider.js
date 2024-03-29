/**
 * Provides Agate-themed slider components and behaviors.
 *
 * @example
 * <Slider
 * 	defaultValue={-30}
 * 	max={100}
 * 	min={-100}
 * 	step={10}
 * />
 *
 * @module agate/Slider
 * @exports Slider
 * @exports SliderBase
 * @exports SliderDecorator
 * @exports SliderTooltip
 */

// TODO: Add 'activated' styling for slider (If 5-way is needed)

import {forKey, forProp, forward, forwardWithPrevent, handle} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ComponentOverride from '@enact/ui/ComponentOverride';
import ProgressBar from '@enact/ui/ProgressBar';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import UiSlider from '@enact/ui/Slider';
import PropTypes from 'prop-types';
import anyPass from 'ramda/src/anyPass';
import compose from 'ramda/src/compose';

import {ProgressBarTooltip} from '../ProgressBar';
import Skinnable from '../Skinnable';

import SliderBehaviorDecorator from './SliderBehaviorDecorator';
import {
	handleDecrement,
	handleIncrement
} from './utils';

import componentCss from './Slider.module.less';

/**
 * Range-selection input component.
 *
 * @class SliderBase
 * @memberof agate/Slider
 * @extends ui/Slider.SliderBase
 * @mixes agate/Slider.SliderDecorator
 * @ui
 * @public
 */
const SliderBase = kind({
	name: 'Slider',

	propTypes: /** @lends agate/Slider.SliderBase.prototype */ {
		/**
		 * Activates the component when focused so that it may be manipulated via the directional
		 * input keys.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		activateOnFocus: PropTypes.bool,

		/**
		 * Sets the knob to selected state and allows it to move via 5-way controls.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		active: PropTypes.bool,

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
		 * The following classes are supported:
		 *
		 * * `slider` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables component and does not generate events.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Indicates that the slider has gained focus.
		 *
		 * @type {Boolean}
		 * @public
		 */
		focused: PropTypes.bool,

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
		 * The maximum value of the slider.
		 *
		 * @type {Number}
		 * @default 100
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		min: PropTypes.number,

		/**
		 * Called when the knob is activated or deactivated by selecting it via 5-way
		 *
		 * @type {Function}
		 * @public
		 */
		onActivate: PropTypes.func,

		/**
		 * Called when a key is pressed down while the slider is focused.
		 *
		 * When a directional key is pressed down and the knob is active (either by first
		 * pressing enter or when `activateOnFocus` is enabled), the Slider will increment or
		 * decrement the current value and emit an `onChange` event. This default behavior can be
		 * prevented by calling `preventDefault()` on the event passed to this callback.
		 *
		 * @type {Function}
		 * @public
		 */
		onKeyDown: PropTypes.func,

		/**
		 * Called when a key is released while the slider is focused.
		 *
		 * When the enter key is released and `activateOnFocus` is not enabled, the slider will be
		 * activated to enable incrementing or decrementing the value via directional keys. This
		 * default behavior can be prevented by calling `preventDefault()` on the event passed to
		 * this callback.
		 *
		 * @type {Function}
		 * @public
		 */
		onKeyUp: PropTypes.func,

		/**
		 * Sets the point, as a proportion between 0 and 1, from which the slider is filled.
		 *
		 * Applies to both the slider's `value` and `backgroundProgress`. In both cases,
		 * setting the value of `progressAnchor` will cause the slider to fill from that point
		 * down, when `value` or `backgroundProgress` is proportionally less than the anchor, or up,
		 * when `value` or `backgroundProgress` is proportionally greater than the anchor, rather
		 * than always from the start of the slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progressAnchor: PropTypes.number,

		/**
		 * Called with the reference to the Slider node.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		sliderRef: EnactPropTypes.ref,

		/**
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * Enables the built-in tooltip
		 *
		 * To customize the tooltip, pass either a custom tooltip component or an instance of
		 * {@link agate/Slider.SliderTooltip|SliderTooltip} with additional props configured.
		 *
		 * ```
		 * <Slider
		 *   tooltip={
		 *     <SliderTooltip percent side="after" />
		 *   }
		 * />
		 * ```
		 *
		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
		 * {@link ui/Slottable|Slottable} for more information on how slots can be used.
		 *
		 * ```
		 * <Slider>
		 *   <SliderTooltip percent side="after" />
		 * </Slider>
		 * ```
		 *
		 * If a custom tooltip is provided, it will receive the following props:
		 *
		 * * `children` - The `value` prop from the slider
		 * * `visible` - `true` if the tooltip should be displayed
		 * * `orientation` - The value of the `orientation` prop from the slider
		 * * `proportion` - A number between 0 and 1 representing the proportion of the `value` in
		 *   terms of `min` and `max`
		 *
		 * @type {Boolean|Element|Function}
		 * @public
		 */
		tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),

		/**
		 * The value of the slider.
		 *
		 * Defaults to the value of `min`.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		activateOnFocus: false,
		active: false,
		disabled: false,
		max: 100,
		min: 0,
		progressAnchor: 0,
		step: 1
	},

	styles: {
		css: componentCss,
		className: 'slider',
		publicClassNames: true
	},

	handlers: {
		onBlur: handle(
			forward('onBlur'),
			forProp('active', true),
			forward('onActivate')
		),
		onKeyDown: handle(
			forProp('disabled', false),
			forwardWithPrevent('onKeyDown'),
			anyPass([
				handleIncrement,
				handleDecrement
			])
		),
		onKeyUp: handle(
			forProp('disabled', false),
			forwardWithPrevent('onKeyUp'),
			forProp('activateOnFocus', false),
			forKey('enter'),
			forward('onActivate')
		)
	},

	computed: {
		className: ({activateOnFocus, active, styler}) => styler.append({
			activateOnFocus,
			active
		}),
		tooltip: ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip
	},

	render: ({css, disabled, focused, sliderRef, tooltip, ...rest}) => {
		delete rest.activateOnFocus;
		delete rest.active;
		delete rest.knobStep;
		delete rest.onActivate;

		return (
			<UiSlider
				{...rest}
				aria-disabled={disabled}
				css={css}
				disabled={disabled}
				progressBarComponent={
					<ProgressBar css={css} />
				}
				ref={sliderRef}
				tooltipComponent={
					<ComponentOverride
						component={tooltip}
						css={css}
						visible={focused}
					/>
				}
			/>
		);
	}
});

/**
 * Agate-specific slider behaviors to apply to {@link agate/Slider.SliderBase|SliderBase}.
 *
 * @hoc
 * @memberof agate/Slider
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const SliderDecorator = compose(
	Pure,
	Changeable,
	SliderBehaviorDecorator,
	Spottable,
	Slottable({slots: ['knob', 'tooltip']}),
	Skinnable
);

/**
 * Slider input with Agate styling, {@link spotlight/Spottable.Spottable|Spottable},
 * {@link ui/Touchable|Touchable} and {@link agate/Slider.SliderDecorator|SliderDecorator}
 * applied.
 *
 * By default, `Slider` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the
 * component, supply a value to `value` at creation time and update it in response to `onChange`
 * events.
 *
 * @class Slider
 * @memberof agate/Slider
 * @mixes agate/Slider.SliderDecorator
 * @ui
 * @public
 */
const Slider = SliderDecorator(SliderBase);

/**
 * Overrides the `aria-valuetext` for the slider.
 *
 * By default, `aria-valuetext` is set to the current value. This should only be used when
 * the parent controls the value of the slider directly through the props.
 *
 * @name aria-valuetext
 * @memberof agate/Slider.Slider.prototype
 * @type {String|Number}
 * @public
 */

/**
 * A {@link agate/TooltipDecorator.Tooltip|Tooltip} specifically adapted for use with
 * {@link agate/ProgressBar.ProgressBar|ProgressBar} or
 * {@link agate/Slider.Slider|Slider}.
 *
 * @see {@link agate/ProgressBar.ProgressBarTooltip}
 * @class SliderTooltip
 * @memberof agate/Slider
 * @ui
 * @public
 */

export default Slider;
export {
	Slider,
	SliderBase,
	SliderDecorator,
	ProgressBarTooltip as SliderTooltip
};
