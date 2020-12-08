/**
 * Agate styled arc slider components and behaviors.
 *
 * @example
 * <ArcSlider />
 *
 * @module agate/ArcSlider
 * @exports ArcSlider
 * @exports ArcSliderBase
 * @exports ArcSliderDecorator
 */

import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Pure from '@enact/ui/internal/Pure';
import ri from '@enact/ui/resolution';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import {angleToPosition} from '../Arc/utils';
import Skinnable from '../Skinnable';

import ArcSliderBehaviorDecorator from './ArcSliderBehaviorDecorator';
import {valueToAngle} from './utils';

import css from './ArcSlider.module.less';

const isDown = is('down');
const isUp = is('up');

/**
 * An arc slider component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [ArcSlider]{@link agate/ArcSlider.ArcSlider}.
 *
 * @class ArcSliderBase
 * @memberof agate/ArcSlider
 * @ui
 * @public
 */
const ArcSliderBase = kind({
	name: 'ArcSlider',

	propTypes: /** @lends agate/ArcSlider.ArcSliderBase.prototype */ {
		/**
		 * The accent color of the arcs.
		 *
		 * @type {String}
		 * @default #8b7efe
		 * @public
		 */
		accentColor: PropTypes.string,

		/**
		 * The color of the background arc.
		 *
		 * @type {String}
		 * @default #000000
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * Function that generates a reference to the arc svg.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		componentRef: EnactPropTypes.ref,

		/**
		 * Whether or not the component is in a disabled state.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The end angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {Number}
		 * @default 250
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The color of the foreground arc.
		 *
		 * @type {String}
		 * @default #0000ff
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * Whether or not the component is focused.
		 *
		 * @type {Boolean}
		 * @private
		 */
		isFocused: PropTypes.bool,

		/**
		 * The maximum value of the slider and should be greater than min.
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
		 * Called when value is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * The radius of the arc circle.
		 *
		 * @type {Number}
		 * @default 150
		 * @public
		 */
		radius: PropTypes.number,

		/**
		 * Nodes to be inserted in the center of the ArcSlider.
		 *
		 * @type {Node}
		 * @public
		 */
		slotCenter: PropTypes.node,

		/**
		 * The start angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {Number}
		 * @default 30
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The amount to increment or decrement the value.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		step: PropTypes.number,

		/**
		 * The stroke width of the arc slider.
		 *
		 * @type {Number}
		 * @default 6
		 * @public
		 */
		strokeWidth: PropTypes.number,

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
		accentColor: '#8b7efe',
		backgroundColor: '#000000',
		endAngle: 250,
		foregroundColor: '#0000ff',
		max: 100,
		min: 0,
		radius: 150,
		startAngle: 30,
		step: 1,
		strokeWidth: 6
	},

	styles: {
		css,
		className: 'arcSlider'
	},

	handlers: {
		onKeyDown: (ev, props) => {
			const {disabled, max, min, onChange, step, value} = props;

			forward('onKeyDown', ev, props);

			if (!disabled) {
				if (isDown(ev.keyCode)) {
					onChange(ev, Math.max(value - step, min));
				} else if (isUp(ev.keyCode)) {
					onChange(ev, Math.min(value + step, max));
				}
			}
		}
	},

	computed: {
		size : ({radius, strokeWidth}) => (radius * 2 - strokeWidth),
		style: ({radius, style}) => {
			const size = ri.scaleToRem(radius * 2);
			return {...style, height: size, width: size};
		}
	},

	render: ({accentColor, backgroundColor, componentRef, disabled, endAngle, foregroundColor, isFocused, max, min, radius, size, slotCenter, startAngle, strokeWidth, value, ...rest}) => {
		const valueAngle = valueToAngle(value, min, max, startAngle, endAngle);
		const knobPosition = angleToPosition(valueAngle, radius - (strokeWidth / 2), size);

		delete rest.step;

		return (
			// eslint-disable-next-line jsx-a11y/role-has-required-aria-props
			<div aria-disabled={disabled} aria-valuetext={value} role="slider" {...rest} disabled={disabled}>
				<Arc
					className={css.arc}
					color={backgroundColor}
					endAngle={endAngle}
					radius={radius}
					startAngle={valueAngle}
					strokeWidth={strokeWidth}
				/>
				<Arc
					className={css.arc}
					color={foregroundColor}
					endAngle={valueAngle}
					radius={radius}
					startAngle={startAngle}
					strokeWidth={strokeWidth}
					pointerEvents="auto"
					componentRef={componentRef}
				>
					<circle
						cx={knobPosition.x}
						cy={knobPosition.y}
						fill={isFocused ? accentColor : foregroundColor}
						r={ri.scaleToRem(15)}
					/>
				</Arc>
				<div className={css.valueDisplay}>
					{slotCenter}
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcSliderBase]{@link agate/ArcSlider.ArcSliderBase} components.
 *
 * @hoc
 * @memberof agate/ArcSlider
 * @mixes agate/ArcSlider.ArcSliderBehaviorDecorator
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcSliderDecorator = compose(
	Pure,
	ArcSliderBehaviorDecorator,
	Touchable,
	Spottable,
	Skinnable
);

/**
 * An arc slider component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcSlider backgroundColor="blue" endAngle={200} foregroundColor="red" radius={150} startAngle={0} step={2} />
 * ```
 *
 * @class ArcSlider
 * @memberof agate/ArcSlider
 * @extends agate/ArcSlider.ArcSliderBase
 * @mixes agate/ArcSlider.ArcSliderDecorator
 * @ui
 * @public
 */
const ArcSlider = ArcSliderDecorator(ArcSliderBase);

export default ArcSlider;
export {
	ArcSlider,
	ArcSliderBase,
	ArcSliderDecorator
};
