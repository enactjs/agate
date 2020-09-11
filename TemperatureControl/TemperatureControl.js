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

import classnames from 'classnames';
import Spottable from '@enact/spotlight/Spottable';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import {
	angleToPosition,
	angleToValue,
	arcPath,
	positionToAngle,
	svgRadius,
	valueToAngle
} from './utils';

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
class TemperatureControlBase extends React.Component {
	static displayName=  'TemperatureControl';

	static propTypes = {
		max: PropTypes.number,
		min: PropTypes.number
	};

	static defaultProps = {
		max: 30,
		min: 10
	};

	constructor (props) {
		super(props);

		this.svgRef = React.createRef();

		this.state = {
			value: props.min
		};
	}

	onMouseDown = (ev) => {
		const svgRef = this.svgRef.current;
		if (svgRef) {
			svgRef.addEventListener('mousemove', this.calculateNewValue);
			svgRef.addEventListener('mouseup', this.removeMouseListeners);
		}
		this.calculateNewValue(ev);
	};

	removeMouseListeners = () => {
		const svgRef = this.svgRef.current;
		if (svgRef) {
			svgRef.removeEventListener('mousemove', this.calculateNewValue);
			svgRef.removeEventListener('mouseup', this.removeMouseListeners);
		}
	};

	// Calculates the new SVG value based on the mouse cursor coordinates and sets the new value into the state
	calculateNewValue = (ev) => {
		const {max, min} = this.props;

		const svgRef = this.svgRef.current;
		if (!svgRef) {
			return;
		}
		// Find the coordinates with respect to the SVG
		const svgPoint = svgRef.createSVGPoint();
		svgPoint.x = ev.clientX;
		svgPoint.y = ev.clientY;
		const coordsInSvg = svgPoint.matrixTransform(svgRef.getScreenCTM().inverse());

		const angle = positionToAngle(coordsInSvg);

		// get the value based on the angle, min and max
		let value = angleToValue(angle, min, max);

		this.setState({value: value});
	};

	render () {
		const {className, max, min} = this.props;

		const valueAngle = valueToAngle(this.state.value, min, max);

		// position the knob on the arc
		const knobPosition = angleToPosition(valueAngle, svgRadius);

		return (
			<div className={classnames(className, css.temperatureControl)}>
				<svg
					viewBox="0 0 350 350"
					ref={this.svgRef}
					onMouseDown={this.onMouseDown}
				>
					<React.Fragment>
						{/* background  */}
						<path
							className={css.background}
							d=" M 56.26311131655841 274.6320795014136 A 155 155 90 1 1 293.7368886834416 274.6320795014136"
						/>
						{/* value arc */}
						<path
							className={this.state.value < (min + (max - min) / 2) ? css.progressCold : css.progressHeat}
							d={arcPath(valueAngle)}
						/>
					</React.Fragment>

					<React.Fragment>
						<circle
							className={this.state.value < (min + (max - min) / 2) ? css.knobCold : css.knobHeat}
							cx={knobPosition.x}
							cy={knobPosition.y}
							r={16}
						/>
					</React.Fragment>
				</svg>
				<div className={css.valueDisplay}>
					<span>{this.state.value}°C</span>
				</div>
			</div>
		);
	}
}

/**
 * Applies Agate specific behaviors to [TemperatureControlBase]{@link agate/TemperatureControl.TemperatureControlBase}.
 *
 * @hoc
 * @memberof agate/TemperatureControl
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/TemperatureControl.TemperatureControlDecorator
 * @public
 */
const TemperatureControlDecorator = compose(
	Pure,
	Spottable,
	Skinnable
);

/**
 * TemperatureControl with Agate styling, [`Spottable`]{@link spotlight/Spottable.Spottable}
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
