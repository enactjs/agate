/**
 * Provides Agate-themed temperature control components and behaviors.
 *
 * @example
 * <TemperatureControl
 *   max={30}
 *   min={10}
 *   unit="Celsius"
 *   defaultValue={10}
 * />
 *
 * @module agate/TemperatureControl
 * @exports TemperatureControl
 * @exports TemperatureControlBase
 * @exports TemperatureControlDecorator
 */

import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import MeasurementFactory from 'ilib/lib/MeasurementFactory';
import UnitFmt from 'ilib/lib/UnitFmt';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import ArcSlider from '../ArcSlider';
import Skinnable from '../Skinnable';

import css from './TemperatureControl.module.less';

/**
 * Temperature control base component.
 *
 * @class TemperatureControlBase
 * @memberof agate/TemperatureControl
 * @ui
 * @public
 */
const TemperatureControlBase =  kind({
	name: 'TemperatureControl',

	propTypes: /** @lends agate/TemperatureControl.TemperatureControlBase.prototype */ {
		/**
		 * The minimum value of the slider.
		 *
		 * @type {Number}
		 * @default 30
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The minimum value of the slider.
		 *
		 * @type {Number}
		 * @default 10
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
		 * The unit of the temperature(Celsius or Fahrenheit).
		 *
		 * @type {('Celsius'|'Fahrenheit')}
		 * @default 'Celsius'
		 * @public
		 */
		unit: PropTypes.oneOf(['Celsius', 'Fahrenheit']),

		/**
		 * The value of the control.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},
	defaultProps: {
		max: 30,
		min: 10,
		unit: 'Celsius',
		value: 15
	},

	styles: {
		css,
		className: 'temperatureControl',
		publicClassNames: true
	},

	render: ({max, min, onChange, unit, value, ...rest}) => {
		let currentTemperature = MeasurementFactory({unit: unit, amount: value});
		let ufmt = new UnitFmt({autoConvert: true, length: 'short', maxFractionDigits: 0, roundingMode: 'halfup'});
		const currentTemperatureString =  ufmt.format(currentTemperature);

		return (
			<div {...rest}>
				<ArcSlider
					backgroundColor="#444444"
					className={css.slider}
					endAngle={310}
					foregroundColor={value < min + (max - min) / 2 ? '#007aff' : '#f24949'}
					max={max}
					min={min}
					onChange={onChange}
					radius={150}
					slotCenter={
						<div className={css.valueDisplay}>
							<span>{currentTemperatureString}</span>
						</div>
					}
					startAngle={50}
					step={1}
					strokeWidth={6}
					value={value}
				/>
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
 * @public
 */
const TemperatureControlDecorator = compose(
	Pure,
	Changeable,
	Skinnable
);

/**
 * TemperatureControl with Agate styling
 * and [`TemperatureControlDecorator`]{@link agate/TemperatureControl.TemperatureControlDecorator}
 * applied.
 * Usage
 *
 *  <TemperatureControl *
 *   max={30}
 *   min={10}
 *   unit="Celsius"
 *   value={10}
 *   />
 *
 * @class TemperatureControl
 * @memberof agate/TemperatureControl
 * @extends agate/TemperatureControl.TemperatureControlBase
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
