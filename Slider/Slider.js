/**
 * Provides Agate-themed slider components and behaviors.
 *
 * @example
 * <Slider
 *   defaultValue={-30}
 *   max={100}
 *   min={-100}
 *   step={10}
 * />
 *
 * @module agate/Slider
 * @exports Slider
 * @exports SliderBase
 * @exports SliderDecorator
 */

import {forKey, forProp, forward, forwardWithPrevent, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import ProgressBar from '@enact/ui/ProgressBar';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import UiSlider from '@enact/ui/Slider';
import PropTypes from 'prop-types';
import anyPass from 'ramda/src/anyPass';
import compose from 'ramda/src/compose';
import React from 'react';

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
 * @extends ui/Slider.SliderBase
 * @memberof agate/Slider
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
		 * @public
		 */
		activateOnFocus: PropTypes.bool,

		/**
		 * Sets the knob to selected state and allows it to move via 5-way controls.
		 *
		 * @type {Boolean}
		 * @public
		 */
		active: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
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
		 * The handler when the knob is activated or deactivated by selecting it via 5-way
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
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

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
			forwardWithPrevent('onKeyDown'),
			anyPass([
				handleIncrement,
				handleDecrement
			])
		),
		onKeyUp: handle(
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
		})
	},

	render: ({css, ...rest}) => {
		delete rest.activateOnFocus;
		delete rest.active;
		delete rest.focused;
		delete rest.knobStep;
		delete rest.onActivate;

		return (
			<UiSlider
				{...rest}
				css={css}
				progressBarComponent={
					<ProgressBar css={css} />
				}
			/>
		);
	}
});

/**
 * Agate-specific slider behaviors to apply to [SliderBase]{@link agate/Slider.SliderBase}.
 *
 * @hoc
 * @memberof agate/Slider
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/Slottable.Slottable
 * @mixes ui/Slider.SliderDecorator
 * @public
 */
const SliderDecorator = compose(
	Pure,
	Changeable,
	SliderBehaviorDecorator,
	Spottable,
	Slottable({slots: ['knob']}),
	Skinnable
);

/**
 * Slider input with Agate styling, [`Spottable`]{@link spotlight/Spottable.Spottable},
 * [Touchable]{@link ui/Touchable} and [`SliderDecorator`]{@link agate/Slider.SliderDecorator}
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

const Slider = SliderDecorator(SliderBase);

export default Slider;
export {
	Slider,
	SliderBase,
	SliderDecorator
};
