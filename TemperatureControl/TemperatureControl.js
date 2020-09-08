/**
 * Provides Agate-themed slider components and behaviors.
 *
 * @example
 * <TemperatureControl
 *   defaultValue={-30}
 *   max={100}
 *   min={-100}
 *   step={10}
 * />
 *
 * @module agate/TemperatureControl
 * @exports TemperatureControl
 * @exports TemperatureControlBase
 * @exports TemperatureControlDecorator
 */

import classnames from 'classnames'
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import {
	angleToPosition,
	positionToAngle,
	valueToAngle,
	angleToValue,
	arcPathWithRoundedEnds,
	innerRadius
} from "./utils";

import css from './TemperatureControl.module.less';

/**
 * Range-selection input component.
 *
 * @class SliderBase
 * @extends ui/TemperatureControl.SliderBase
 * @memberof agate/TemperatureControl
 * @ui
 * @public
 */
 class TemperatureControlBase extends React.Component {

	static displayName=  'TemperatureControl';

	static propTypes = {
		minValue: PropTypes.number,
		maxValue: PropTypes.number,
		startAngle: PropTypes.number, // 0 - 360 degrees
		endAngle: PropTypes.number, // 0 - 360 degrees
		direction: PropTypes.oneOf(['cw', 'ccw']),
		axis: PropTypes.oneOf(['+x', '-x','+y','-y']),
	};

	static defaultProps = {
		minValue: 10,
		maxValue: 30,
		startAngle: 50,
		endAngle: 310,
		direction: "cw",
		axis: "-y",
	};

	constructor(props) {
		super(props);

		this.svgRef = React.createRef()

		this.state = {
			value: props.minValue
		};
	}

	onMouseDown = (ev) => {
		const svgRef = this.svgRef.current;
		if (svgRef) {
			svgRef.addEventListener("mousemove", this.processSelection);
			svgRef.addEventListener("mouseup", this.removeMouseListeners);
		}
		this.processSelection(ev);
	};

	removeMouseListeners = () => {
		const svgRef = this.svgRef.current;
		if (svgRef) {
			svgRef.removeEventListener("mousemove", this.processSelection);
			svgRef.removeEventListener("mouseup", this.removeMouseListeners);
		}
	};

	onValueChange = (v) => {
		this.setState({value: v});
	}

	processSelection = (ev) => {
		const {
			maxValue,
			minValue,
			direction,
			axis,
			startAngle,
			endAngle
		} = this.props;

		const svgRef = this.svgRef.current;
		if (!svgRef) {
			return;
		}
		// Find the coordinates with respect to the SVG
		const svgPoint = svgRef.createSVGPoint();
		const x = ev.clientX;
		const y = ev.clientY;
		svgPoint.x = x;
		svgPoint.y = y;
		const coordsInSvg = svgPoint.matrixTransform(svgRef.getScreenCTM().inverse());

		const angle = positionToAngle(coordsInSvg, direction, axis);
		// get the value based on the angle and round it to the nearest int value
		let value = Math.round(angleToValue(angle, minValue, maxValue, startAngle, endAngle));

		this.onValueChange(value);

	};

	render() {
		const {
			className,
			maxValue,
			minValue,
			startAngle,
			endAngle,
			direction,
			axis,
		} = this.props;

		const valueAngle = valueToAngle(this.state.value, minValue, maxValue, startAngle, endAngle);

		const knobPosition = angleToPosition({ degree: valueAngle, direction, axis }, innerRadius + 3);

		return (
			<div className={classnames(className, css.temperatureControl)}>
				<svg
					viewBox="0 0 350 350"
					ref={this.svgRef}
					onMouseDown={this.onMouseDown}
					onClick={
						/* TODO: be smarter about this -- for example, we could run this through our
						calculation and determine how close we are to the arc, and use that to decide
						if we propagate the click. */
						ev => ev.stopPropagation()
					}
				>
					<React.Fragment>
						{/* Arc Background  */}
						<path
							d={arcPathWithRoundedEnds(valueAngle, endAngle, direction, axis)}
							className={css.background}
						/>
						{/* Arc (render after background so it overlays it) */}
						<path
							d={arcPathWithRoundedEnds(startAngle, valueAngle, direction, axis)}
							className={ this.state.value< minValue+ (maxValue - minValue)/2 ? css.progressCold: css.progressHot}
						/>
					</React.Fragment>

					<React.Fragment>
						<circle
							className={ this.state.value< minValue+ (maxValue - minValue)/2 ? css.knobCold: css.knobHot}
							cx={knobPosition.x}
							cy={knobPosition.y}
						/>
					</React.Fragment>

				</svg>
				{this.state.value}
			</div>
		);
	}


};


/**
 * Agate-specific slider behaviors to apply to [SliderBase]{@link agate/TemperatureControl.SliderBase}.
 *
 * @hoc
 * @memberof agate/TemperatureControl
 * @mixes ui/Changeable.Changeable
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/Slottable.Slottable
 * @mixes ui/TemperatureControl.TemperatureControlDecorator
 * @public
 */
const TemperatureControlDecorator = compose(
	Pure,
	Changeable,
	//SliderBehaviorDecorator,
	Spottable,
	Slottable({slots: ['knob']}),
	Skinnable
);

/**
 * TemperatureControl input with Agate styling, [`Spottable`]{@link spotlight/Spottable.Spottable},
 * [Touchable]{@link ui/Touchable} and [`TemperatureControlDecorator`]{@link agate/TemperatureControl.TemperatureControlDecorator}
 * applied.
 *
 * By default, `TemperatureControl` maintains the state of its `value` property. Supply the `defaultValue`
 * property to control its initial value. If you wish to directly control updates to the
 * component, supply a value to `value` at creation time and update it in response to `onChange`
 * events.
 *
 * @class TemperatureControl
 * @memberof agate/TemperatureControl
 * @mixes agate/TemperatureControl.TemperatureControlDecorator
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
 * @memberof agate/TemperatureControl.TemperatureControl.prototype
 * @type {String|Number}
 * @public
 */

const TemperatureControl = TemperatureControlDecorator(TemperatureControlBase);


export default TemperatureControl;
export {
	TemperatureControl,
	TemperatureControlBase,
	TemperatureControlDecorator
};
