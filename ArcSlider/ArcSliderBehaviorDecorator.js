import hoc from '@enact/core/hoc';
import React from 'react';

import { positionToAngle} from "../Arc/utils";
import {angleToValue} from "./utils";

// Adds agate-specific arcSlider behaviors
const ArcSliderBehaviorDecorator = hoc((config, Wrapped) => {


	return class extends React.Component {
		static displayName = 'ArcSliderBehaviorDecorator';



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
			const {max, min, endAngle, startAngle, radius, strokeWidth} = this.props;

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
