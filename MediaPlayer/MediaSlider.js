import kind from '@enact/core/kind';

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

	styles: {
		css,
		className: 'mediaSlider'
	},

	render: ({...rest}) => {
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
