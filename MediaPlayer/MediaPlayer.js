import kind from '@enact/core/kind';
import React from 'react';

import css from './MediaPlayer.module.less';
import MediaControls from './MediaControls';
import MediaSlider from './MediaSlider';
import Times from './Times';

/**
 * Provides Agate-themed media player components.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 */

const MediaPlayer = kind({
	name: 'MediaPlayer',

	styles: {
		css,
		className: 'mediaPlayer'
	},

	computed: {
		className: ({visible, styler}) => styler.append({hidden: !visible})
	},

	render: ({paused, ...rest}) => {
		return (
			<div className={css.mediaPlayer} {...rest}>
				<MediaSlider />
				<Times />
				<MediaControls />
			</div>
		);
	}
});

export default MediaPlayer;
