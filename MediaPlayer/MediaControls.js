import hoc from '@enact/core/hoc';
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
 * @class MediaControlsBase
 * @memberof agate/MediaPlayer
 * @ui
 * @private
 */
const MediaControlsBase = kind({
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
		 * Called when the user clicks the Next button.
		 *
		 * @type {Function}
		 * @public
		 */
		onNext: PropTypes.func,

		/**
		 * Called when the user clicks the Pause button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPause: PropTypes.func,

		/**
		 * Called when the user clicks the Play button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlay: PropTypes.func,

		/**
		 * Called when the user clicks the Previous button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevious: PropTypes.func,

		/**
		 * Called when the user clicks the Loop button.
		 *
		 * @type {Function}
		 * @public
		 */
		onRepeat: PropTypes.func,

		/**
		 * Called when the user clicks the Shuffle button.
		 *
		 * @type {Function}
		 * @public
		 */
		onShuffle: PropTypes.func,

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
		 * The repeat mode of the media playlist.
		 *
		 * @type {('none'|'one'|'all')}
		 * @default 'none'
		 * @public
		 */
		repeat: PropTypes.oneOf(['none', 'one', 'all']),

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
		 * `true` when the media playlist is shuffled.
		 *
		 * @type {Boolean}
		 * @public
		 */
		shuffle: PropTypes.bool,

		/**
		 * A string which is sent to the `shuffle` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}.
		 *
		 * @type {String}
		 * @default 'shuffle'
		 * @public
		 */
		shuffleIcon: PropTypes.string
	},

	defaultProps: {
		menuIcon: 'menu',
		nextTrackIcon: 'nexttrack',
		pauseIcon: 'pause',
		paused: true,
		playIcon: 'play',
		previousTrackIcon: 'previoustrack',
		repeat: 'none',
		repeatIcon: 'repeat',
		shuffleIcon: 'shuffle'
	},

	styles: {
		css,
		className: 'controlsFrame'
	},

	computed: {
		badge: ({repeat}) => {
			switch (repeat) {
				case 'one':
					return '1';
				case 'all':
					return 'A';
				case 'none':
					return '';
			}
		}
	},

	render: ({badge, menuIcon, nextTrackIcon, onRepeat, onNext, onPause, onPlay, onPrevious, onShuffle, paused, pauseIcon, playIcon, previousTrackIcon, repeatIcon, shuffle, shuffleIcon, ...rest}) => {
		return (
			<div {...rest}>
				<Button
					aria-label={$L('Repeat')}
					backgroundOpacity="transparent"
					badge={badge}
					css={css}
					icon={repeatIcon}
					onClick={onRepeat}
					size="large"
				/>
				<Button
					aria-label={$L('Shuffle')}
					backgroundOpacity="transparent"
					className={shuffle ? css.repeat : ''}
					css={css}
					icon={shuffleIcon}
					onClick={onShuffle}
					size="large"
				/>
				<Button
					aria-label={$L('Previous')}
					backgroundOpacity="transparent"
					css={css}
					icon={previousTrackIcon}
					onClick={onPrevious}
					size="large"
				/>
				<Button
					aria-label={paused ? $L('Play') : $L('Pause')}
					backgroundOpacity="transparent"
					className={css.playPauseButton}
					css={css}
					onClick={paused ? onPlay : onPause}
					size="large"
				>
					<Icon css={css}>{paused ? playIcon : pauseIcon}</Icon>
				</Button>
				<Button
					aria-label={$L('Next')}
					backgroundOpacity="transparent"
					css={css}
					icon={nextTrackIcon}
					onClick={onNext}
					size="large"
				/>
				<Button
					aria-label={$L('Menu')}
					backgroundOpacity="transparent"
					css={css}
					icon={menuIcon}
					size="large"
				/>
			</div>
		);
	}
});

/**
 * Media control behaviors to apply to [MediaControlsBase]{@link agate/MediaPlayer.MediaControlsBase}.
 * Provides built-in support for key handling for basic playback controls.
 *
 * @class MediaControlsDecorator
 * @memberof agate/MediaPlayer
 * @hoc
 * @private
 */
const MediaControlsDecorator = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	class MediaControlsDecoratorHOC extends React.Component {
		static displayName = 'MediaControlsDecorator';

		constructor (props) {
			super(props);
		}

		render () {
			const props = Object.assign({}, this.props);

			return (
				<Wrapped
					{...props}
				/>
			);
		}
	}

	return MediaControlsDecoratorHOC;
});

const MediaControls = MediaControlsDecorator(MediaControlsBase);

export default MediaControls;
export {
	MediaControlsBase,
	MediaControls,
	MediaControlsDecorator
};
