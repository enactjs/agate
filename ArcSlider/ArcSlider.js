/**
 * Agate styled arc slider components and behaviors.
 *
 * @example
 * <ArcSlider color="blue" endAngle={200} startAngle={0}" radius={100} />
 *
 * @module agate/ArcSlider
 * @exports ArcSlider
 * @exports ArcSliderBase
 * @exports ArcSliderDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import Skinnable from '../Skinnable';

import Arc from "../Arc";
import {angleToPosition} from "../Arc/utils";
import {valueToAngle} from "./utils";

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


//   children

		/**
		 * The color of the background arc.
		 *
		 * @type {String}
		 * @default: #000000
		 * @public
		 */
		backgroundColor: PropTypes.string,

		/**
		 * The color of the arc slider.
		 *
		 * @type {String}
		 * @default: #000000
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * The diameter of the arc slider in px.
		 *
		 * @type {number}
		 * @default: 300
		 * @public
		 */
		diameter: PropTypes.oneOf([240, 300]),

		/**
		 * The end angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {number}
		 * @default: 310
		 * @public
		 */
		endAngle: PropTypes.number,

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
		 * The start angle(in degrees) of the arc slider.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {number}
		 * @default: 50
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
		 * @type {number}
		 * @default: 1
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
		backgroundColor: '#000000',
		foregroundColor: '#0000ff',
		diameter: 300,
		endAngle: 310,
		max: 100,
		min: 0,
		startAngle: 50,
		step: 1,
		strokeWidth: 6,
		value: 85
	},

	computed: {
		radius: ({diameter}) => (diameter / 2),
		size : ({diameter, strokeWidth}) => (diameter - strokeWidth),
	},

	render: ({backgroundColor, diameter, endAngle, foregroundColor, max, min, radius, size, startAngle, strokeWidth, value, ...rest}) => {
		const halfStrokeWidth = strokeWidth / 2;
		//const viewBox = `-${halfStrokeWidth} -${halfStrokeWidth} ${diameter}  ${diameter}`;
		const valueAngle = valueToAngle(value, min, max, startAngle, endAngle);
		const knobPosition = angleToPosition(valueAngle, radius - halfStrokeWidth , size);

		return (
				<div
					//ref={this.svgRef}
					//onMouseDown={this.onMouseDown}
					{...rest}
					>
					<Arc
						style={{position: "absolute"}}
						endAngle={endAngle}
						startAngle={startAngle}
						radius={radius}
						strokeWidth={strokeWidth}
						color={backgroundColor}
					/>

					<React.Fragment>
						<Arc
							style={{position: "absolute", overflow: "visible"}}
							endAngle={valueAngle}
							startAngle={startAngle}
							radius={radius}
							strokeWidth={strokeWidth}
							color={foregroundColor}
						>
							<circle
								//className={this.state.value < (min + (max - min) / 2) ? css.knobCold : css.knobHeat}
								cx={knobPosition.x}
								cy={knobPosition.y}
								r={ri.scaleToRem(15)}
							/>
						</Arc>
					</React.Fragment>
				</div>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ArcSlider]{@link agate/ArcSlider.ArcSliderBase} components.
 *
 * @hoc
 * @memberof agate/ArcSlider
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcSliderDecorator = compose(
	Pure,
	Skinnable
);

/**
 * An arc slider component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <ArcSlider color="blue" endAngle={200} startAngle={0}" radius={100} />
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
