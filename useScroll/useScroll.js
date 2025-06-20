/**
 * Agate-themed scrollable hook and behaviors.
 *
 * @module agate/useScroll
 * @exports dataIndexAttribute
 * @exports useScroll
 * @private
 */

import {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import Spotlight from '@enact/spotlight';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import {useScrollBase} from '@enact/ui/useScroll';
import {assignPropertiesOf} from '@enact/ui/useScroll';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import {use, useRef} from 'react';

import $L from '../internal/$L';
import {SharedState} from '../Panels/SharedStateDecorator';

import {useThemeScrollContentHandle} from './useThemeScrollContentHandle';
import {
	useEventFocus, useEventKey, useEventMonitor, useEventMouse,
	useEventTouch, useEventWheel
} from './useEvent';
import useScrollbar from './useScrollbar';
import {useSpotlightConfig, useSpotlightRestore} from './useSpotlight';

const
	reverseDirections = {
		down: 'up',
		up: 'down'
	};

/**
 * The name of a custom attribute which indicates the index of an item in
 * {@link agate/VirtualList.VirtualList|VirtualList} or
 * {@link agate/VirtualList.VirtualGridList|VirtualGridList}.
 *
 * @constant dataIndexAttribute
 * @memberof agate/useScroll
 * @type {String}
 * @private
 */
const dataIndexAttribute = 'data-index';

const isIntersecting = (elem, container) => elem && intersects(getRect(container), getRect(elem));
const getIntersectingElement = (elem, container) => isIntersecting(elem, container) && elem;
const getTargetInViewByDirectionFromPosition = (direction, position, container) => {
	const target = getTargetByDirectionFromPosition(direction, position, Spotlight.getActiveContainer());
	return getIntersectingElement(target, container);
};

const useThemeScroll = (props, instances) => {
	const {scrollMode} = props;
	const {themeScrollContentHandle, scrollContentRef, scrollContainerHandle, scrollContainerRef} = instances;
	const contextSharedState = use(SharedState);

	// Mutable value

	const mutableRef = useRef({
		animateOnFocus: false,
		indexToFocus: null,
		isWheeling: false,
		lastScrollPositionOnFocus: null,
		nodeToFocus: null,
		pointToFocus: null
	});

	// Hooks

	const {
		alertScrollbarTrack,
		isScrollButtonFocused,
		scrollAndFocusScrollbarButton,
		scrollbarProps
	} = useScrollbar(props, instances);

	useSpotlightConfig(props);

	useSpotlightRestore(props, instances);

	const {handleWheel} = useEventWheel(props, {...instances, spottable: mutableRef}, {isScrollButtonFocused});

	const {calculateAndScrollTo, handleFocus, hasFocus} = useEventFocus(props, {...instances, spottable: mutableRef}, {alertScrollbarTrack});

	const {handleKeyDown, lastPointer, scrollByPageOnPointerMode} = useEventKey(props, {...instances, spottable: mutableRef}, {hasFocus, isContent});

	useEventMonitor({}, instances, {lastPointer, scrollByPageOnPointerMode});

	const {handleDragEnd, handleDragStart, handleFlick, handleMouseDown} = useEventMouse({}, instances, {isScrollButtonFocused});

	const {handleTouchStart} = useEventTouch({}, instances, {isScrollButtonFocused});

	// Functions

	function isContent (element) {
		return (element && utilDOM.containsDangerously(scrollContentRef, element));
	}

	function scrollTo (opt) {
		mutableRef.current.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		mutableRef.current.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	}

	function start (animate) {
		if (scrollMode === 'native' && !animate) {
			focusOnItem();
		}
	}

	function stop () {
		if (mutableRef.current.isDragging && !mutableRef.current.isFlicked) return;

		if (!props['data-spotlight-container-disabled'] || mutableRef.current.isFlicked || mutableRef.current.isWheeling) {
			themeScrollContentHandle.current.setContainerDisabled(false);
		}

		if (themeScrollContentHandle.current.pauseSpotlight) {
			themeScrollContentHandle.current.pauseSpotlight(false);
		}

		focusOnItem();
		mutableRef.current.lastScrollPositionOnFocus = null;
		mutableRef.current.isFlicked = false;
		mutableRef.current.isWheeling = false;
	}

	function scrollStopOnScroll () {
		stop();
	}

	function focusOnItem () {
		if (mutableRef.current.indexToFocus !== null && typeof themeScrollContentHandle.current.focusByIndex === 'function') {
			themeScrollContentHandle.current.focusByIndex(mutableRef.current.indexToFocus);
			mutableRef.current.indexToFocus = null;
		}

		if (mutableRef.current.nodeToFocus !== null && typeof themeScrollContentHandle.current.focusOnNode === 'function') {
			themeScrollContentHandle.current.focusOnNode(mutableRef.current.nodeToFocus);
			mutableRef.current.nodeToFocus = null;
		}

		if (mutableRef.current.pointToFocus !== null) {
			// no need to focus on pointer mode
			if (!Spotlight.getPointerMode()) {
				const
					{direction, x, y} = mutableRef.current.pointToFocus,
					position = {x, y},
					elemFromPoint = document.elementFromPoint(x, y),
					target =
						elemFromPoint && elemFromPoint.closest && getIntersectingElement(elemFromPoint.closest(`.${spottableClass}`), scrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(direction, position, scrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(reverseDirections[direction], position, scrollContainerRef.current);

				if (target) {
					Spotlight.focus(target);
				}
			}

			mutableRef.current.pointToFocus = null;
		}
	}

	function handleScroll (ev) {
		const
			{scrollLeft: x, scrollTop: y} = ev,
			{id} = props;

		forward('onScroll', ev, props);

		if (id && contextSharedState && contextSharedState.set) {
			contextSharedState.set(ev, props);
			contextSharedState.set(`${id}.scrollPosition`, {x, y});
		}
	}

	// Callback for scroller updates; calculate and, if needed, scroll to new position based on focused item.
	function handleScrollerUpdate () {
		if (scrollContainerHandle.current.scrollToInfo === null) {
			const scrollHeight = scrollContainerHandle.current.getScrollBounds().scrollHeight;

			if (scrollHeight !== scrollContainerHandle.current.bounds.scrollHeight) {
				calculateAndScrollTo();
			}
		}

		// oddly, Scroller manages scrollContainerHandle.current.bounds so if we don't update it here (it is also
		// updated in calculateAndScrollTo, but we might not have made it to that point), it will be
		// out of date when we land back in this method next time.
		scrollContainerHandle.current.bounds.scrollHeight = scrollContainerHandle.current.getScrollBounds().scrollHeight;
	}

	function handleResizeWindow () {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function addEventListeners (ref) { // `ref` is always `scrollContentRef`.
		utilEvent('focusin').addEventListener(ref, handleFocus);
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function removeEventListeners (ref) { // `ref` is always `scrollContentRef`.
		utilEvent('focusin').removeEventListener(ref, handleFocus);
	}

	// Return

	return {
		addEventListeners,
		handleDragEnd,
		handleDragStart,
		handleFlick,
		handleKeyDown,
		handleMouseDown,
		handleResizeWindow,
		handleScroll,
		handleScrollerUpdate,
		handleTouchStart,
		handleWheel,
		removeEventListeners,
		scrollAndFocusScrollbarButton,
		scrollbarProps,
		scrollStopOnScroll,
		scrollTo,
		start,
		stop
	};
};

/**
 * A custom hook that passes Agate-themed scrollable behavior information as its render prop.
 *
 * @class
 * @memberof agate/useScroll
 * @ui
 * @private
 */
const useScroll = (props) => {
	const
		{
			'data-spotlight-container': spotlightContainer,
			'data-spotlight-container-disabled': spotlightContainerDisabled,
			'data-spotlight-id': spotlightId,
			focusableScrollbar,
			preventBubblingOnKeyDown,
			scrollDownAriaLabel,
			scrollLeftAriaLabel,
			scrollMode,
			scrollRightAriaLabel,
			scrollUpAriaLabel,
			...rest
		} = props,
		downButtonAriaLabel = scrollDownAriaLabel == null ? $L('scroll down') : scrollDownAriaLabel,
		upButtonAriaLabel = scrollUpAriaLabel == null ? $L('scroll up') : scrollUpAriaLabel,
		rightButtonAriaLabel = scrollRightAriaLabel == null ? $L('scroll right') : scrollRightAriaLabel,
		leftButtonAriaLabel = scrollLeftAriaLabel == null ? $L('scroll left') : scrollLeftAriaLabel;

	// Mutable value

	const scrollContainerRef = useRef();
	const scrollContentHandle = useRef();
	const scrollContentRef = useRef();
	const itemRefs = useRef([]);

	const horizontalScrollbarHandle = useRef();
	const verticalScrollbarHandle = useRef();

	// Handles

	const [themeScrollContentHandle, setThemeScrollContentHandle] = useThemeScrollContentHandle();

	const scrollContainerHandle = useRef({}); // To prevent referencing errors before calling `setScrollContainerHandle`, an empty object is provided as a default.
	/* Properties in `scrollContainerHandle` provided by `setScrollContainerHandle`
		animator
		bounds
		calculateDistanceByWheel
		canScrollHorizontally
		canScrollVertically
		getScrollBounds
		isDragging
		isFlicked
		isScrollAnimationTargetAccumulated
		lastInputType
		rtl
		scrollBounds
		scrollHeight
		scrolling
		scrollLeft
		scrollTo
		scrollToAccumulatedTarget
		scrollToInfo
		scrollTop
		showScrollbarTrack
		start
		startHidingScrollbarTrack
		stop
		wheelDirection
	*/

	const setScrollContainerHandle = (handle) => {
		scrollContainerHandle.current = handle;
	};

	// Hooks

	const instance = {
		// Ref
		scrollContainerRef,
		scrollContentRef,

		// Handle
		themeScrollContentHandle,
		scrollContainerHandle,
		scrollContentHandle,
		horizontalScrollbarHandle,
		verticalScrollbarHandle
	};

	const
		collectionOfProperties = {},
		assignProperties = assignPropertiesOf(collectionOfProperties),
		scrollProps = {};

	const {
		addEventListeners,
		handleDragEnd,
		handleDragStart,
		handleFlick,
		handleKeyDown,
		handleMouseDown,
		handleResizeWindow,
		handleScroll,
		handleScrollerUpdate,
		handleTouchStart,
		handleWheel,
		removeEventListeners,
		scrollAndFocusScrollbarButton,
		scrollbarProps,
		scrollStopOnScroll, // scrollMode 'native'
		scrollTo,
		start, // scrollMode 'native'
		stop // scrollMode 'translate'
	} = useThemeScroll(props, instance);

	// Render

	if (scrollMode === 'translate') {
		scrollProps.stop = stop;
	} else {
		scrollProps.scrollStopOnScroll = scrollStopOnScroll;
		scrollProps.start = start;
	}

	const {
		scrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	} = useScrollBase({
		...rest,
		...scrollProps,
		assignProperties,
		noScrollByDrag: !platform.touchScreen,
		addEventListeners,
		handleResizeWindow,
		horizontalScrollbarHandle,
		onDragEnd: handleDragEnd,
		onDragStart: handleDragStart,
		onFlick: handleFlick,
		onKeyDown: handleKeyDown,
		onMouseDown: handleMouseDown,
		onScroll: handleScroll,
		onWheel: handleWheel,
		removeEventListeners,
		scrollTo,
		setScrollContainerHandle,
		scrollMode,
		scrollContentHandle,
		scrollContentRef,
		scrollContainerRef,
		spotlightContainerDisabled,
		verticalScrollbarHandle
	});

	assignProperties('scrollContainerProps', {
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart,
		ref: scrollContainerRef
	});

	assignProperties('scrollContentProps', {
		...(props.itemRenderer ? {itemRefs} : {}),
		onUpdate: handleScrollerUpdate,
		scrollContainerRef,
		scrollAndFocusScrollbarButton,
		setThemeScrollContentHandle,
		spotlightId,
		scrollContainerHandle,
		scrollContentHandle,
		scrollContentRef
	});

	assignProperties('verticalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: downButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: upButtonAriaLabel,
		scrollbarHandle: verticalScrollbarHandle
	});

	assignProperties('horizontalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: rightButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: leftButtonAriaLabel,
		scrollbarHandle: horizontalScrollbarHandle
	});

	return {
		...collectionOfProperties,
		scrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

export default useScroll;
export {
	dataIndexAttribute,
	useScroll
};
