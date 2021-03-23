import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import {secondsToPeriod, secondsToTime} from './util';

import css from './Times.module.less';

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
		 * The total time (duration) in seconds of the loaded media source.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		total: PropTypes.number,

		/**
		 * Specifies what kind of layout the MediaPlayer should have.
		 *
		 * @type {('full'|'light')}
		 * @default 'full'
		 * @public
		 */
		type: PropTypes.oneOf(['full', 'light'])
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
		className: ({type, styler}) => styler.append(type),
		currentPeriod: ({current}) => secondsToPeriod(current),
		currentReadable: ({current, formatter}) => secondsToTime(current, formatter),
		remainingPeriod: ({current, total}) => secondsToPeriod(total - current),
		remainingReadable: ({current, total, formatter}) => secondsToTime(total - current, formatter)
	},

	render: ({currentPeriod, currentReadable, remainingPeriod, remainingReadable, ...rest}) => {
		delete rest.current;
		delete rest.formatter;
		delete rest.total;
		delete rest.type;

		return (
			<div {...rest}>
				<time dateTime={currentPeriod}>{currentReadable}</time>
				<time dateTime={remainingPeriod}>-{remainingReadable}</time>
			</div>
		);
	}
});

export default Times;
export {
	Times
};
