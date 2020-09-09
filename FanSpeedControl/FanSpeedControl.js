import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

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
		 * Opacity of FanSpeedControl SVG segments.
		 *
		 * @type {Number}
		 * @public
		 */
		backgroundOpacity: PropTypes.number,

		/**
		 * Opacity of highlighted FanSpeedControl SVG segments.
		 *
		 * @type {Number}
		 * @public
		 */
		highlightedOpacity: PropTypes.number,

		/**
		 * FanSpeedControl icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Opacity of FanSpeedControl SVG segments.
		 *
		 * @type {Number}
		 * @public
		 */
		opacity: PropTypes.number,

		/**
		 * Value of FanSpeedControl.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		highlightedOpacity: 1,
		backgroundOpacity: 0.2
	},

	styles: {
		css,
		className: 'fanSpeedControl'
	},

	render: ({backgroundOpacity, highlightedOpacity, icon, value, ...rest}) => {
		return (
			<div {...rest}>
				<svg className={css.fanSpeedControlSvg} viewBox="0 0 300 300">
					<g fill="none">
						<path d="M0,0h300v300H0V0z" />
						<path className={css.segment} opacity={value >= 1 ? highlightedOpacity : backgroundOpacity} d="M43.9,256.1c-6.8-6.8-12.9-14.2-18.3-22.2c-5.4-8-10.1-16.6-13.8-25.5c-1.4-3.3-2.7-6.7-3.9-10.1l5.7-1.9 c7.1,20.9,18.9,39.8,34.6,55.4L43.9,256.1L43.9,256.1z" />
						<path className={css.segment} opacity={value >= 2 ? highlightedOpacity : backgroundOpacity} d="M6.7,194.4C5.3,189.8,4,185,3,180.2c-2-9.9-3-20.1-3-30.2c0-7.2,0.5-14.4,1.5-21.5l5.9,0.9 C6.5,136.2,6,143.1,6,150c0,14.4,2.1,28.8,6.4,42.6L6.7,194.4L6.7,194.4z" />
						<path className={css.segment} opacity={value >= 3 ? highlightedOpacity : backgroundOpacity} d="M8.1,125.5l-5.9-0.9c0.3-1.6,0.6-3.2,0.9-4.8c2-9.7,4.9-19.1,8.7-28.2c3.8-8.9,8.4-17.5,13.8-25.5 c0.6-0.9,1.2-1.8,1.9-2.7l4.9,3.6C20,84.4,11.7,104.4,8.1,125.5L8.1,125.5z" />
						<path className={css.segment} opacity={value >= 4 ? highlightedOpacity : backgroundOpacity} d="M34.7,63.8l-4.9-3.6c4.3-5.8,9-11.2,14.1-16.3c6.8-6.8,14.2-12.9,22.2-18.3c4.5-3,9.2-5.8,14-8.4l2.7,5.4 C64,32.6,47.6,46.7,34.7,63.8L34.7,63.8z" />
						<path className={css.segment} opacity={value >= 5 ? highlightedOpacity : backgroundOpacity} d="M86.4,20.8l-2.7-5.4c2.6-1.3,5.3-2.5,7.9-3.6c9.1-3.8,18.5-6.8,28.2-8.7c9.3-1.9,18.7-2.9,28.2-3v6 C126.6,6.3,105.6,11.3,86.4,20.8L86.4,20.8z" />
						<path className={css.segment} opacity={value >= 6 ? highlightedOpacity : backgroundOpacity} d="M213.6,20.8C194.4,11.3,173.4,6.2,152,6V0c9.5,0.1,18.9,1.1,28.2,3c9.7,2,19.1,4.9,28.2,8.7 c2.7,1.1,5.3,2.4,7.9,3.6L213.6,20.8L213.6,20.8z" />
						<path className={css.segment} opacity={value >= 7 ? highlightedOpacity : backgroundOpacity} d="M265.3,63.8c-12.8-17.1-29.3-31.1-48.1-41.1l2.7-5.4c4.8,2.5,9.5,5.3,14,8.4c8,5.4,15.4,11.5,22.2,18.3 c5.1,5.1,9.8,10.5,14.1,16.3L265.3,63.8L265.3,63.8z" />
						<path className={css.segment} opacity={value >= 8 ? highlightedOpacity : backgroundOpacity} d="M291.9,125.5c-3.6-21.1-11.9-41.1-24.3-58.5l4.9-3.6c0.6,0.9,1.3,1.8,1.9,2.7c5.4,8,10.1,16.6,13.8,25.5 c3.8,9.1,6.8,18.5,8.7,28.2c0.3,1.6,0.6,3.2,0.9,4.8L291.9,125.5L291.9,125.5z" />
						<path className={css.segment} opacity={value >= 9 ? highlightedOpacity : backgroundOpacity} d="M293.3,194.4l-5.7-1.9c4.3-13.8,6.4-28.2,6.4-42.6c0-6.9-0.5-13.7-1.5-20.6l5.9-0.9c1,7.1,1.5,14.3,1.5,21.5 c0,10.2-1,20.3-3,30.2C296,185,294.8,189.8,293.3,194.4L293.3,194.4z" />
						<path className={css.segment} opacity={value >= 10 ? highlightedOpacity : backgroundOpacity} d="M256.1,256.1l-4.3-4.3c15.7-15.5,27.5-34.5,34.6-55.4l5.7,1.9c-1.2,3.4-2.5,6.8-3.9,10.1 c-3.8,8.9-8.4,17.5-13.8,25.5C269,241.8,262.9,249.3,256.1,256.1L256.1,256.1z" />
					</g>
				</svg>
				<div className={css.valueDisplay}>
					<Icon className={css.fanIcon} css={css}>{icon}</Icon>
					<span className={css.fanValue}>{value}</span>
				</div>
			</div>
		);
	}
});

const FanSpeedControl = Skinnable(FanSpeedControlBase);

export default FanSpeedControl;
