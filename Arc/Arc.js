import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';
import Skinnable from '../Skinnable';

import css from './Arc.module.less';

// this conversion is needed so the 0 degree position can be on the bottom, instead of the right + to avoid negative values
const convertAngle = (angle) => {
	return (270 + 360 - angle) % 360;
};

const angleToPosition = (angle, radius, svgSize) => {
	const angleInRadians = (convertAngle(angle) / 180) * Math.PI;
	let dX;
	let dY;

	if (angleInRadians <= Math.PI) {
		// we are in the upper two quadrants
		if (angleInRadians <= Math.PI / 2) {
			dY = Math.sin(angleInRadians) * radius;
			dX = Math.cos(angleInRadians) * radius;
		} else {
			dY = Math.sin(Math.PI - angleInRadians) * radius;
			dX = Math.cos(Math.PI - angleInRadians) * radius * -1;
		}
		// we are in the lower two quadrants
	} else if (angleInRadians > Math.PI && angleInRadians <= Math.PI * 1.5) {
		dY = Math.sin(angleInRadians - Math.PI) * radius * -1;
		dX = Math.cos(angleInRadians - Math.PI) * radius * -1;
	} else {
		dY = Math.sin(2 * Math.PI - angleInRadians) * radius * -1;
		dX = Math.cos(2 * Math.PI - angleInRadians) * radius;
	}

	// dX and dY are calculated based on having (0, 0) at the center
	// Now, translate dX and dY to svg coordinates, where (0, 0) is at the top left
	const x = dX + svgSize / 2;
	const y = svgSize / 2 - dY;

	return {x, y};
};

const arcPath = (startAngle, endAngle, svgRadius, svgSize) => {
	if (startAngle % 360 === endAngle % 360 && startAngle !== endAngle) {
		// Drawing a full circle, slightly offset end angle, so the circle can be rendered
		endAngle = endAngle - 0.001;
	}

	const largeArc = endAngle - startAngle >= 180;
	const arcStart = angleToPosition(startAngle, svgRadius, svgSize);
	const arcEnd = angleToPosition(endAngle, svgRadius, svgSize);

	return `M ${arcStart.x},${arcStart.y} A ${svgRadius} ${svgRadius} 0 ${largeArc ? '1' : '0'} 1 ${arcEnd.x} ${arcEnd.y}`;
};

/**
 * An arc component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Arc]{@link agate/Arc.Arc}.
 *
 * @class ArcBase
 * @memberof agate/Arc
 * @ui
 * @public
 */
const ArcBase = kind({
	name: 'Arc',

	propTypes: /** @lends agate/Arc.ArcBase.prototype */ {
		/**
		 * The color of the arc.
		 *
		 * @type {String}
		 * @default: #000000
		 * @public
		 */
		color: PropTypes.string,

		/**
		 * The end angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle
		 *
		 * @type {number}
		 * @default: 310
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * The radius of the arc.
		 *
		 * @type {number}
		 * @default: 100
		 * @public
		 */
		radius: PropTypes.number,

		/**
		 * The start angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360
		 *
		 * @type {number}
		 * @default: 50
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * The thickness of the arc.
		 *
		 * @type {number}
		 * @default: 1
		 * @public
		 */
		thickness: PropTypes.number
	},

	defaultProps: {
		color: '#000000',
		endAngle: 310,
		radius: 100,
		startAngle: 50,
		thickness: 1
	},

	styles: {
		css,
		publicClassNames: true
	},

	render: ({color, endAngle, radius, startAngle, thickness, ...rest}) => {
		const size = radius * 2 + thickness;

		return (
			<svg viewBox="0 0 300 300" {...rest}>
				<path
					stroke={color}
					strokeWidth={thickness}
					d={arcPath(startAngle, endAngle, radius, size)}
					fill="none"
				/>
			</svg>
		);
	}
});

/**
 * Applies Agate specific behaviors to [Arc]{@link agate/Arc.ArcBase} components.
 *
 * @hoc
 * @memberof agate/Arc
 * @mixes ui/Arc.ArcDecorator
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ArcDecorator = compose(
	Pure,
	Skinnable
);

/**
 * An arc component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <Arc color="blue" endAngle="200" startAngle="0" radius="100" />
 *
 * @class Arc
 * @memberof agate/Arc
 * @extends agate/Arc.ArcBase
 * @mixes agate/Arc.ArcDecorator
 * @ui
 * @public
 */
const Arc = ArcDecorator(ArcBase);

export default Arc;
export {
	Arc,
	ArcBase,
	ArcDecorator
};
