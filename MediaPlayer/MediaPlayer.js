import EnactPropTypes from '@enact/core/internal/prop-types';
import {adaptEvent, call, forwardWithPrevent, handle} from '@enact/core/handle';
import {memoize} from '@enact/core/util';
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
import {I18nContextDecorator} from "@enact/i18n/I18nDecorator";

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
		onPlay: PropTypes.func,
	}

	static defaultProps = {
		mediaComponent: 'audio'
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
			paused: el.paused
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
		this.setState({loop: !this.state.loop}, () => {
			this.media.loop = this.state.loop;
		})
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

	render ()  {
		const {
			locale,
			mediaComponent,
			source,
			...rest
		} = this.props;

		rest.className = css.mediaPlayer;

		const durFmt = getDurFmt(locale);

		return (
			<div className={css.mediaPlayer} {...rest}>
				<Media
					controls
					loop={this.state.loop}
					mediaComponent={mediaComponent}
					onUpdate={this.handleEvent}
					ref={this.setMediaRef}
					source={source}
					{...rest}
				/>
				<MediaSlider />
				<Times current={this.state.currentTime} formatter={durFmt} total={this.state.duration} />
				<MediaControls
					loop={this.state.loop}
					onLoopChange={this.loopChange}
					onPause={this.handlePause}
					onPlay={this.handlePlay}
					paused={this.state.paused}
				/>
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
const MediaPlayer =
 I18nContextDecorator(
	{localeProp: 'locale'},

		MediaPlayerDecorator(MediaPlayerBase)

);
	;

export default MediaPlayer;
export {
	MediaPlayer,
	MediaPlayerBase,
	MediaPlayerDecorator
};
