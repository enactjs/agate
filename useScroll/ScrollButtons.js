import {forward} from '@enact/core/handle';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import {is} from '@enact/core/keymap';
import Spotlight, {getDirection} from '@enact/spotlight';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ScrollButton from './ScrollButton';

const
	nop = () => {},
	prepareButton = (isPrev) => (isVertical) => {
		let direction;

		if (isVertical) {
			direction = isPrev ? 'up' : 'down';
		} else {
			direction = isPrev ? 'left' : 'right';
		}

		return 'arrowlarge' + direction;
	},
	preparePrevButton = prepareButton(true),
	prepareNextButton = prepareButton(false),
	isPageUp = is('pageUp'),
	isPageDown = is('pageDown'),
	consumeEvent = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
	};

/**
 * An Agate-styled scroll buttons. It is used in [Scrollbar]{@link agate/useScroll.Scrollbar}.
 *
 * @class ScrollButtons
 * @memberof agate/useScroll
 * @ui
 * @private
 */
class ScrollButtons extends Component {
	static displayName = 'ScrollButtons';

	static propTypes = /** @lends agate/useScroll.ScrollButtons.prototype */ {
		/**
		 * The render function for scrollbar track.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		scrollbarTrackRenderer: PropTypes.func.isRequired,

		/**
		 * Specifies to reflect scrollbar's disabled property to the paging controls.
		 * When it is `true`, both prev/next buttons are going to be disabled.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * When it is `true`, it allows 5 way navigation to the ScrollButtons.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		focusableScrollButtons: PropTypes.bool,

		/**
		 * Sets the hint string read when focusing the next button in the scroll bar.
		 *
		 * @type {String}
		 * @public
		 */
		nextButtonAriaLabel: PropTypes.string,

		/**
		 * Called when the scrollbar's button is pressed and needs to be bubbled.
		 *
		 * @type {Function}
		 * @private
		 */
		onKeyDownButton: PropTypes.func,

		/**
		 * Called when the scrollbar's down/right button is pressed.
		 *
		 * @type {Function}
		 * @public
		 */
		onNextScroll: PropTypes.func,

		/**
		 * Called when the scrollbar's up/left button is pressed.
		 *
		 * @type {Function}
		 * @public
		 */
		onPrevScroll: PropTypes.func,

		/**
		 * Specifies preventing keydown events from bubbling up to applications.
		 * Valid values are `'none'`, and `'programmatic'`.
		 *
		 * When it is `'none'`, every keydown event is bubbled.
		 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
		 * which invokes programmatic spotlight moving.
		 *
		 * @type {String}
		 * @private
		 */
		preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

		/**
		 * Sets the hint string read when focusing the previous button in the scroll bar.
		 *
		 * @type {String}
		 * @public
		 */
		previousButtonAriaLabel: PropTypes.string,

		/**
		 * `true` if rtl, `false` if ltr.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The scrollbar will be oriented vertically.
		 *
		 * @type {Boolean}
		 * @default true
		 * @public
		 */
		vertical: PropTypes.bool
	};

	static defaultProps = {
		focusableScrollButtons: false,
		onKeyDownButton: nop,
		onNextScroll: nop,
		onPrevScroll: nop
	};

	constructor (props) {
		super(props);

		this.state = {
			prevButtonDisabled: true,
			nextButtonDisabled: true
		};

		this.nextButtonRef = React.createRef();
		this.prevButtonRef = React.createRef();
	}

	componentDidMount () {
		utilEvent('keydown').addEventListener(this.nextButtonRef, this.onKeyDownNext);
		utilEvent('keydown').addEventListener(this.prevButtonRef, this.onKeyDownPrev);
	}

	componentWillUnmount () {
		utilEvent('keydown').removeEventListener(this.nextButtonRef, this.onKeyDownNext);
		utilEvent('keydown').removeEventListener(this.prevButtonRef, this.onKeyDownPrev);
	}

	updateButtons = (bounds) => {
		const
			{vertical} = this.props,
			currentPos = vertical ? bounds.scrollTop : bounds.scrollLeft,
			maxPos = vertical ? bounds.maxTop : bounds.maxLeft,
			shouldDisablePrevButton = currentPos <= 0,
			/* If a scroll size or a client size is not integer,
			   browser's max scroll position could be smaller than maxPos by 1 pixel.*/
			shouldDisableNextButton = maxPos - currentPos <= 1,
			updatePrevButton = (this.state.prevButtonDisabled !== shouldDisablePrevButton),
			updateNextButton = (this.state.nextButtonDisabled !== shouldDisableNextButton);

		if (updatePrevButton || updateNextButton) {
			this.setState(() => {
				if (updatePrevButton && updateNextButton) {
					return {prevButtonDisabled: shouldDisablePrevButton, nextButtonDisabled: shouldDisableNextButton};
				} else if (updatePrevButton) {
					return {prevButtonDisabled: shouldDisablePrevButton};
				} else if (updateNextButton) {
					return {nextButtonDisabled: shouldDisableNextButton};
				}
			});
		}

	};

	isOneOfScrollButtonsFocused = () => {
		const current = Spotlight.getCurrent();
		return current === this.prevButtonRef.current || current === this.nextButtonRef.current;
	};

	onClickPrev = (ev) => {
		const {onPrevScroll, vertical} = this.props;
		onPrevScroll({...ev, isPreviousScrollButton: true, isVerticalScrollBar: vertical});
	};

	onClickNext = (ev) => {
		const {onNextScroll, vertical} = this.props;
		onNextScroll({...ev, isPreviousScrollButton: false, isVerticalScrollBar: vertical});
	};

	focusOnButton = (isPrev) => {
		Spotlight.focus(isPrev ? this.prevButtonRef.current : this.nextButtonRef.current);
	};

	focusOnOppositeScrollButton = (ev, direction) => {
		const buttonNode = (ev.target === this.nextButtonRef.current) ? this.prevButtonRef.current : this.nextButtonRef.current;

		if (!Spotlight.focus(buttonNode)) {
			Spotlight.move(direction);
		}
	};

	onKeyDownButton = (ev, position) => {
		const
			{focusableScrollButtons, vertical, preventBubblingOnKeyDown} = this.props,
			{keyCode} = ev,
			direction = getDirection(ev.keyCode),
			preventBubbling = preventBubblingOnKeyDown === 'programmatic',
			isNextButton = position === 'next',
			isPrevButton = position === 'prev',
			nextButton = {
				disabled: this.state.nextButtonDisabled,
				ref: this.nextButtonRef.current,
				click: this.onClickNext
			},
			prevButton = {
				disabled: this.state.prevButtonDisabled,
				ref: this.prevButtonRef.current,
				click: this.onClickPrev
			},
			currentButton = isPrevButton ? prevButton : nextButton,
			oppositeButton = isPrevButton ? nextButton : prevButton;

		if (isPageDown(keyCode) || isPageUp(keyCode)) {
			if (!vertical) {
				// should not call stopPropagation() here
				ev.preventDefault();
				return;
			}

			if (isPrevButton && isPageDown(keyCode) || isNextButton && isPageUp(keyCode)) {
				if (focusableScrollButtons && !Spotlight.getPointerMode()) {
					consumeEvent(ev);
					Spotlight.setPointerMode(false);
					Spotlight.focus(ReactDOM.findDOMNode(oppositeButton.ref)); // eslint-disable-line react/no-find-dom-node
				} else if (!oppositeButton.disabled) {
					consumeEvent(ev);
					oppositeButton.click(ev);
				}
			} else if (!currentButton.disabled) {
				consumeEvent(ev);
				currentButton.click(ev);
			}
		} else if (direction) {
			const
				{rtl} = this.props,
				isDown = direction === 'down',
				isLeftMovement = direction === (rtl ? 'right' : 'left'),
				isRightMovement = direction === (rtl ? 'left' : 'right'),
				isUp = direction === 'up',
				fromNextToPrev = vertical ? isUp : isLeftMovement,
				fromPrevToNext = vertical ? isDown : isRightMovement;

			Spotlight.setPointerMode(false);

			if (isNextButton && fromNextToPrev || isPrevButton && fromPrevToNext) {
				if (focusableScrollButtons) {
					consumeEvent(ev);
					this.focusOnOppositeScrollButton(ev, direction);
					if (!preventBubbling) {
						forward('onKeyDownButton', ev, this.props);
					}
				}
			} else {
				const
					// If it is vertical Scroller, move focus to the left for ltr or to the right for rtl
					// If is is horizontal Scroller, move focus to the up
					directionToContent = !vertical && 'up' || rtl && 'right' || 'left',
					isLeavingDown = vertical && isNextButton && isDown,
					isLeavingUp = vertical && isPrevButton && isUp,
					isLeavingLeft = !vertical && isPrevButton && isLeftMovement,
					isLeavingRight = !vertical && isNextButton && isRightMovement,
					isDirectionToLeave =
						(vertical && isRightMovement || isLeavingUp || isLeavingDown) ||
						(!vertical && isDown || isLeavingLeft || isLeavingRight);

				if (isDirectionToLeave) {
					if (!focusableScrollButtons && !getTargetByDirectionFromElement(direction, ev.target)) {
						if (preventBubbling && isLeavingDown || isLeavingUp || isLeavingLeft || isLeavingRight) {
							consumeEvent(ev);
						}
						// move focus into contents and allow bubbling
						Spotlight.move(directionToContent);
					}
				} else if (preventBubbling) {
					// move focus directly to stop bubbling
					consumeEvent(ev);
					Spotlight.move(direction);
				}
			}
		}
	};

	onKeyDownPrev = (ev) => {
		this.onKeyDownButton(ev, 'prev');
	};

	onKeyDownNext = (ev) => {
		this.onKeyDownButton(ev, 'next');
	};

	render () {
		const
			{disabled, nextButtonAriaLabel, previousButtonAriaLabel, rtl, scrollbarTrackRenderer, vertical} = this.props,
			{prevButtonDisabled, nextButtonDisabled} = this.state,
			prevIcon = preparePrevButton(vertical),
			nextIcon = prepareNextButton(vertical);

		return [
			<ScrollButton
				aria-label={rtl && !vertical ? nextButtonAriaLabel : previousButtonAriaLabel}
				data-spotlight-overflow="ignore"
				disabled={disabled || prevButtonDisabled}
				key="prevButton"
				onClick={this.onClickPrev}
				onHoldPulse={this.onClickPrev}
				ref={this.prevButtonRef}
				icon={prevIcon}
			/>,
			scrollbarTrackRenderer(),
			<ScrollButton
				aria-label={rtl && !vertical ? previousButtonAriaLabel : nextButtonAriaLabel}
				data-spotlight-overflow="ignore"
				disabled={disabled || nextButtonDisabled}
				key="nextButton"
				onClick={this.onClickNext}
				onHoldPulse={this.onClickNext}
				ref={this.nextButtonRef}
				icon={nextIcon}
			/>
		];
	}
}

export default ScrollButtons;
export {
	ScrollButtons
};
