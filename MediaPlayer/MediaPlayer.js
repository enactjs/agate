import {adaptEvent, call, forwardWithPrevent, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
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

	computed: {
		durFmt: ({locale}) => getDurFmt(locale)
	},

	render: ({currentTime, durFmt, loop, mediaComponent, mediaRef, onChange, onLoopChange, onPause, onPlay, onUpdate, paused, proportionPlayed, source, total, ...rest}) => {
		return (
			<div {...rest}>
				<Media
					loop={loop}
					mediaComponent={mediaComponent}
					onUpdate={onUpdate}
					ref={mediaRef}
					source={source}
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
					onPause={onPause}
					onPlay={onPlay}
					paused={paused}
				/>
			</div>
		);
	}
});

/**
 * Media player behaviors to apply to [MediaPlayerBase]{@link agate/MediaPlayer.MediaPlayerBase}.
 *
 * @class MediaPlayerBehaviorDecorator
 * @memberof agate/MediaPlayer
 * @hoc
 * @private
 */
const MediaPlayerBehaviorDecorator = hoc((config, Wrapped) => { // eslint-disable-line no-unused-vars
	return class extends React.Component {
		static displayName = 'MediaPlayerBehaviorDecorator';

		static propTypes = /** @lends agate/MediaPlayer.MediaPlayerBehaviorDecorator.prototype */ {
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
			onPlay: PropTypes.func
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
				proportionPlayed: 0
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
			this.media[action](props);
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
			this.send('play');
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
		loopChange = () => {
			this.setState(prevState  => {
				return ({loop: !prevState.loop});
			}, () => {
				this.media.loop = this.state.loop;
			});
		};

		onSliderChange = ({value}) => {
			this.media.currentTime = value * this.state.duration;
		};

		setMediaRef = (node) => {
			this.media = node;
		};

		render () {
			const {
				...rest
			} = this.props;

			return (
				<Wrapped
					{...rest}
					currentTime={this.state.currentTime}
					loop={this.state.loop}
					onChange={this.onSliderChange}
					onLoopChange={this.loopChange}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
					onUpdate={this.handleEvent}
					paused={this.state.paused}
					proportionPlayed={this.state.proportionPlayed}
					mediaRef={this.setMediaRef}
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
 * @mixes i18n/I18nContextDecorator.I18nContextDecorator
 * @public
 */
const MediaPlayerDecorator = compose(
	MediaPlayerBehaviorDecorator,
	Pure,
	Slottable({slots: ['source']}),
	Skinnable,
	I18nContextDecorator({localeProp: 'locale'})
);

/**
 * An Agate-styled `Media` component.
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
