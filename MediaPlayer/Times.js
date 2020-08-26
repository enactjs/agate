import React from 'react';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import {secondsToPeriod, secondsToTime} from './util';

import css from './MediaPlayer.module.less';
import Skinnable from "../Skinnable";
import css from './Times.module.less';

const SkinnableDiv = Skinnable('div');
/**
 * Agate-styled formatted time component.
 *
 * @class Times
 * @memberof agate/MediaPlayer
 * @ui
 * @private
 */
const Times = kind({
	name: 'Times',

	propTypes: /** @lends agate/MediaPlayer.Times.prototype */ {
		/**
		 * An instance of a Duration Formatter from i18n.
		 *
		 * Must has a `format()` method that returns a string.
		 *
		 * @type {Object}
		 * @required
		 * @public
		 */
		formatter: PropTypes.object.isRequired,

		/**
		 * The current time in seconds of the media source.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		current: PropTypes.number,

		/**
		 * The total time (duration) in seconds of the loaded video source.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		total: PropTypes.number
	},

	defaultProps: {
		current: 0,
		total: 0
	},

	styles: {
		css,
		className: 'times'
	},

	computed: {
		currentPeriod:   ({current}) => secondsToPeriod(current),
		currentReadable: ({current, formatter}) => secondsToTime(current, formatter),
		totalPeriod:     ({total}) => secondsToPeriod(total),
		remainingReadable:   ({current, total, formatter}) => secondsToTime(total - current, formatter)
	},

	render: ({className, currentPeriod, currentReadable, remainingReadable, totalPeriod, ...rest}) => {
		delete rest.current;
		delete rest.formatter;
		delete rest.total;

		return (
			<SkinnableDiv {...rest}>
				<time dateTime={currentPeriod}>{currentReadable}</time>
				<time dateTime={totalPeriod}>-{remainingReadable}</time>
			</SkinnableDiv>
		);
	}
});

export default Times;
export {
	Times
};
