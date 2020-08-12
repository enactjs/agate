import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import $L from '../internal/$L';
import Button from '../Button';
import Icon from '../Icon';

import css from './MediaControls.module.less';

/**
 * A set of components for controlling media playback and rendering additional components.
 *
 * @class MediaControls
 * @memberof agate/MediaPlayer
 * @ui
 * @public
 */
const MediaControls = kind({
	name: 'MediaControls',

	propTypes: /** @lends agate/MediaPlayer.MediaControls.prototype */ {
		/**
		 * A string which is sent to the `menu` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'menu'
		 * @public
		 */
		menuIcon: PropTypes.string,

		/**
		 * A string which is sent to the `nextTrack` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'nexttrack'
		 * @public
		 */
		nextTrackIcon: PropTypes.string,

		/**
		 * `true` when the media is paused.
		 *
		 * @type {Boolean}
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * A string which is sent to the `pause` icon of the player controls. This can be
		 * anything that is accepted by [Icon]{@link agate/Icon.Icon}. This will be temporarily replaced by
		 * the [playIcon]{@link agate/MediaPlayer.MediaControls.playIcon} when the
		 * [paused]{@link agate/MediaPlayer.MediaControls.paused} boolean is `false`.
		 *
		 * @type {String}
		 * @default 'pause'
		 * @public
		 */
		pauseIcon: PropTypes.string,

		/**
		 * A string which is sent to the `play` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}. This will be temporarily replaced by
		 * the [pauseIcon]{@link agate/MediaPlayer.MediaControls.pauseIcon} when the
		 * [paused]{@link agate/MediaPlayer.MediaControls.paused} boolean is `true`.
		 *
		 * @type {String}
		 * @default 'play'
		 * @public
		 */
		playIcon: PropTypes.string,

		/**
		 * A string which is sent to the `previousTrack` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'previoustrack'
		 * @public
		 */
		previousTrackIcon: PropTypes.string,

		/**
		 * A string which is sent to the `repeat` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'repeat'
		 * @public
		 */
		repeatIcon: PropTypes.string,

		/**
		 * A string which is sent to the `shuffle` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'shuffle'
		 * @public
		 */
		shuffleIcon: PropTypes.string,

		/**
		 * The visibility of the component. When `false`, the component will be hidden.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		visible: PropTypes.bool
	},

	defaultProps: {
		menuIcon: 'menu',
		nextTrackIcon: 'nexttrack',
		pauseIcon: 'pause',
		paused: true,
		playIcon: 'play',
		previousTrackIcon: 'previoustrack',
		repeatIcon: 'repeat',
		shuffleIcon: 'shuffle',
		visible: true
	},

	styles: {
		css,
		className: 'controlsFrame'
	},

	render: ({menuIcon, nextTrackIcon, pauseIcon, paused, playIcon, previousTrackIcon, repeatIcon, shuffleIcon, ...rest}) => {
		delete rest.visible;

		return (
			<div {...rest}>
				<Button aria-label={$L('Repeat')} backgroundOpacity="transparent" css={css} icon={repeatIcon} size="large" />
				<Button aria-label={$L('Shuffle')} backgroundOpacity="transparent" css={css} icon={shuffleIcon} size="large" />
				<Button aria-label={$L('Previous')} backgroundOpacity="transparent" css={css} icon={previousTrackIcon} size="large" />
				<Button aria-label={paused ? $L('Play') : $L('Pause')} backgroundOpacity="transparent" className={css.playPauseButton} css={css} size="large">
					<Icon css={css}>{paused ? playIcon : pauseIcon}</Icon>
				</Button>
				<Button aria-label={$L('Next')} backgroundOpacity="transparent" css={css} icon={nextTrackIcon} size="large" />
				<Button aria-label={$L('Menu')} backgroundOpacity="transparent" css={css} icon={menuIcon} size="large" />
			</div>
		);
	}
});

export default MediaControls;
export {
	MediaControls
};
