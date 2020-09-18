import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

import {positionToAngle} from '../Arc/utils';
import {angleToValue} from './utils';

// Adds agate-specific arcSlider behaviors
const ArcSliderBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'ArcSliderBehaviorDecorator';

		static propTypes = {
			endAngle: PropTypes.number,
			max: PropTypes.number,
			min: PropTypes.number,
			radius: PropTypes.number,
			startAngle: PropTypes.number,
			step: PropTypes.number,
			strokeWidth: PropTypes.number
		}

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
			const {endAngle, max, min, radius, startAngle, step, strokeWidth} = this.props;

			const svgRef = this.svgRef.current;
			if (!svgRef) {
				return;
			}
			// Find the coordinates with respect to the SVG
			const svgPoint = svgRef.createSVGPoint();
			svgPoint.x = ev.clientX;
			svgPoint.y = ev.clientY;
			const coordsInSvg = svgPoint.matrixTransform(svgRef.getScreenCTM().inverse());

			const angle = positionToAngle(coordsInSvg, radius * 2 - strokeWidth);

			// get the value based on the angle, min and max
			let value = angleToValue(angle, min, max, startAngle, endAngle);

			// adjust value based on the provided step
			if (step) {
				const delta = (value - min) % step;
				if (delta < step / 2) {
					value -= delta;
				} else {
					value += step - delta;
				}
			}

			this.setState({value: value});
		};

		render () {
			const props = Object.assign({}, this.props);

			return (
				<Wrapped
					{...props}
					svgRef={this.svgRef}
					onMouseDown={this.onMouseDown}
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
