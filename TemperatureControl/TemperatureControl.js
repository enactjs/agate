/**
 * Provides Agate-themed temperature control components and behaviors.
 *
 * @example
 * <TemperatureControl
 *   max={100}
 *   min={-100}
 * />
 *
 * @module agate/TemperatureControl
 * @exports TemperatureControl
 * @exports TemperatureControlBase
 * @exports TemperatureControlDecorator
 */

import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import css from './TemperatureControl.module.less';
import {ArcSliderBase} from '../ArcSlider';
import {ArcSliderBehaviorDecorator} from '../ArcSlider/ArcSliderBehaviorDecorator';
import kind from '@enact/core/kind';


const ArcSlider = Skinnable(ArcSliderBase);
/**
 * Temperature control base component.
 *
 * @class TemperatureControlBase
 * @extends ui/TemperatureControl.TemperatureControlBase
 * @memberof agate/TemperatureControl
 * @ui
 * @public
 */
const TemperatureControlBase = kind({
	name: 'TemperatureControl',

	propTypes: /** @lends agate/ArcSlider.ArcSliderBase.prototype */ {
		/**
		 * Function that generates a reference to the arc svg.
		 *
		 * @type {Function}
		 * @public
		 */
		componentRef: PropTypes.object,

		/**
		 * The end angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {number}
		 * @default 310
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The minimum value of the slider.
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
		 * Function that generates a reference to the current svg.
		 *
		 * @type {Function}
		 * @public
		 */
		onMouseDown: PropTypes.func,

		/**
		 * Called when the touch starts over the arc slider area.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onTouchStart: PropTypes.func,

		/**
		 * The radius of the arc circle.
		 *
		 * @type {Number}
		 * @default 150
		 * @public
		 */
		radius: PropTypes.number,

		/**
		 * The scale of the temperature(C or F).
		 *
		 * @type {('C'|'F')}
		 * @default 'C'
		 * @public
		 */
		scale: PropTypes.oneOf(['C', 'F']),

		/**
		 * The start angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {number}
		 * @default 50
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The stroke width of the arc slider.
		 *
		 * @type {number}
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
		endAngle: 310,
		max: 30,
		min: 10,
		radius: 150,
		scale: 'C',
		startAngle: 50,
		strokeWidth: 6,
		value: 15
	},

	styles: {
		css,
		className: 'temperatureControl'
	},

	render: ({componentRef, endAngle, max, min, onMouseDown, onTouchStart, radius, scale, startAngle, strokeWidth, value, ...rest}) => {
		return (
			<div {...rest} >
				<ArcSlider
					backgroundColor="#444444"
					className={css.slider}
					componentRef={componentRef}
					endAngle={endAngle}
					foregroundColor={value < min + (max - min) / 2 ? '#007aff' : '#f24949'}
					onMouseDown={onMouseDown}
					onTouchStart={onTouchStart}
					max={max}
					min={min}
					radius={radius}
					startAngle={startAngle}
					strokeWidth={strokeWidth}
					value={value}
				/>
				<div className={css.valueDisplay}>
					<span>{value}°{scale}</span>
				</div>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [TemperatureControlBase]{@link agate/TemperatureControl.TemperatureControlBase}.
 *
 * @hoc
 * @memberof agate/TemperatureControl
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/TemperatureControl.TemperatureControlDecorator
 * @public
 */
const TemperatureControlDecorator = compose(
	Pure,
	ArcSliderBehaviorDecorator,
	Skinnable
);

/**
 * TemperatureControl with Agate styling
 * and [`TemperatureControlDecorator`]{@link agate/TemperatureControl.TemperatureControlDecorator}
 * applied.
 *
 * @class TemperatureControl
 * @memberof agate/TemperatureControl
 * @mixes agate/TemperatureControl.TemperatureControlDecorator
 * @ui
 * @public
 */
const TemperatureControl = TemperatureControlDecorator(TemperatureControlBase);

export default TemperatureControl;
export {
	TemperatureControl,
	TemperatureControlBase,
	TemperatureControlDecorator
};
