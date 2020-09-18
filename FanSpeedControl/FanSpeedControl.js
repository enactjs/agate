import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Arc from '../Arc';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

const FAN_SPEED = [1,2,3,4,5,6,7,8,9,10];

/**
 * An Agate component for displaying fan speed {@link agate/FanSpeedControl}.
 *
 * @class FanSpeedControlBase
 * @memberof agate/FanSpeedControl
 * @ui
 * @private
 */
const FanSpeedControlBase = kind({
	name: 'FanSpeedControlBase',

	propTypes: /** @lends agate/FanSpeedControl.FanSpeedControlBase.prototype */ {
		/**
		 * FanSpeedControl icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Current skinVariant.
		 *
		 * @type {Object}
		 * @public
		 */
		skinVariants: PropTypes.object,

		/**
		 * Value of FanSpeedControl.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	styles: {
		css,
		className: 'fanSpeedControl'
	},

	render: ({icon, skinVariants, value, ...rest}) => {
		return (
			<div className={css.fanSpeedControl} {...rest}>
				{FAN_SPEED.map((option, index) => {

					// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const startAngle = 50;
					const endAngle = 312;
					const pauseAngle = 2;
					const arcSegments = FAN_SPEED.length;
					let arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					let arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;

					return (
						<Arc
							className={css.fanSpeedArc}
							color={skinVariants.night ? '#fff' : '#000'}
							endAngle={arcEndAngle}
							opacity={value >= option ? 1 : 0.4}
							key={index}
							radius={150}
							startAngle={arcStartAngle}
							strokeWidth={5}
						/>
					);
				})}
				<div className={css.valueDisplay}>
					<Icon className={css.fanIcon} css={css}>{icon}</Icon>
					<span className={css.fanValue}>{value}</span>
				</div>
			</div>
		);
	}
});

const FanSpeedControl = Skinnable({variantsProp: 'skinVariants'}, FanSpeedControlBase);

export default FanSpeedControl;
