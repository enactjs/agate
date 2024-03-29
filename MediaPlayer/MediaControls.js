import kind from '@enact/core/kind';
import {SpotlightContainerDecorator, spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
import Button from '../Button';

import css from './MediaControls.module.less';

const badges = {
	none: '',
	one: '1',
	all: 'A'
};

const Container = SpotlightContainerDecorator({
	enterTo: 'default-element'
}, 'div');

/**
 * A set of components for controlling media playback and rendering additional components.
 *
 * @class MediaControls
 * @memberof agate/MediaPlayer
 * @ui
 * @private
 */
const MediaControls = kind({
	name: 'MediaControls',

	propTypes: /** @lends agate/MediaPlayer.MediaControls.prototype */ {
		/**
		 * Disables MediaControls and makes it non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

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
		 * @default true
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * A string which is sent to the `pause` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon|Icon}. This will be temporarily replaced by
		 * the {@link agate/MediaPlayer.MediaControls.playIcon|playIcon} when the
		 * {@link agate/MediaPlayer.MediaControls.paused|paused} boolean is `false`.
		 *
		 * @type {String}
		 * @default 'pause'
		 * @public
		 */
		pauseIcon: PropTypes.string,

		/**
		 * A string which is sent to the `play` icon of the player controls. This can be
		 * anything that is accepted by {@link agate/Icon.Icon}. This will be temporarily replaced by
		 * the {@link agate/MediaPlayer.MediaControls.pauseIcon|pauseIcon} when the
		 * {@link agate/MediaPlayer.MediaControls.paused|paused} boolean is `true`.
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
		shuffleIcon: PropTypes.string,

		/**
		 * Specifies what kind of layout the MediaPlayer should have.
		 *
		 * @type {('full'|'tiny')}
		 * @default 'full'
		 * @public
		 */
		type: PropTypes.oneOf(['full', 'tiny'])
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
		shuffleIcon: 'shuffle',
		type: 'full'
	},

	styles: {
		css,
		className: 'controlsFrame'
	},

	computed: {
		badge: ({repeat}) => badges[repeat],
		className: ({type, styler}) => styler.append(type)
	},

	render: ({badge, disabled, menuIcon, nextTrackIcon, onNext, onPause, onPlay, onPrevious, onRepeat, onShuffle, paused, pauseIcon, playIcon, previousTrackIcon, repeatIcon, shuffle, shuffleIcon, type, ...rest}) => {
		return (
			<Container {...rest}>
				{type === 'full' ?
					<Button
						aria-label={$L('Repeat')}
						backgroundOpacity="transparent"
						badge={badge}
						css={css}
						disabled={disabled}
						icon={repeatIcon}
						onClick={onRepeat}
					/> : null}
				{type === 'full' ?
					<Button
						aria-label={$L('Shuffle')}
						backgroundOpacity="transparent"
						className={shuffle ? css.repeat : ''}
						css={css}
						disabled={disabled}
						icon={shuffleIcon}
						onClick={onShuffle}
					/> : null}
				<Button
					aria-label={$L('Previous')}
					backgroundOpacity="transparent"
					css={css}
					disabled={disabled}
					icon={previousTrackIcon}
					onClick={onPrevious}
				/>
				<Button
					aria-label={paused ? $L('Play') : $L('Pause')}
					backgroundOpacity="transparent"
					className={classnames(css.playPauseButton, spotlightDefaultClass)}
					css={css}
					disabled={disabled}
					icon={paused ? playIcon : pauseIcon}
					minWidth={false}
					onClick={paused ? onPlay : onPause}
				/>
				<Button
					aria-label={$L('Next')}
					backgroundOpacity="transparent"
					css={css}
					disabled={disabled}
					icon={nextTrackIcon}
					onClick={onNext}
				/>
				{type === 'full' ?
					<Button
						aria-label={$L('Menu')}
						backgroundOpacity="transparent"
						css={css}
						disabled={disabled}
						icon={menuIcon}
					/> : null}
			</Container>
		);
	}
});

export default MediaControls;
export {
	MediaControls
};
