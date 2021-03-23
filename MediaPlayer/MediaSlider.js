import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import Slider from '../Slider';

import css from './MediaSlider.module.less';

/**
 * A customized slider suitable for use within media player components such as
 * [MediaPlayer]{@link agate/MediaPlayer.MediaPlayer}.
 *
 * @class MediaSlider
 * @memberof agate/MediaPlayer
 * @extends agate/Slider.Slider
 * @ui
 * @private
 */
const MediaSlider = kind({
	name: 'MediaSlider',

	propTypes: /** @lends agate/MediaPlayer.MediaSlider.prototype */ {
		/**
		 * `true` when the media is paused.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		paused: PropTypes.bool,

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
		paused: true
	},

	styles: {
		css,
		className: 'mediaSlider'
	},

	computed: {
		className: ({paused, type, styler}) => styler.append(type, {paused})
	},

	render: ({...rest}) => {
		delete rest.paused;
		delete rest.type;

		return (
			<Slider
				{...rest}
				aria-hidden
				css={css}
				max={1}
				min={0}
				step={0.00001}
			/>
		);
	}
});

export default MediaSlider;
export {
	MediaSlider
};
