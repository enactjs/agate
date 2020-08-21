import kind from '@enact/core/kind';
import EnactPropTypes from '@enact/core/internal/prop-types';
import {adaptEvent, call, forKey, forward, forwardWithPrevent, handle, preventDefault, stopImmediate, returnsTrue} from '@enact/core/handle';
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
import $L from '../internal/$L';
import {Job} from '@enact/core/util';
import Announce from '@enact/ui/AnnounceDecorator/Announce';

const forwardWithState = (type) => adaptEvent(call('addStateToEvent'), forwardWithPrevent(type));

// provide forwarding of events on media controls
const forwardPlay = forwardWithState('onPlay');
const forwardPause = forwardWithState('onPause');

/**
 * Provides Agate-themed media player components.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 */

const MediaPlayerBase = class extends React.Component {
	static displayName = 'MediaPlayer'

	static propTypes =  /** @lends agate/MediaPlayer.MediaPlayerBase.prototype */ {
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
		mediaComponent: EnactPropTypes.renderable,

		/**
		 * Called when video is paused
		 *
		 * @type {Function}
		 * @public
		 */
		onPause: PropTypes.func,

		/**
		 * Called when video is played
		 *
		 * @type {Function}
		 * @public
		 */
		onPlay: PropTypes.func,
	}

	static defaultProps = {
		mediaComponent: 'audio'
	}

	constructor (props) {
		super(props);

		// Internal State
		this.audio = null;

		this.state = {
			paused: true,
		};
	}

	handle = handle.bind(this)

	handlePlay = this.handle(
		forwardPlay,
		() => this.play()
	)

	handlePause = this.handle(
		forwardPause,
		() => this.pause()
	)

	announceJob = new Job(msg => (this.announceRef && this.announceRef.announce(msg)), 200)

	announce = (msg) => {
		this.announceJob.start(msg);
	}

	//
	// Handled Media events
	//
	addStateToEvent = (ev) => {
		return {
			// More props from `ev` may be added here as needed, but a full copy via `...ev`
			// overloads Storybook's Action Logger and likely has other perf fallout.
			type: ev.type,
			// Specific state variables are included in the outgoing calback payload, not all of them
			...this.getMediaState()
		};
	}

	/**
	 * Returns an object with the current state of the media including `currentTime`, `duration`,
	 * `paused`, `playbackRate`, `proportionLoaded`, and `proportionPlayed`.
	 *
	 * @function
	 * @memberof sandstone/VideoPlayer.VideoPlayerBase.prototype
	 * @returns {Object}
	 * @public
	 */
	getMediaState = () => {
		return {
			//currentTime       : this.state.currentTime,
			//duration          : this.state.duration,
			paused            : this.state.paused,
			//playbackRate      : this.video.playbackRate,
			//proportionLoaded  : this.state.proportionLoaded,
			//proportionPlayed  : this.state.proportionPlayed
		};
	}

	/**
	 * The primary means of interacting with the `<video>` element.
	 *
	 * @param  {String} action The method to preform.
	 * @param  {Multiple} props  The arguments, in the format that the action method requires.
	 *
	 * @private
	 */
	send = (action, props) => {
		//this.clearPulsedPlayback();
		//this.showFeedback();
		//this.startDelayedFeedbackHide();
		this.audio[action](props);
	}

	handleEvent = () => {
		const el = this.audio;
		const updatedState = {
			paused: el.paused,
		};

		// If there's an error, we're obviously not loading, no matter what the readyState is.
		if (updatedState.error) updatedState.loading = false;

		this.setState(updatedState);
	}


	play = () => {
		// must happen before send() to ensure feedback uses the right value
		// TODO: refactor into this.state member
		this.send('play');
		this.announce($L('Play'));
	}


	pause = () => {
		// must happen before send() to ensure feedback uses the right value
		// TODO: refactor into this.state member
		this.send('pause');
		this.announce($L('Pause'));
	}

	setAudioRef = (node) => {
		this.audio = node;
		this.setMedia();
	}

	setAnnounceRef = (node) => {
		this.announceRef = node;
	}

	setMedia ({setMedia} = this.props) {
		if (setMedia) {
			setMedia(this.audio);
		}
	}

	render ()  {
		const {
			mediaComponent,
			source,
			...rest
		} = this.props;

		rest.css = css;
		rest.className = css.mediaPlayer;

		return (
			<div className={css.mediaPlayer} {...rest}>
				<Media mediaComponent={mediaComponent} source={source} autoPlay controls {...rest} ref={this.setAudioRef} onUpdate={this.handleEvent} />
				<MediaSlider />
				<Times />
				<MediaControls
					//onClose={this.handleMediaControlsClose}
					//onFastForward={this.handleFastForward}
					//onJump={this.handleJump}
					//onJumpBackwardButtonClick={this.onJumpBackward}
					//onJumpForwardButtonClick={this.onJumpForward}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
					//onRewind={this.handleRewind}
					//onToggleMore={this.handleToggleMore}
					paused={this.state.paused}
					//spotlightId={this.mediaControlsSpotlightId}
					//spotlightDisabled={!this.state.mediaControlsVisible || spotlightDisabled}
					visible={this.state.mediaControlsVisible}
				/>
				<Announce ref={this.setAnnounceRef} />
			</div>
		);
	}
};

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
