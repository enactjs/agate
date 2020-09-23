/**
 * Provides Agate-themed temperature control components and behaviors.
 *
 * @example
 * <TemperatureControl
 *   defaultValue={10}
 *   max={30}
 *   min={10}
 *   scale="C"
 * />
 *
 * @module agate/TemperatureControl
 * @exports TemperatureControl
 * @exports TemperatureControlBase
 * @exports TemperatureControlDecorator
 */
import classnames from 'classnames';
import Pure from '@enact/ui/internal/Pure';
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
 * @extends ui/TemperatureControl.TemperatureControlBase
 * @memberof agate/TemperatureControl
 * @ui
 * @public
 */
const TemperatureControlBase = class extends React.Component {
	static displayName= 'TemperatureControl';

	static propTypes = /** @lends agate/TemperatureControl.TemperatureControlBase.prototype */ {
		/**
		 * The default value of the control.
		 *
		 * @type {Number}
		 * @public
		 */
		defaultValue: PropTypes.number,

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
		 * The scale of the temperature(C or F).
		 *
		 * @type {('C'|'F')}
		 * @default 'C'
		 * @public
		 */
		scale: PropTypes.oneOf(['C', 'F'])
	};

	static defaultProps= {
		defaultValue: 15,
		max: 30,
		min: 10,
		scale: 'C'
	};

	constructor (props) {
		super(props);

		this.state = {
			max: props.max,
			min: props.min,
			value: props.defaultValue
		};
	}

	componentDidUpdate (prevProps) {
		const {scale} = this.props;

		if (prevProps.scale !== scale && scale === 'C') {
			this.toCelsius();
		} else if (prevProps.scale !== scale && scale === 'F') {
			this.toFahrenheit();
		}
	}

	toCelsius () {
		this.setState((prevState) => {
			return ({
				max: Math.round((prevState.max - 32) * 5 / 9),
				min: Math.round((prevState.min - 32) * 5 / 9),
				value: Math.round((prevState.value - 32) * 5 / 9)
			});
		});
	}

	toFahrenheit () {
		this.setState((prevState) => {
			return ({
				max: Math.round((prevState.max * 9 / 5) + 32),
				min: Math.round((prevState.min * 9 / 5) + 32),
				value: Math.round((prevState.value * 9 / 5) + 32)
			});
		});
	}

	setValue = (values) => {
		this.setState({
			max: values.max,
			min: values.min,
			value: values.value
		});
	}

	render () {
		const {scale, ...rest} = this.props;

		return (
			<div {...rest} className={classnames(rest.className, css.temperatureControl)}>
				<ArcSlider
					backgroundColor="#444444"
					className={css.slider}
					endAngle={310}
					foregroundColor={this.state.value < this.state.min + (this.state.max - this.state.min) / 2 ? '#007aff' : '#f24949'}
					max={this.state.max}
					min={this.state.min}
					radius={150}
					setValue={this.setValue}
					startAngle={50}
					step={1}
					strokeWidth={6}
					value={this.state.value}
				/>
				<div className={css.valueDisplay}>
					<span>{this.state.value}°{scale}</span>
				</div>
			</div>
		);
	}
};

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
	Skinnable
);

/**
 * TemperatureControl with Agate styling
 * and [`TemperatureControlDecorator`]{@link agate/TemperatureControl.TemperatureControlDecorator}
 * applied.
 * Usage
 *
 *  <TemperatureControl
 *   defaultValue={10}
 *   max={30}
 *   min={10}
 *   scale="C"
 *   />
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
