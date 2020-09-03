import EnactPropTypes from '@enact/core/internal/prop-types';
import {adaptEvent, call, forwardWithPrevent, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {memoize} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Pure from '@enact/ui/internal/Pure';
import Media from '@enact/ui/Media';
import Slottable from '@enact/ui/Slottable';
import DurationFmt from 'ilib/lib/DurationFmt';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import MediaControls from './MediaControls';
import MediaSlider from './MediaSlider';
import Skinnable from '../Skinnable';
import Times from './Times';

import css from './MediaPlayer.module.less';

const forwardWithState = (type) => adaptEvent(call('addStateToEvent'), forwardWithPrevent(type));

// provide forwarding of events on media controls
const forwardPlay = forwardWithState('onPlay');
const forwardPause = forwardWithState('onPause');

const memoGetDurFmt = memoize((/* locale */) => new DurationFmt({
	length: 'medium', style: 'clock', useNative: false
}));

const getDurFmt = (locale) => {
	if (typeof window === 'undefined') return null;

	return memoGetDurFmt(locale);
};

/**
 * Provides Agate-themed media player components.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 */
const MediaPlayerBase = kind({
	name: 'MediaPlayer',

	propTypes: /** @lends agate/MediaPlayer.MediaControls.prototype */ {
		/**
		 * Any children `<source>` tag elements will be sent directly to the media element as
		 * sources.
		 *
		 * @type {Node}
		 * @public
		 */
		source: PropTypes.node.isRequired,

		/**
		 * The current time in seconds of the media source.
		 *
		 * @type {Number}
		 * @public
		 */
		currentTime: PropTypes.number,

		/**
		 * The current locale as a
		 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
		 *
		 * @type {String}
		 * @public
		 */
		locale: PropTypes.string,

		/**
		 * `true` when the media loops.
		 *
		 * @type {Boolean}
		 * @public
		 */
		loop: PropTypes.bool,

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
		 * @default 'audio'
		 * @public
		 */
		mediaComponent: EnactPropTypes.renderable,

		/**
		 * Function that generates a reference to the current loaded media
		 *
		 * @type {Function}
		 * @public
		 */
		mediaRef: PropTypes.func,

		/**
		 * Called when position of media slider is changed.
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called when media is looped
		 *
		 * @type {Function}
		 * @public
		 */
		onLoopChange: PropTypes.func,

		/**
		 * Called when jumping to next media
		 *
		 * @type {Function}
		 * @public
		 */
		onNext: PropTypes.func,

		/**
		 * Called when media is paused
		 *
		 * @type {Function}
		 * @public
		 */
		onPause: PropTypes.func,

		/**
		 * Called when media is played
		 *
		 * @type {Function}
		 * @public
		 */
		onPlay: PropTypes.func,

		/**
		 * Called when jumping to previous media
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevious: PropTypes.func,

		/**
		 * Called when jumping to a random media
		 *
		 * @type {Function}
		 * @public
		 */
		onShuffle: PropTypes.func,

		/**
		 * Called when media is updating.
		 *
		 * @type {Function}
		 * @public
		 */
		onUpdate: PropTypes.func,

		/**
		 * The media pause state.
		 *
		 * @type {Boolean}
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * Proportion of media file played.
		 *
		 * @type {Number}
		 * @public
		 */
		proportionPlayed: PropTypes.number,

		/**
		 * The total time (duration) in seconds of the loaded media source.
		 *
		 * @type {Number}
		 * @public
		 */
		total: PropTypes.number
	},

	defaultProps: {
		mediaComponent: 'audio'
	},

	styles: {
		css,
		className: 'mediaPlayer'
	},

	render: ({currentTime, locale, loop, mediaComponent, mediaRef, onChange, onEnded, onLoopChange, onNext, onPause, onPlay, onPrevious, onShuffle, onUpdate, paused, playlist, proportionPlayed, repeatAll, shuffle, shuffledPlaylist, source, sourceIndex, total, ...rest}) => {
		const durFmt = getDurFmt(locale);

		return (
			<div {...rest}>
				<Media
					controls
					loop={loop}
					mediaComponent={mediaComponent}
					onEnded={onEnded}
					onUpdate={onUpdate}
					ref={mediaRef}
					source={source[sourceIndex]}
				/>
				<MediaSlider
					onChange={onChange}
					value={proportionPlayed}
				/>
				<Times
					current={currentTime}
					formatter={durFmt}
					total={total}
				/>
				<MediaControls
					loop={loop}
					onLoopChange={onLoopChange}
					onNext={onNext}
					onPause={onPause}
					onPlay={onPlay}
					onPrevious={onPrevious}
					onShuffle={onShuffle}
					paused={paused}
					repeatAll={repeatAll}
					shuffle={shuffle}
				/>
			</div>
		);
	}
});

const MediaPlayerExtended = hoc((config, Wrapped) => { // eslint-disable-line no-unused-vars
	return class extends React.Component {
		static displayName = 'MediaPlayerExtended'

		static propTypes = /** @lends agate/MediaPlayer.MediaPlayerBase.prototype */ {
			/**
			 * The current locale as a
			 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
			 *
			 * @type {String}
			 * @public
			 */
			locale: PropTypes.string,

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
			 * @default 'audio'
			 * @public
			 */
			mediaComponent: EnactPropTypes.renderable,

			/**
			 * Called when media is looped
			 *
			 * @type {Function}
			 * @public
			 */
			onLoopChange: PropTypes.func,

			/**
			 * Called when jumping to next media
			 *
			 * @type {Function}
			 * @public
			 */
			onNext: PropTypes.func,

			/**
			 * Called when media is paused
			 *
			 * @type {Function}
			 * @public
			 */
			onPause: PropTypes.func,

			/**
			 * Called when media is played
			 *
			 * @type {Function}
			 * @public
			 */
			onPlay: PropTypes.func,

			/**
			 * Called when jumping to previous media
			 *
			 * @type {Function}
			 * @public
			 */
			onPrevious: PropTypes.func,

			/**
			 * Called when jumping to a random media
			 *
			 * @type {Function}
			 * @public
			 */
			onShuffle: PropTypes.func
		}

		constructor (props) {
			super(props);

			// Internal State
			this.media = null;

			this.state = {
				currentTime: 0,
				duration: 0,
				loop: false,
				paused: true,
				playlist: this.props.children,
				proportionPlayed: 0,
				repeatAll: false,
				shuffle: false,
				shuffledPlaylist: [],
				sourceIndex: 0
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
		 * Returns an object with the current state of the media
		 *
		 * @function
		 * @memberof agate/MediaPlayer.MediaPlayerBase.prototype
		 * @returns {Object}
		 * @public
		 */
		getMediaState = () => {
			return {
				currentTime: this.state.currentTime,
				duration: this.state.duration,
				loop: this.state.loop,
				paused: this.state.paused,
				proportionPlayed: this.state.proportionPlayed
			};
		}

		/**
		 * The primary means of interacting with the media element.
		 *
		 * @param  {String} action The method to preform.
		 * @param  {Multiple} props  The arguments, in the format that the action method requires.
		 *
		 * @private
		 */
		send = (action, props) => {
			this.media[action](props);
		}

		handleEvent = () => {
			const el = this.media;
			const updatedState = {
				currentTime: el.currentTime,
				duration: el.duration,
				loop: el.loop,
				paused: el.paused,
				proportionPlayed: el.proportionPlayed
			};

			// If there's an error, we're obviously not loading, no matter what the readyState is.
			if (updatedState.error) updatedState.loading = false;

			this.setState(updatedState);
		}

		play = () => {
			this.send('play');
		}

		pause = () => {
			this.send('pause');
		}

		loopChange = () => {
			this.setState(prevState  => {
				return ({loop: !prevState.loop});
			}, () => {
				this.media.loop = this.state.loop;
			});

			if (this.state.loop) {
				this.setState({repeatAll: true})
			} else if (this.state.repeatAll) {
				this.setState({
					loop: false,
					repeatAll: false
				})
			}
		}

		handleOnEnded = () => {
			this.handleNext();
		}

		handleNext = () => {
			if (this.state.shuffle) {
				this.shufflePlaylist();
			}
			if (this.state.sourceIndex < this.props.children.length - 1) {
				this.setState(prevState  => {
					return ({sourceIndex: prevState.sourceIndex + 1});
				}, () => {
					this.play();
				})
			} else if (this.state.repeatAll) {
				this.setState({
					sourceIndex: 0
				}, () => {
					this.play();
				})
			}
		}

		handlePrevious = () => {
			if (this.state.sourceIndex > 0) {
				this.setState(prevState => {
					return ({sourceIndex: prevState.sourceIndex - 1});
				}, () => {
					this.play();
				})
			} else {
				this.setState({
					sourceIndex: this.props.children.length - 1
				}, () => {
					this.play();
				})
			}
		}

		shufflePlaylist = () => {
			let playlist = this.props.children;
			let counter = this.props.children.length;

			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				let index = Math.floor(Math.random() * counter);

				// Decrease counter by 1
				counter--;

				// And swap the last element with it
				let temp = playlist[counter];
				playlist[counter] = playlist[index];
				playlist[index] = temp;
			}

			console.log(playlist);
		}

		handleShuffle = () => {
			this.setState(prevState  => {
				return ({shuffle: !prevState.shuffle});
			})
		};

		seek = (timeIndex) => {
			this.media.currentTime = timeIndex;
		}

		onSliderChange = ({value}) => {
			const time = value * this.state.duration;

			this.seek(time);
		}

		setMediaRef = (node) => {
			this.media = node;
			this.setMedia();
		}

		setMedia ({setMedia} = this.props) {
			if (setMedia) {
				setMedia(this.media);
			}
		}

		render () {
			const {
				...rest
			} = this.props;

			return (
				<Wrapped
					{...rest}
					currentTime={this.state.currentTime}
					loop={this.state.loop}
					mediaRef={this.setMediaRef}
					onChange={this.onSliderChange}
					onEnded={this.handleOnEnded}
					onLoopChange={this.loopChange}
					onNext={this.handleNext}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
					onPrevious={this.handlePrevious}
					onShuffle={this.handleShuffle}
					onUpdate={this.handleEvent}
					paused={this.state.paused}
					proportionPlayed={this.state.proportionPlayed}
					playlist={this.state.playlist}
					repeatAll={this.state.repeatAll}
					shuffle={this.state.shuffle}
					shuffledPlaylist={this.state.shuffledPlaylist}
					sourceIndex={this.state.sourceIndex}
					total={this.state.duration}
				/>
			);
		}
	};
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
	MediaPlayerExtended,
	Pure,
	Slottable({slots: ['source']}),
	Skinnable,
	I18nContextDecorator({localeProp: 'locale'})
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
