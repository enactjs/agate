import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {validateRangeOnce, validateSteppedOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

import {positionToAngle} from '../Arc/utils';

import {angleToValue} from './utils';

const validateValueRange = validateRangeOnce((props) => props, {'component': 'ArcSliderBehaviorDecorator'});
const validateAngleRange = validateRangeOnce((props) => props, {'component': 'ArcSliderBehaviorDecorator', minName: 'startAngle', maxName: 'endAngle'});
const validateStepValue = validateSteppedOnce((props) => props, {'component': 'ArcSliderBehaviorDecorator'});
const validateStepMax = validateSteppedOnce((props) => props, {'component': 'ArcSliderBehaviorDecorator', valueName: 'max'});

/**
 * Adds agate-specific arcSlider behaviors.
 *
 * @class ArcSliderBehaviorDecorator
 * @memberof agate/ArcSlider
 * @hoc
 * @public
 */
const ArcSliderBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'ArcSliderBehaviorDecorator';

		static propTypes = /** @lends agate/ArcSlider.ArcSliderBehaviorDecorator.prototype */ {
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
			 * The start angle(in degrees) of the arc slider.
			 *
			 * The value should be between 0 and 360.
			 *
			 * @type {Number}
			 * @default 50
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
		};

		static defaultProps = {
			endAngle: 250,
			max: 100,
			min: 0,
			radius: 150,
			startAngle: 30,
			step: 1,
			strokeWidth: 6
		};

		constructor (props) {
			super(props);

			this.componentRef = React.createRef();

			this.state = {
				value: props.value ? props.value : props.min
			};
		}

		handleDown = ({clientX, clientY}) => {
			const params = {x: clientX, y: clientY};
			forward('onDown', params, this.props);
			this.emitChangeForPosition(params);
		};

		handleDragStart = (ev) => {
			forward('onDragStart', ev, this.props);
			this.emitChangeForPosition(ev);
		};

		handleDrag = (ev) => {
			forward('onDrag', ev, this.props);
			this.emitChangeForPosition(ev);
		};

		// Calculates the new SVG value based on the mouse cursor coordinates and sets the new value into the state
		emitChangeForPosition = (ev) => {
			const componentRef = this.componentRef.current;
			if (!componentRef) {
				return;
			}

			const {endAngle, max, min, radius, startAngle, step, strokeWidth} = this.props;
			// Find the coordinates with respect to the SVG
			const svgPoint = componentRef.createSVGPoint();
			svgPoint.x = ev.x;
			svgPoint.y = ev.y;
			const coordsInSvg = svgPoint.matrixTransform(componentRef.getScreenCTM().inverse());

			const angle = positionToAngle(coordsInSvg, radius * 2 - strokeWidth);
			// get the value based on the angle, min and max
			let value = angleToValue(angle, min, max, startAngle, endAngle);

			// adjust value based on the step
			if (step) {
				const delta = (value - min) % step;
				if (delta < step / 2) {
					value -= delta;
				} else {
					value += step - delta;
				}
			}

			if (value !== this.state.value) {
				this.setState(
					() => ({value}),
					() => {
						forward('onChange', {
							type: 'onChange',
							value
						}, this.props);
					}
				);
			}
		};

		render () {
			if (__DEV__) {
				const {endAngle, max, min, startAngle, step} = this.props;
				const valueProps = {min, value: this.state.value || min, max, step};
				const angleProps = {startAngle, endAngle};

				validateValueRange(valueProps);
				validateAngleRange(angleProps);
				validateStepValue(valueProps);
				validateStepMax(valueProps);
			}

			return (
				<Wrapped
					{...this.props}
					componentRef={this.componentRef}
					onDown={this.handleDown}
					onDrag={this.handleDrag}
					onDragStart={this.handleDragStart}
					value={this.state.value}
				/>
			);
		}
	};
});

export default ArcSliderBehaviorDecorator;
export {
	ArcSliderBehaviorDecorator
};
