/**
 * An Agate-styled `MediaPlayer` component.
 *
 * @module agate/MediaPlayer
 * @exports MediaPlayer
 * @exports MediaPlayerBase
 * @exports MediaPlayerDecorator
 */

import {adaptEvent, call, forwardWithPrevent, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {memoize} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {useAnnounce} from '@enact/ui/AnnounceDecorator';
import Pure from '@enact/ui/internal/Pure';
import Media from '@enact/ui/Media';
import Slottable from '@enact/ui/Slottable';
import DurationFmt from 'ilib/lib/DurationFmt';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Component, Fragment} from 'react';

import $L from '../internal/$L';

import MediaControls from './MediaControls';
import MediaSlider from './MediaSlider';
import Skinnable from '../Skinnable';
import Times from './Times';
import {secondsToTime} from './util';

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
 * A player for media {@link agate/MediaPlayer.MediaPlayer}.
 *
 * @class MediaPlayerBase
 * @memberof agate/MediaPlayer
 * @ui
 * @public
 */
const MediaPlayerBase = kind({
	name: 'MediaPlayer',

	propTypes: /** @lends agate/MediaPlayer.MediaPlayerBase.prototype */ {
		/**
		 * Any children `<source>` tag elements will be sent directly to the media element as
		 * sources.
		 *
		 * @type {Node}
		 * @required
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
		 * Called when the media file reaches the end of its duration.
		 *
		 * @type {Function}
		 * @public
		 */
		onEnded: PropTypes.func,

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
		 * Called when media is on repeat.
		 *
		 * @type {Function}
		 * @public
		 */
		onRepeat: PropTypes.func,

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
		 * The current list of media.
		 *
		 * @type {Array}
		 * @public
		 */
		playlist: PropTypes.arrayOf(PropTypes.node),

		/**
		 * Proportion of media file played.
		 *
		 * @type {Number}
		 * @public
		 */
		proportionPlayed: PropTypes.number,

		/**
		 * The repeat mode of the media playlist.
		 *
		 * @type {('none'|'one'|'all')}
		 * @default 'none'
		 * @public
		 */
		repeat: PropTypes.oneOf(['none', 'one', 'all']),

		/**
		 * `true` when the media playlist is shuffled.
		 *
		 * @type {Boolean}
		 * @public
		 */
		shuffle: PropTypes.bool,

		/**
		 * The index of the current played media.
		 *
		 * @type {Number}
		 * @public
		 */
		sourceIndex: PropTypes.number,

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

	computed: {
		durFmt: ({locale}) => getDurFmt(locale)
	},

	render: ({currentTime, durFmt, loop, mediaComponent, mediaRef, onChange, onEnded, onNext, onPause, onPlay, onPrevious, onRepeat, onShuffle, onUpdate, paused, playlist, proportionPlayed, repeat, shuffle, sourceIndex, total, ...rest}) => {
		return (
			<div {...rest}>
				<Media
					loop={loop}
					mediaComponent={mediaComponent}
					onEnded={onEnded}
					onUpdate={onUpdate}
					ref={mediaRef}
					source={playlist ? playlist[sourceIndex] : null}
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
					onNext={onNext}
					onPause={onPause}
					onPlay={onPlay}
					onPrevious={onPrevious}
					onRepeat={onRepeat}
					onShuffle={onShuffle}
					paused={paused}
					repeat={repeat}
					shuffle={shuffle}
				/>
			</div>
		);
	}
});

/**
 * Media player behaviors to apply to [MediaPlayerBase]{@link agate/MediaPlayer.MediaPlayerBase}.
 *
 * @class MediaPlayerBehaviorDecorator
 * @hoc
 * @memberof agate/MediaPlayer
 * @private
 */
const MediaPlayerBehaviorDecorator = hoc((config, Wrapped) => { // eslint-disable-line no-unused-vars
	return class extends Component {
		static displayName = 'MediaPlayerBehaviorDecorator';

		static propTypes = /** @lends agate/MediaPlayer.MediaPlayerBehaviorDecorator.prototype */ {
			/**
			 * Passed by AnnounceDecorator for accessibility.
			 *
			 * @type {Object}
			 * @public
			 */
			announce: PropTypes.func,

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
			 * Called when media is on repeat mode.
			 *
			 * @type {Function}
			 * @public
			 */
			onRepeat: PropTypes.func,

			/**
			 * Called when jumping to a random media
			 *
			 * @type {Function}
			 * @public
			 */
			onShuffle: PropTypes.func
		};

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
				repeat: 'none',
				shuffle: false,
				sourceIndex: 0
			};
		}

		handle = handle.bind(this);

		handlePlay = this.handle(
			forwardPlay,
			() => this.play()
		);

		handlePause = this.handle(
			forwardPause,
			() => this.pause()
		);

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
		};

		/**
		 * Returns an object with the current state of the media including `currentTime`, `duration`,
		 * `paused` and `loop`
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
		};

		/**
		 * The primary means of interacting with the media element.
		 *
		 * @param  {String} action The method to preform.
		 * @param  {Multiple} props  The arguments, in the format that the action method requires.
		 *
		 * @private
		 */
		send = (action, props) => {
			return this.media[action](props);
		};

		handleEvent = () => {
			const el = this.media;
			const updatedState = {
				currentTime: el.currentTime,
				duration: el.duration,
				loop: el.loop,
				paused: el.paused,
				proportionPlayed: el.proportionPlayed || 0
			};

			// If there's an error, we're obviously not loading, no matter what the readyState is.
			if (updatedState.error) updatedState.loading = false;

			this.setState(updatedState);
		};

		/**
		 * Programmatically plays the current media.
		 *
		 * @function
		 * @memberof agate/MediaPlayer.MediaPlayerBase.prototype
		 * @public
		 */
		play = () => {
			const playPromise = this.send('play');

			if (playPromise) {
				playPromise.then(() => {
					// Automatic playback started!
				}).catch(() => {
					// Auto-play was prevented
				});
			}
		};

		/**
		 * Programmatically plays the current media.
		 *
		 * @function
		 * @memberof agate/MediaPlayer.MediaPlayerBase.prototype
		 * @public
		 */
		pause = () => {
			this.send('pause');
		};

		/**
		 * Programmatically sets the loop property of the media.
		 *
		 * @function
		 * @memberof agate/MediaPlayer.MediaPlayerBase.prototype
		 * @public
		 */
		handleOnRepeat = () => {
			// Handling the 3 states of repeat: repeat none, repeat one and repeat all
			let loop = false;

			this.setState(({repeat}) => {
				switch (repeat) {
					case 'none':
						loop = !repeat.loop;
						return ({loop, repeat: 'one'});
					case 'one':
						return ({repeat: 'all'});
					case 'all':
						return ({repeat: 'none'});
				}
			}, () => {
				this.media.loop = loop;
			});
		};

		handleOnEnded = () => {
			// Play next media only if current media is not last or, if it is last, only if repeat='all'
			if (this.state.sourceIndex !== this.state.playlist.length - 1 || (this.state.sourceIndex === this.state.playlist.length - 1 && this.state.repeat === 'all')) {
				this.handleNext();
			}
		};

		handleNext = () => {
			let currentIndex = this.state.sourceIndex;

			if (this.state.repeat !== 'one') {
				if (currentIndex < this.state.playlist.length - 1) {
					++currentIndex;
				} else if (this.state.repeat === 'all') {
					// When shuffle is true, the playback of the list restarts and the media list is reshuffled.
					currentIndex = 0;

					if (this.state.shuffle) {
						this.shufflePlaylist();
					}
				}

				this.setState(() => {
					return ({sourceIndex: currentIndex});
				}, () => {
					this.play();
				});
			} else {
				this.media.currentTime = 0;
				this.play();
			}
		};

		handlePrevious = () => {
			let currentIndex = this.state.sourceIndex;

			if (this.state.repeat !== 'one' && (this.media.paused || this.media.currentTime < 2)) {
				if (currentIndex > 0) {
					--currentIndex;
				} else if (!this.state.shuffle && this.state.repeat === 'all') {
					currentIndex = this.state.playlist.length - 1;
				}

				this.setState(() => {
					return ({sourceIndex: currentIndex});
				}, () => {
					this.media.currentTime = 0;
					this.play();
				});
			} else {
				this.media.currentTime = 0;
				this.play();
			}
		};

		shufflePlaylist = (currentMedia) => {
			let remainingSize = this.props.children.length;
			let playlist = [...this.props.children];
			let currentMediaIndex;

			// While there are elements in the array
			while (remainingSize > 0) {
				// Pick a random index
				let randomIndex = Math.floor(Math.random() * remainingSize);

				// Decrease size by 1
				remainingSize--;

				// And swap the last element with it
				[playlist[remainingSize], playlist[randomIndex]] = [playlist[randomIndex], playlist[remainingSize]];

				if (playlist[remainingSize] === currentMedia) {
					currentMediaIndex = remainingSize;
				}
			}

			// Keep the current media active and set it as the first element in the shuffled array
			if (currentMediaIndex) {
				[playlist[0], playlist[currentMediaIndex]] = [playlist[currentMediaIndex], playlist[0]];
			}

			this.setState({
				playlist,
				sourceIndex: 0
			});
		};

		handleShuffle = () => {
			let currentMedia = this.state.playlist[this.state.sourceIndex];
			this.setState(({shuffle}) => {
				if (!shuffle) {
					return ({shuffle: true});
				} else {
					// When resetting shuffle to false, the initial playlist is set with the last played media kept active.
					return ({shuffle: false, playlist: this.props.children, sourceIndex: parseInt(currentMedia.key)});
				}
			}, () => {
				if (this.state.shuffle) {
					this.shufflePlaylist(currentMedia);
				}
			});
		};

		onSliderChange = ({value}) => {
			const currentTime = value * this.state.duration;
			const seconds = Math.floor(currentTime);

			this.media.currentTime = currentTime;

			if (!isNaN(seconds)) {
				const knobTime = secondsToTime(seconds, getDurFmt(this.props.locale), {includeHour: true});

				this.props.announce(`${$L('jump to')} ${knobTime}`, true);
			}
		};

		setMediaRef = (node) => {
			this.media = node;
		};

		render () {
			const {
				...rest
			} = this.props;

			delete rest.announce;

			return (
				<Wrapped
					{...rest}
					currentTime={this.state.currentTime}
					loop={this.state.loop}
					mediaRef={this.setMediaRef}
					onChange={this.onSliderChange}
					onEnded={this.handleOnEnded}
					onNext={this.handleNext}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
					onPrevious={this.handlePrevious}
					onRepeat={this.handleOnRepeat}
					onShuffle={this.handleShuffle}
					onUpdate={this.handleEvent}
					paused={this.state.paused}
					playlist={this.state.playlist}
					proportionPlayed={this.state.proportionPlayed}
					repeat={this.state.repeat}
					shuffle={this.state.shuffle}
					sourceIndex={this.state.sourceIndex}
					total={this.state.duration}
				/>
			);
		}
	};
});

// eslint-disable-next-line no-shadow
const AnnounceDecorator = Wrapped => (function AnnounceDecorator (props) {
	const {announce, children} = useAnnounce();

	return (
		<Fragment>
			<Wrapped {...props} announce={announce} />
			{children}
		</Fragment>
	);
});

/**
 * A higher-order component that adds Agate specific behaviors to `MediaPlayer`.
 *
 * @hoc
 * @memberof agate/MediaPlayer
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const MediaPlayerDecorator = compose(
	AnnounceDecorator,
	MediaPlayerBehaviorDecorator,
	Pure,
	Slottable({slots: ['source']}),
	Skinnable,
	I18nContextDecorator({localeProp: 'locale'})
);

/**
 * An Agate-styled `MediaPlayer` component.
 *
 * Usage:
 * ```
 * <MediaPlayer>
 *   <source src={['https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3']} type='audio/mp3' />
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
