import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import Skinnable from '../Skinnable';

import {arcPath} from './utils';

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
		strokeWidth: PropTypes.number
	},

	defaultProps: {
		color: '#000000',
		endAngle: 310,
		radius: 100,
		startAngle: 50,
		strokeWidth: 1
	},

	computed: {
		height: ({radius}) => ri.scaleToRem(radius * 2),
		size : ({radius, strokeWidth}) => (radius * 2 - strokeWidth),
		width: ({radius}) => ri.scaleToRem(radius * 2)
	},

	render: ({color, endAngle, radius, size, startAngle, strokeWidth, ...rest}) => {
		const halfStrokeWidth = strokeWidth / 2;
		const viewBox = `-${halfStrokeWidth} -${halfStrokeWidth} ${radius * 2}  ${radius * 2}`;

		return (
			<svg viewBox={viewBox} {...rest}>
				<path
					stroke={color}
					strokeWidth={strokeWidth}
					d={arcPath(startAngle, endAngle, radius - halfStrokeWidth, size)}
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
 * <Arc color="blue" endAngle={200} startAngle={0}" radius={100} />
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
