import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './WindDirectionControl.module.less';

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
		airDirection: PropTypes.oneOf(['', 'airDown', 'airRight', 'airUp']),

		/**
		 * Opacity value for non-selected state of WindDirectionControl.
		 *
		 * @type {Number}
		 * @public
		 */
		backgroundOpacity: PropTypes.number,

		/**
		 * Opacity value for selected state of WindDirectionControl.
		 *
		 * @type {Number}
		 * @public
		 */
		highlightedOpacity: PropTypes.number,

		/**
		 * Opacity of WindDirectionControl.
		 *
		 * @type {Number}
		 * @public
		 */
		opacity: PropTypes.number,

		/**
		 * Current skinVariant.
		 *
		 * @type {Object}
		 * @public
		 */
		skinVariants: PropTypes.object
	},

	defaultProps: {
		highlightedOpacity: 1,
		backgroundOpacity: 0.2
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

	render: ({airDirection, backgroundOpacity, componentIcon, highlightedOpacity, skinVariants, ...rest}) => {
		return (
			/* eslint jsx-quotes: ["error", "prefer-single"] */
			<div {...rest}>
				<svg className={css.windDirectionControlContainer} x='0px' y='0px' viewBox='0 0 300 300' >
					<path fill='none' d='M0,0h300v300H0V0z' />
					<path fill={skinVariants.night ? '#FFF' : '#000'} opacity={airDirection === 'airDown' ? highlightedOpacity : backgroundOpacity} d='M43.9,256.1c-6.8-6.8-12.9-14.2-18.3-22.2c-5.4-8-10.1-16.6-13.8-25.5C8,199.3,5,189.9,3,180.2c-2-9.9-3-20.1-3-30.2c0-7.2,0.5-14.4,1.5-21.5l5.9,0.9C6.5,136.3,6,143.1,6,150c-0.1,38.2,15.1,74.9,42.2,101.8L43.9,256.1L43.9,256.1z' />
					<path fill={skinVariants.night ? '#FFF' : '#000'} opacity={airDirection === 'airRight' ? highlightedOpacity : backgroundOpacity} d='M8.1,125.5l-5.9-0.9c0.3-1.6,0.6-3.2,0.9-4.8c2-9.7,4.9-19.1,8.7-28.2c3.8-8.9,8.4-17.5,13.8-25.5c5.4-8,11.5-15.4,18.3-22.2c6.8-6.8,14.2-12.9,22.2-18.3c4.5-3,9.2-5.8,14-8.4l2.7,5.4C43.4,43.6,15.9,81.5,8.1,125.5L8.1,125.5z' />
					<path fill={skinVariants.night ? '#FFF' : '#000'} opacity={airDirection === 'airUp' ? highlightedOpacity : backgroundOpacity} d='M213.6,20.8C193.8,11,172.1,5.9,150,6c-22.1-0.1-43.8,5-63.6,14.8l-2.7-5.4c2.6-1.3,5.3-2.5,7.9-3.6C100.7,8,110.1,5,119.8,3c9.9-2,20.1-3,30.2-3c10.2,0,20.3,1,30.2,3c9.7,2,19.1,4.9,28.2,8.7c2.7,1.1,5.3,2.4,7.9,3.6L213.6,20.8L213.6,20.8z' />
				</svg>
				<div className={css.airDirectionDisplay}>
					<Icon className={css.airDirectionIcon} css={css}>{componentIcon}</Icon>
				</div>
			</div>
		);
	}
});

const WindDirectionControl = Skinnable({variantsProp: 'skinVariants'}, WindDirectionControlBase);

export default WindDirectionControl;
