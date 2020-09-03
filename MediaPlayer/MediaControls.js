import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import $L from '../internal/$L';

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
		 * Called when the user clicks the Play button.
		 *
		 * @type {Function}
		 * @public
		 */
		onPlayButtonClick: PropTypes.func,

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

	render: ({loop, menuIcon, nextTrackIcon, onLoopButtonClick, onPlayButtonClick, pauseIcon, paused, playIcon, previousTrackIcon, repeatIcon, shuffleIcon, ...rest}) => {
		return (
			<div {...rest}>
				<Button
					aria-label={$L('Repeat')} backgroundOpacity="transparent"
					className={loop ? css.loop : ''} css={css} icon={repeatIcon} onClick={onLoopButtonClick} size="large"
				/>
				<Button aria-label={$L('Shuffle')} backgroundOpacity="transparent" css={css} icon={shuffleIcon} size="large" />
				<Button aria-label={$L('Previous')} backgroundOpacity="transparent" css={css} icon={previousTrackIcon} size="large" />
				<Button
					aria-label={paused ? $L('Play') : $L('Pause')} backgroundOpacity="transparent"
					className={css.playPauseButton} css={css} onClick={onPlayButtonClick} size="large"
				>
					<Icon css={css}>{paused ? playIcon : pauseIcon}</Icon>
				</Button>
				<Button aria-label={$L('Next')} backgroundOpacity="transparent" css={css} icon={nextTrackIcon} size="large" />
				<Button aria-label={$L('Menu')} backgroundOpacity="transparent" css={css} icon={menuIcon} size="large" />
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
 * @mixes ui/Slottable.Slottable
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

		handlePlayButtonClick = (ev) => {
			forward('onPlayButtonClick', ev, this.props);
			if (this.props.paused) {
				forward('onPlay', ev, this.props);
			} else {
				forward('onPause', ev, this.props);
			}
		};

		handleLoopButtonClick = (ev) => {
			forward('onLoopButtonClick', ev, this.props);
			forward('onLoopChange', ev, this.props);
		};

		render () {
			const props = Object.assign({}, this.props);
			delete props.onLoopChange;
			delete props.onPause;
			delete props.onPlay;

			return (
				<Wrapped
					{...props}
					onLoopButtonClick={this.handleLoopButtonClick}
					onPlayButtonClick={this.handlePlayButtonClick}
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

