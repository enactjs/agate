import {forward} from '@enact/core/handle';
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
		 * `true` when the media loops.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		loop: PropTypes.bool,

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
		 * Called when the user clicks the Loop button.
		 *
		 * @type {Function}
		 * @public
		 */
		onLoopButtonClick: PropTypes.func,

		/**
		 * Called when the user clicks the Next button.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextButtonClick: PropTypes.func,

		/**
		 * Called when the user clicks the Play button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlayButtonClick: PropTypes.func,

		/**
		 * Called when the user clicks the Previous button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPreviousButtonClick: PropTypes.func,

		/**
		 * Called when the user clicks the Shuffle button.
		 *
		 * @type {Function}
		 * @public
		 */
		onShuffleButtonClick: PropTypes.func,

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
		 * `true` when the media playlist loops.
		 *
		 * @type {Boolean}
		 * @public
		 */
		repeatAll: PropTypes.bool,

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
		loop: false,
		menuIcon: 'menu',
		nextTrackIcon: 'nexttrack',
		pauseIcon: 'pause',
		paused: true,
		playIcon: 'play',
		previousTrackIcon: 'previoustrack',
		repeatIcon: 'repeat',
		shuffleIcon: 'shuffle'
	},

	styles: {
		css,
		className: 'controlsFrame'
	},

	render: ({loop, menuIcon, nextTrackIcon, onLoopButtonClick, onNextButtonClick, onPlayButtonClick, onPreviousButtonClick, onShuffleButtonClick, pauseIcon, paused, playIcon, previousTrackIcon, repeatAll, repeatIcon, shuffle, shuffleIcon, ...rest}) => {
		return (
			<div {...rest}>
				<Button
					aria-label={$L('Repeat')}
					backgroundOpacity="transparent"
					badge={loop ? '1' : ''}
					className={repeatAll ? css.activeControl : ''}
					css={css} icon={repeatIcon}
					onClick={onLoopButtonClick}
					size="large"
				/>
				<Button
					aria-label={$L('Shuffle')}
					backgroundOpacity="transparent"
					className={shuffle ? css.activeControl : ''}
					css={css}
					icon={shuffleIcon}
					onClick={onShuffleButtonClick}
					size="large" />
				<Button
					aria-label={$L('Previous')}
					backgroundOpacity="transparent"
					css={css}
					icon={previousTrackIcon}
					onClick={onPreviousButtonClick}
					size="large" />
				<Button
					aria-label={paused ? $L('Play') : $L('Pause')}
					backgroundOpacity="transparent"
					className={css.playPauseButton}
					css={css}
					onClick={onPlayButtonClick}
					size="large"
				>
					<Icon css={css}>{paused ? playIcon : pauseIcon}</Icon>
				</Button>
				<Button
					aria-label={$L('Next')}
					backgroundOpacity="transparent"
					css={css}
					icon={nextTrackIcon}
					onClick={onNextButtonClick}
					size="large" />
				<Button
					aria-label={$L('Menu')}
					backgroundOpacity="transparent"
					css={css}
					icon={menuIcon}
					size="large" />
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

		static propTypes = /** @lends agate/MediaPlayer.MediaControlsDecorator.prototype */ {

			/**
			 * Called when media gets looped.
			 *
			 * @type {Function}
			 * @public
			 */
			onLoopChange: PropTypes.func,

			/**
			 * Called when jumping to next media.
			 *
			 * @type {Function}
			 * @public
			 */
			onNext: PropTypes.func,

			/**
			 * Called when media gets paused.
			 *
			 * @type {Function}
			 * @public
			 */
			onPause: PropTypes.func,

			/**
			 * Called when media starts playing.
			 *
			 * @type {Function}
			 * @public
			 */
			onPlay: PropTypes.func,

			/**
			 * Called when jumping to previous media.
			 *
			 * @type {Function}
			 * @public
			 */
			onPrevious: PropTypes.func,

			/**
			 * Called when jumping to a random media.
			 *
			 * @type {Function}
			 * @public
			 */
			onShuffle: PropTypes.func,

			/**
			 * The media pause state.
			 *
			 * @type {Boolean}
			 * @public
			 */
			paused: PropTypes.bool
		};

		constructor (props) {
			super(props);
		}

		handleLoopButtonClick = (ev) => {
			forward('onLoopButtonClick', ev, this.props);
			forward('onLoopChange', ev, this.props);
		};

		handleNextButtonClick = (ev) => {
			forward('onNextButtonClick', ev, this.props);
			forward('onNext', ev, this.props);
		};

		handlePlayButtonClick = (ev) => {
			forward('onPlayButtonClick', ev, this.props);
			if (this.props.paused) {
				forward('onPlay', ev, this.props);
			} else {
				forward('onPause', ev, this.props);
			}
		};

		handlePreviousButtonClick = (ev) => {
			forward('onPreviousButtonClick', ev, this.props);
			forward('onPrevious', ev, this.props);
		};

		handleShuffleButtonClick = (ev) => {
			forward('onShuffleButtonClick', ev, this.props);
			forward('onShuffle', ev, this.props);
		};

		render () {
			const props = Object.assign({}, this.props);
			delete props.onLoopChange;
			delete props.onNext;
			delete props.onPause;
			delete props.onPlay;
			delete props.onPrevious;
			delete props.onShuffle;

			return (
				<Wrapped
					{...props}
					onLoopButtonClick={this.handleLoopButtonClick}
					onNextButtonClick={this.handleNextButtonClick}
					onPlayButtonClick={this.handlePlayButtonClick}
					onPreviousButtonClick={this.handlePreviousButtonClick}
					onShuffleButtonClick={this.handleShuffleButtonClick}
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
