import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Media from '@enact/ui/Media';
import PropTypes from 'prop-types';
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

	propTypes: /** @lends agate/MediaPlayer.prototype */ {
		/**
		 * Media component to use.
		 *
		 * The default (`'video'`) renders an `HTMLVideoElement`. Custom media components must have
		 * a similar API structure, exposing the following APIs:
		 *
		 * Methods:
		 * * `load()` - load media
		 *
		 * @type {String|Component}
		 * @default 'video'
		 * @public
		 */
		mediaComponent: EnactPropTypes.renderable,

		/**
		 * Any children `<source>` tag elements will be sent directly to the media element as
		 * sources.
		 *
		 * @type {Node}
		 * @public
		 */
		source: PropTypes.node.isRequired
	},

	defaultProps: {
		mediaComponent: 'video',
		// source: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		// source: '<source src="/media/examples/flower.mp4"\n' +
		// 	'            type="video/mp4">'
		source: '<source src="http://media.w3.org/2010/05/sintel/trailer.mp4"\n' +
			'            type="video/mp4">'
	},

	styles: {
		css,
		className: 'mediaPlayer'
	},

	render: ({mediaComponent, source, ...rest}) => {
		return (
			<div className={css.mediaPlayer} {...rest}>
				<MediaSlider />
				<Times />
				<MediaControls />
				<Media mediaComponent={mediaComponent} source={source} controls autoPlay />
			</div>
		);
	}
});

export default MediaPlayer;
