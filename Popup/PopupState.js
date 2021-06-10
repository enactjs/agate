import {on, off} from '@enact/core/dispatcher';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {is} from '@enact/core/keymap';
import Spotlight, {getDirection} from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import FloatingLayer from '@enact/ui/FloatingLayer';
import PropTypes from 'prop-types';
import {Component} from 'react';
import warning from 'warning';

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');

const getContainerNode = (containerId) => {
	return document.querySelector(`[data-spotlight-id='${containerId}']`);
};

// Deprecate using scrimType 'none' with spotlightRestrict of 'self-only'
const checkScrimNone = (props) => {
	const validScrim = !(props.scrimType === 'none' && props.spotlightRestrict === 'self-only');
	warning(validScrim, "Using 'spotlightRestrict' of 'self-only' without a scrim " +
		'is not supported. Use a transparent scrim to prevent spotlight focus outside of the popup');
};

const OpenState = {
	CLOSED: 0,
	OPENING: 1,
	OPEN: 2
};

const forwardHide = forward('onHide');
const forwardShow = forward('onShow');

/**
 * A hoc component that renders a popup in a
 * [FloatingLayer]{@link ui/FloatingLayer.FloatingLayer}.
 *
 * @hoc PopupState
 * @memberof agate/Popup
 * @ui
 * @public
 */
const PopupState = hoc((config, Wrapped) => {
	return class extends Component {
		static displayName = 'PopupState';

		static propTypes = /** @lends agate/Popup.PopupState.prototype */ {
			/**
			 * Hint string read when focusing the popup close button.
			 *
			 * @type {String}
			 * @default 'Close'
			 * @public
			 */
			closeButtonAriaLabel: PropTypes.string,

			/**
			 * Prevents closing the popup via 5-way navigation out of the content.
			 *
			 * @type {Boolean}
			 * @default false
			 * @private
			 */
			no5WayClose: PropTypes.bool,

			/**
			 * Disables transition animation.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			noAnimation: PropTypes.bool,

			/**
			 * Indicates that the popup will not trigger `onClose` on the *ESC* key press.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			noAutoDismiss: PropTypes.bool,

			/**
			 * Called on:
			 *
			 * * pressing `ESC` key,
			 * * clicking on the close button, or
			 * * moving spotlight focus outside the boundary of the popup when `spotlightRestrict` is
			 *   `'self-first'`.
			 *
			 * It is the responsibility of the callback to set the `open` property to `false`.
			 *
			 * @type {Function}
			 * @public
			 */
			onClose: PropTypes.func,

			/**
			 * Called after hide transition has completed, and immediately with no transition.
			 *
			 * @type {Function}
			 * @public
			 */
			onHide: PropTypes.func,

			/**
			 * Called when a key is pressed.
			 *
			 * @type {Function}
			 * @public
			 */
			onKeyDown: PropTypes.func,

			/**
			 * Called after show transition has completed, and immediately with no transition.
			 *
			 * Note: The function does not run if Popup is initially opened and
			 * [noAnimation]{@link agate/Popup.PopupBase#noAnimation} is `true`.
			 *
			 * @type {Function}
			 * @public
			 */
			onShow: PropTypes.func,

			/**
			 * Controls the visibility of the Popup.
			 *
			 * By default, the Popup and its contents are not rendered until `open`.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			open: PropTypes.bool,

			/**
			 * Position of the Popup on the screen.
			 *
			 * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
			 * @default 'center'
			 * @public
			 */
			position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

			/**
			 * Scrim type.
			 *
			 * * Values: `'transparent'`, `'translucent'`, or `'none'`.
			 *
			 * `'none'` is not compatible with `spotlightRestrict` of `'self-only'`, use a transparent scrim
			 * to prevent mouse focus when using popup.
			 *
			 * @type {('transparent'|'translucent'|'none')}
			 * @default 'translucent'
			 * @public
			 */
			scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),

			/**
			 * Restricts or prioritizes navigation when focus attempts to leave the popup.
			 *
			 * * Values: `'self-first'`, or `'self-only'`.
			 *
			 * When using `self-first`, attempts to leave the popup via 5-way will fire `onClose` based
			 * on the following values of `position`:
			 *
			 * * `'bottom'` - When leaving via 5-way up
			 * * `'top'` - When leaving via 5-way down
			 * * `'left'` - When leaving via 5-way right
			 * * `'right'` - When leaving via 5-way left
			 * * `'center'` - When leaving via any 5-way direction
			 *
			 * Note: If `onClose` is not set, then this has no effect on 5-way navigation. If the popup
			 * has no spottable children, 5-way navigation will cause the Popup to fire `onClose`.
			 *
			 * @type {('self-first'|'self-only')}
			 * @default 'self-only'
			 * @public
			 */
			spotlightRestrict: PropTypes.oneOf(['self-first', 'self-only'])
		};

		static defaultProps = {
			noAnimation: false,
			noAutoDismiss: false,
			open: false,
			position: 'center',
			scrimType: 'translucent',
			spotlightRestrict: 'self-only'
		};

		static getDerivedStateFromProps (props, state) {
			if (props.open !== state.prevOpen) {
				if (props.open) {
					return {
						popupOpen: props.noAnimation || state.floatLayerOpen ? OpenState.OPEN : OpenState.CLOSED,
						floatLayerOpen: true,
						activator: Spotlight.getCurrent(),
						prevOpen: props.open
					};
				} else {
					return {
						popupOpen: OpenState.CLOSED,
						floatLayerOpen: state.popupOpen === OpenState.OPEN ? !props.noAnimation : false,
						activator: props.noAnimation ? null : state.activator,
						prevOpen: props.open
					};
				}
			}
			return null;
		}

		constructor (props) {
			super(props);
			this.paused = new Pause('Popup');
			this.state = {
				floatLayerOpen: this.props.open,
				popupOpen: this.props.open ? OpenState.OPEN : OpenState.CLOSED,
				prevOpen: this.props.open,
				containerId: Spotlight.add(),
				activator: null
			};
			checkScrimNone(this.props);
		}

		// Spot the content after it's mounted.
		componentDidMount () {
			if (this.props.open) {
				// If the popup is open on mount, we need to pause spotlight so nothing steals focus
				// while the popup is rendering.
				this.paused.pause();
				if (getContainerNode(this.state.containerId)) {
					this.spotPopupContent();
				}
			}
		}

		componentDidUpdate (prevProps, prevState) {
			if (this.props.open !== prevProps.open) {
				if (!this.props.noAnimation) {
					if (!this.props.open && this.state.popupOpen === OpenState.CLOSED) {
						// If the popup is supposed to be closed (!this.props.open) and is actually
						// fully closed (OpenState.CLOSED), we must resume spotlight navigation. This
						// can occur when quickly toggling a Popup open and closed.
						this.paused.resume();
					} else {
						// Otherwise, we pause spotlight so it is locked until the popup is ready
						this.paused.pause();
					}
				} else if (this.props.open) {
					forwardShow({}, this.props);
					this.spotPopupContent();
				} else if (prevProps.open) {
					forwardHide({}, this.props);
					this.spotActivator(prevState.activator);
				}
			}

			checkScrimNone(this.props);
		}

		componentWillUnmount () {
			if (this.props.open) {
				off('keydown', this.handleKeyDown);
			}
			Spotlight.remove(this.state.containerId);
		}

		handleFloatingLayerOpen = () => {
			if (!this.props.noAnimation && this.state.popupOpen !== OpenState.OPEN) {
				this.setState({
					popupOpen: OpenState.OPENING
				});
			} else if (this.state.popupOpen === OpenState.OPEN && this.props.open) {
				this.spotPopupContent();
			}
		};

		handleKeyDown = (ev) => {
			const {onClose, no5WayClose, position, spotlightRestrict} = this.props;

			if (no5WayClose) return;

			const {containerId} = this.state;
			const keyCode = ev.keyCode;
			const direction = getDirection(keyCode);
			const spottables = Spotlight.getSpottableDescendants(containerId).length;
			const current = Spotlight.getCurrent();

			if (direction && (!spottables || current && getContainerNode(containerId).contains(current))) {
				// explicitly restrict navigation in order to manage focus state when attempting to leave the popup
				Spotlight.set(containerId, {restrict: 'self-only'});

				if (onClose) {
					let focusChanged;

					if (spottables && current && spotlightRestrict !== 'self-only') {
						focusChanged = Spotlight.move(direction);

						if (focusChanged) {
							// stop propagation to prevent default spotlight behavior
							ev.stopPropagation();
						}
					}

					if (!spottables || (focusChanged === false && (
						position === 'center' ||
						isUp(keyCode) && position === 'bottom' ||
						isDown(keyCode) && position === 'top' ||
						isRight(keyCode) && position === 'left' ||
						isLeft(keyCode) && position === 'right'
					))) {
						// prevent default page scrolling
						ev.preventDefault();
						// stop propagation to prevent default spotlight behavior
						ev.stopPropagation();
						// set the pointer mode to false on keydown
						Spotlight.setPointerMode(false);
						onClose(ev);
					}
				}
			}
		};

		handlePopupHide = (ev) => {
			forwardHide(ev, this.props);

			this.setState({
				floatLayerOpen: false,
				activator: null
			});

			if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === this.state.containerId) {
				this.spotActivator(this.state.activator);
			}
		};

		handlePopupShow = (ev) => {
			forwardShow(ev, this.props);

			this.setState({
				popupOpen: OpenState.OPEN
			});

			if (!ev.currentTarget || ev.currentTarget.getAttribute('data-spotlight-id') === this.state.containerId) {
				this.spotPopupContent();
			}
		};

		spotActivator = (activator) => {
			this.paused.resume();

			// only spot the activator if the popup is closed
			if (this.props.open) return;

			const current = Spotlight.getCurrent();
			const containerNode = getContainerNode(this.state.containerId);

			off('keydown', this.handleKeyDown);

			// if there is no currently-spotted control or it is wrapped by the popup's container, we
			// know it's safe to change focus
			if (!current || (containerNode && containerNode.contains(current))) {
				// attempt to set focus to the activator, if available
				if (!Spotlight.isPaused() && !Spotlight.focus(activator)) {
					Spotlight.focus();
				}
			}
		};

		spotPopupContent = () => {
			this.paused.resume();

			// only spot the activator if the popup is open
			if (!this.props.open) return;

			const {containerId} = this.state;

			on('keydown', this.handleKeyDown);

			if (!Spotlight.isPaused() && !Spotlight.focus(containerId)) {
				const current = Spotlight.getCurrent();

				// In cases where the container contains no spottable controls or we're in pointer-mode, focus
				// cannot inherently set the active container or blur the active control, so we must do that
				// here.
				if (current) {
					current.blur();
				}
				Spotlight.setActiveContainer(containerId);
			}
		};


		render () {
			const {noAutoDismiss, onClose, scrimType, ...rest} = this.props;
			delete rest.spotlightId;
			delete rest.spotlightRestrict;

			return (
				<FloatingLayer
					noAutoDismiss={noAutoDismiss}
					open={this.state.floatLayerOpen}
					onOpen={this.handleFloatingLayerOpen}
					onDismiss={onClose}
					scrimType={scrimType}
				>
					<Wrapped
						{...rest}
						open={this.state.popupOpen >= OpenState.OPENING}
						onClose={onClose}
						onHide={this.handlePopupHide}
						onShow={this.handlePopupShow}
						spotlightId={this.state.containerId}
					/>
				</FloatingLayer>
			);
		}
	};
});

export default PopupState;
export {
	PopupState
};
