import {forward} from '@enact/core/handle';
import {getTargetByDirectionFromElement} from '@enact/spotlight/src/target';
import {is} from '@enact/core/keymap';
import Spotlight, {getDirection} from '@enact/spotlight';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

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
 * A custom hook that returns Agate-themed scroll buttons behavior. It is used in [Scrollbar]{@link agate/useScroll.Scrollbar}.
 *
 * @function useScrollButtons
 * @memberof agate/useScroll
 * @ui
 * @private
 */
const useScrollButtons = (props) => {
	const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
	const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

	const nextButtonRef = React.createRef();
	const prevButtonRef = React.createRef();

	useEffect(() => {
		utilEvent('keydown').addEventListener(nextButtonRef, onKeyDownNext);
		utilEvent('keydown').addEventListener(prevButtonRef, onKeyDownPrev);

		return () => {
			utilEvent('keydown').removeEventListener(nextButtonRef, onKeyDownNext);
			utilEvent('keydown').removeEventListener(prevButtonRef, onKeyDownPrev);
		};
	}, []);	// eslint-disable-line react-hooks/exhaustive-deps

	const updateButtons = (bounds) => {
		const
			{vertical} = props,
			currentPos = vertical ? bounds.scrollTop : bounds.scrollLeft,
			maxPos = vertical ? bounds.maxTop : bounds.maxLeft,
			shouldDisablePrevButton = currentPos <= 0,
			/* If a scroll size or a client size is not integer,
			   browser's max scroll position could be smaller than maxPos by 1 pixel.*/
			shouldDisableNextButton = maxPos - currentPos <= 1,
			updatePrevButton = (prevButtonDisabled !== shouldDisablePrevButton),
			updateNextButton = (nextButtonDisabled !== shouldDisableNextButton);

		if (updatePrevButton) {
			setPrevButtonDisabled(shouldDisablePrevButton);
		}
		if (updateNextButton) {
			setNextButtonDisabled(shouldDisableNextButton);
		}
	};

	function isOneOfScrollButtonsFocused () {
		const current = Spotlight.getCurrent();
		return current === prevButtonRef.current || current === nextButtonRef.current;
	}

	function onClickPrev (ev) {
		const {onPrevScroll = nop, vertical} = props;
		onPrevScroll({...ev, isPreviousScrollButton: true, isVerticalScrollBar: vertical});
	}

	function onClickNext (ev) {
		const {onNextScroll = nop, vertical} = props;
		onNextScroll({...ev, isPreviousScrollButton: false, isVerticalScrollBar: vertical});
	}

	function focusOnButton (isPrev) {
		Spotlight.focus(isPrev ? prevButtonRef.current : nextButtonRef.current);
	}

	function focusOnOppositeScrollButton (ev, direction) {
		const buttonNode = (ev.target === nextButtonRef.current) ? prevButtonRef.current : nextButtonRef.current;

		if (!Spotlight.focus(buttonNode)) {
			Spotlight.move(direction);
		}
	}

	function onKeyDownButton (ev, position) {
		const
			{focusableScrollButtons, vertical, preventBubblingOnKeyDown} = props,
			{keyCode} = ev,
			direction = getDirection(ev.keyCode),
			preventBubbling = preventBubblingOnKeyDown === 'programmatic',
			isNextButton = position === 'next',
			isPrevButton = position === 'prev',
			nextButton = {
				disabled: nextButtonDisabled,
				ref: nextButtonRef.current,
				click: onClickNext
			},
			prevButton = {
				disabled: prevButtonDisabled,
				ref: prevButtonRef.current,
				click: onClickPrev
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
				{rtl} = props,
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
					focusOnOppositeScrollButton(ev, direction);
					if (!preventBubbling) {
						forward('onKeyDownButton', ev, props);
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
	}

	function onKeyDownPrev (ev) {
		onKeyDownButton(ev, 'prev');
	}

	function onKeyDownNext (ev) {
		onKeyDownButton(ev, 'next');
	}

	return {
		focusOnButton,
		isOneOfScrollButtonsFocused,
		nextButtonDisabled,
		nextButtonRef,
		nextIcon: prepareNextButton(props.vertical),
		onClickNext,
		onClickPrev,
		prevButtonDisabled,
		prevButtonRef,
		prevIcon: preparePrevButton(props.vertical),
		updateButtons
	};
};

export default useScrollButtons;
export {
	useScrollButtons
};
