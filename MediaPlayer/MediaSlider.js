import kind from '@enact/core/kind';
import React from 'react';

import Slider from '../Slider';

import css from './MediaSlider.module.less';

/**
 * A customized slider suitable for use within media player components such as
 * [MediaPlayer]{@link agate/MediaPlayer.MediaPlayer}.
 *
 * @class MediaSlider
 * @extends agate/Slider.Slider
 * @memberof agate/MediaPlayer
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
				aria-hidden="true"
				css={css}
				max={1}
				min={0}
				step={0.00001}
			/>
		);
	}
});

export default MediaSlider;
