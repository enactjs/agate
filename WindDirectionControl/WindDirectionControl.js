import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Arc from '../Arc';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './WindDirectionControl.module.less';

const WIND_DIRECTION = [
	{option: 'airDown'},
	{option: 'airRight'},
	{option: 'airUp'}
];

/**
 * A SVG for {@link agate/WindDirectionControl}.
 *
 * @class WindDirectionControl
 * @memberof agate/WindDirectionControl
 * @ui
 * @private
 */
const WindDirectionControlBase = kind({
	name: 'WindDirectionControlBase',

	propTypes: /** @lends agate/WindDirectionControl.WindDirectionControlBase.prototype */ {
		/**
		 * State of WindDirectionControl.
		 *
		 * @type {('airDown'|'airRight'|'airUp')}
		 * @default ''
		 * @public
		 */
		airDirection: PropTypes.oneOf(['airDown', 'airRight', 'airUp']),

		/**
		 * Current skinVariant.
		 *
		 * @type {Object}
		 * @public
		 */
		skinVariants: PropTypes.object
	},

	styles: {
		css,
		className: 'windDirectionControl'
	},

	computed: {
		componentIcon: (props) => {
			const {airDirection} = props;

			switch (airDirection) {
				case 'airDown':
					return 'airdown';
				case 'airRight':
					return 'airup';
				case 'airUp':
					return 'airright';
			}
		}
	},

	render: ({airDirection, componentIcon, skinVariants, ...rest}) => {
		return (
			<div className={css.windDirectionControl} {...rest}>
				{WIND_DIRECTION.map((windDirection, index) => {
					const {option} = windDirection;

					// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const startAngle = 50;
					const endAngle = 200;
					const pauseAngle = 2;
					const arcSegments = WIND_DIRECTION.length;
					let arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					let arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;

					return (
						<Arc
							className={css.windDirectionArc}
							color={skinVariants.night ? '#fff' : '#000'}
							endAngle={arcEndAngle}
							opacity={airDirection === option ? 1 : 0.4}
							key={index}
							radius={150}
							startAngle={arcStartAngle}
							strokeWidth={5}
						/>
					);
				})}
				<div className={css.airDirectionDisplay}>
					<Icon className={css.airDirectionIcon} css={css}>{componentIcon}</Icon>
				</div>
			</div>
		);
	}
});

const WindDirectionControl = Skinnable({variantsProp: 'skinVariants'}, WindDirectionControlBase);

export default WindDirectionControl;
