/**
 * Provides Agate-themed media player components.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 */

import kind from '@enact/core/kind';
import React from 'react';

import MediaControls from './MediaControls';
import MediaSlider from './MediaSlider';
import Times from './Times';

import css from './MediaPlayer.module.less';

/**
 * A player for media {@link agate/MediaPlayer.MediaPlayer}.
 *
 * @class MediaPlayer
 * @memberof agate/MediaPlayer
 * @ui
 * @public
 */
const MediaPlayer = kind({
	name: 'MediaPlayer',

	styles: {
		css,
		className: 'mediaPlayer'
	},

	render: ({...rest}) => {
		return (
			<div {...rest}>
				<MediaSlider />
				<Times />
				<MediaControls />
			</div>
		);
	}
});

export default MediaPlayer;
export {
	MediaPlayer
};
