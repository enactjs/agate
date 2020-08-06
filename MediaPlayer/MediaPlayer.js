import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Pure from '@enact/ui/internal/Pure';
import Media from '@enact/ui/Media';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import css from './MediaPlayer.module.less';
import MediaControls from './MediaControls';
import MediaSlider from './MediaSlider';
import Skinnable from '../Skinnable';
import Times from './Times';

/**
 * Provides Agate-themed media player components.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 */

const MediaPlayerBase = kind({
	name: 'MediaPlayer',

	propTypes: /** @lends agate/MediaPlayer.MediaPlayerBase.prototype */ {
		/**
		 * Any children `<source>` tag elements will be sent directly to the media element as
		 * sources.
		 *
		 * @type {Node}
		 * @public
		 */
		source: PropTypes.node.isRequired,

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
		mediaComponent: EnactPropTypes.renderable
	},

	defaultProps: {
		mediaComponent: 'audio'
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

/**
 * A higher-order component that adds Agate specific behaviors to `MediaPlayer`.
 *
 * @hoc
 * @memberof agate/MediaPlayer
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const MediaPlayerDecorator = compose(
	Pure,
	Slottable({slots: ['source']}),
	Skinnable
);

/**
 * Aa Agate-styled `Media` component.
 *
 * Usage:
 * ```
 * <MediaPlayer>
 *     <source src='' type='' />
 * </MediaPlayer>
 * ```
 *
 * @class MediaPlayer
 * @memberof agate/MediaPlayer
 * @extends agate/MediaPlayer.MediaPlayerBase
 * @mixes agate/MediaPlayer.MediaPlayerDecorator
 * @ui
 * @public
 */
const MediaPlayer = MediaPlayerDecorator(MediaPlayerBase);

export default MediaPlayer;
export {
	MediaPlayer,
	MediaPlayerBase,
	MediaPlayerDecorator
};
