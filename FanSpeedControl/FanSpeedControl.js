import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import FanSpeedControlBehaviorDecorator from './FanSpeedControlBehaviourDecorator';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

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
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * The size of FanSpeedControl. The number of arc segments to be rendered.
		 *
		 * @type {Number}
		 * @public
		 */
		size: PropTypes.number,

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

	defaultProps: {
		value: 4
	},

	styles: {
		css,
		className: 'fanSpeedControl'
	},

	render: ({icon, onClick, size, skinVariants, value, ...rest}) => {

		let FAN_SPEED = [];

		for (let i = 1; i <= size; i++) {
			FAN_SPEED.push(i);
		}

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
							key={index}
							onClick={onClick(index)}
							opacity={value >= option ? 1 : 0.4}
							radius={150}
							startAngle={arcStartAngle}
							strokeWidth={5}
							value={value}
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

const FanSpeedControlDecorator = compose(FanSpeedControlBehaviorDecorator, Skinnable({variantsProp: 'skinVariants'}));

const FanSpeedControl = FanSpeedControlDecorator(FanSpeedControlBase);

export default FanSpeedControl;
