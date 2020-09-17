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
import ArcSliderBehaviorDecorator from "./ArcSliderBehaviorDecorator";
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

		// /**
		//  * Additional controls displayed.
		//  *
		//  * @type {Node}
		//  * @public
		//  */
		// children: PropTypes.node,

		/**
		 * The color of the arc slider.
		 *
		 * @type {String}
		 * @default: #000000
		 * @public
		 */
		foregroundColor: PropTypes.string,

		/**
		 * The radius of the arc slider in px.
		 *
		 * @type {number}
		 * @default: 150
		 * @public
		 */
		radius: PropTypes.oneOf([120, 150]),

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
		 * Function that generates a reference to the current loaded media
		 *
		 * @type {Function}
		 * @public
		 */
		svgRef: PropTypes.func,

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
		radius: 150,
		endAngle: 310,
		max: 100,
		min: 0,
		startAngle: 50,
		step: 1,
		strokeWidth: 6,
		value: 85
	},

	computed: {
		size : ({radius, strokeWidth}) => (radius * 2 - strokeWidth)
	},

	render: ({backgroundColor, children, endAngle, foregroundColor, height, max, min, onMouseDown, radius, size, startAngle, strokeWidth, svgRef, value, width, ...rest}) => {
		const valueAngle = valueToAngle(value, min, max, startAngle, endAngle);
		console.log(value, min, max, startAngle, endAngle);
		const knobPosition = angleToPosition(valueAngle, radius - (strokeWidth / 2) , size);

		return (
			<div
				onMouseDown={onMouseDown}
			>
				<Arc style={{position: "absolute", overflow: "visible"}}
					endAngle={endAngle}
					startAngle={startAngle}
					radius={radius}
					strokeWidth={strokeWidth}
					color={backgroundColor}

				/>
				<Arc style={{position: "absolute", overflow: "visible"}}
					endAngle={valueAngle}
					startAngle={startAngle}
					radius={radius}
					strokeWidth={strokeWidth}
					color={foregroundColor}
					svgRef={svgRef}

				>
					<circle
						//className={this.state.value < (min + (max - min) / 2) ? css.knobCold : css.knobHeat}
						cx={knobPosition.x}
						cy={knobPosition.y}
						r={ri.scaleToRem(15)}
					/>
				</Arc>

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
	ArcSliderBehaviorDecorator,
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
