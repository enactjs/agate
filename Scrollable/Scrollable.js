/**
 * Provides Agate-themed scrollable components and behaviors.
 *
 * @module agate/Scrollable
 * @exports Scrollable
 * @private
 */

import {forward} from '@enact/core/handle';
import platform from '@enact/core/platform';
import Spotlight from '@enact/spotlight';
import {spottableClass} from '@enact/spotlight/Spottable';
import {getTargetByDirectionFromPosition} from '@enact/spotlight/src/target';
import {getRect, intersects} from '@enact/spotlight/src/utils';
import {useScrollBase} from '@enact/ui/useScroll';
import {useChildAdapter as useUiChildAdapter} from '@enact/ui/useScroll/useChild';
import {utilDecorateChildProps} from '@enact/ui/useScroll';
import utilDOM from '@enact/ui/useScroll/utilDOM';
import utilEvent from '@enact/ui/useScroll/utilEvent';
import PropTypes from 'prop-types';
import {Component, useContext, useRef} from 'react';

import $L from '../internal/$L';
import {SharedState} from '../Panels/SharedStateDecorator';

import {useChildAdapter} from './useChild';
import {
	useEventFocus, useEventKey, useEventMonitor, useEventMouse,
	useEventTouch, useEventVoice, useEventWheel
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
 * [VirtualList]{@link agate/VirtualList.VirtualList} or
 * [VirtualGridList]{@link agate/VirtualList.VirtualGridList}.
 *
 * @constant dataIndexAttribute
 * @memberof agate/Scrollable
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

/**
 * An Agate-styled component that provides horizontal and vertical scrollbars.
 *
 * @class ScrollableBase
 * @memberof agate/Scrollable
 * @extends ui/Scrollable.ScrollableBase
 * @ui
 * @public
 */
class ScrollableBase extends Component { // ScrollableBase is now only used in storybook.
	static displayName = 'Scrollable'

	static propTypes = /** @lends agate/Scrollable.Scrollable.prototype */ {
		/**
		 * Render function.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		childRenderer: PropTypes.func.isRequired,

		/**
		 * This is set to `true` by SpotlightContainerDecorator
		 *
		 * @type {Boolean}
		 * @private
		 */
		'data-spotlight-container': PropTypes.bool,

		/**
		 * `false` if the content of the list or the scroller could get focus
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		'data-spotlight-container-disabled': PropTypes.bool,

		/**
		 * This is passed onto the wrapped component to allow
		 * it to customize the spotlight container for its use case.
		 *
		 * @type {String}
		 * @private
		 */
		'data-spotlight-id': PropTypes.string,

		/**
		 * Direction of the list or the scroller.
		 * `'both'` could be only used for[Scroller]{@link agate/Scroller.Scroller}.
		 *
		 * Valid values are:
		 * * `'both'`,
		 * * `'horizontal'`, and
		 * * `'vertical'`.
		 *
		 * @type {String}
		 * @private
		 */
		direction: PropTypes.oneOf(['both', 'horizontal', 'vertical']),

		/**
		 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
		 * not move focus to the scrollbar controls.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		focusableScrollbar: PropTypes.bool,

		/**
		 * A unique identifier for the scrollable component.
		 *
		 * When specified and when the scrollable is within a SharedStateDecorator, the scroll
		 * position will be shared and restored on mount if the component is destroyed and
		 * recreated.
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Specifies preventing keydown events from bubbling up to applications.
		 * Valid values are `'none'`, and `'programmatic'`.
		 *
		 * When it is `'none'`, every keydown event is bubbled.
		 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
		 * which invokes programmatic spotlight moving.
		 *
		 * @type {String}
		 * @default 'none'
		 * @private
		 */
		preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

		/**
		 * Sets the hint string read when focusing the next button in the vertical scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll down')
		 * @public
		 */
		scrollDownAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the previous button in the horizontal scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll left')
		 * @public
		 */
		scrollLeftAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the next button in the horizontal scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll right')
		 * @public
		 */
		scrollRightAriaLabel: PropTypes.string,

		/**
		 * Sets the hint string read when focusing the previous button in the vertical scroll bar.
		 *
		 * @type {String}
		 * @default $L('scroll up')
		 * @public
		 */
		scrollUpAriaLabel: PropTypes.string,

		/*
		 * TBD
		 */
		type: PropTypes.string
	}

	static defaultProps = {
		'data-spotlight-container-disabled': false,
		focusableScrollbar: false,
		preventBubblingOnKeyDown: 'none',
		type: 'JS'
	}
}

const useSpottableScroll = (props, instances, context) => {
	const {childAdapter, uiChildContainerRef, uiScrollAdapter, uiScrollContainerRef} = instances;
	const {type} = context;
	const contextSharedState = useContext(SharedState);

	// Mutable value

	const mutableRef = useRef({
		animateOnFocus: false,
		indexToFocus: null,
		lastScrollPositionOnFocus: null,
		nodeToFocus: null,
		pointToFocus: null
	});

	// Hooks

	const {
		alertThumb,
		isScrollButtonFocused,
		onScrollbarButtonClick,
		scrollAndFocusScrollbarButton,
		scrollbarProps
	} = useScrollbar(props, instances, {isContent});

	useSpotlightConfig(props);

	useSpotlightRestore(props, instances);

	const {handleWheel, isWheeling} = useEventWheel(props, instances, {isScrollButtonFocused, type});

	const {calculateAndScrollTo, handleFocus, hasFocus} = useEventFocus(props, {...instances, spottable: mutableRef}, {alertThumb, isWheeling, type});

	const {handleKeyDown, lastPointer, scrollByPageOnPointerMode} = useEventKey(props, {...instances, spottable: mutableRef}, {hasFocus, isContent, type});

	useEventMonitor({}, instances, {lastPointer, scrollByPageOnPointerMode});

	const {handleDragEnd, handleDragStart, handleFlick, handleMouseDown} = useEventMouse({}, instances, {isScrollButtonFocused, type});

	const {handleTouchStart} = useEventTouch({}, instances, {isScrollButtonFocused});

	const {
		addVoiceEventListener,
		removeVoiceEventListener,
		stopVoice
	} = useEventVoice(props, instances, {onScrollbarButtonClick});

	// Functions

	function isContent (element) {
		return (element && utilDOM.containsDangerously(uiChildContainerRef, element));
	}

	function scrollTo (opt) {
		mutableRef.current.indexToFocus = (opt.focus && typeof opt.index === 'number') ? opt.index : null;
		mutableRef.current.nodeToFocus = (opt.focus && opt.node instanceof Object && opt.node.nodeType === 1) ? opt.node : null;
	}

	function start (animate) {
		if (type === 'Native' && !animate) {
			focusOnItem();
		}
	}

	function stop () {
		if (mutableRef.current.isDragging && !mutableRef.current.isFlicked) return;

		if (!props['data-spotlight-container-disabled'] || mutableRef.current.isFlicked || mutableRef.current.isWheeling) {
			childAdapter.current.setContainerDisabled(false);
		}

		focusOnItem();
		mutableRef.current.lastScrollPositionOnFocus = null;
		mutableRef.current.isFlicked = false;
		mutableRef.current.isWheeling = false;
		stopVoice();
	}

	function scrollStopOnScroll () {
		stop();
	}

	function focusOnItem () {
		if (mutableRef.current.indexToFocus !== null && typeof childAdapter.current.focusByIndex === 'function') {
			childAdapter.current.focusByIndex(mutableRef.current.indexToFocus);
			mutableRef.current.indexToFocus = null;
		}

		if (mutableRef.current.nodeToFocus !== null && typeof childAdapter.current.focusOnNode === 'function') {
			childAdapter.current.focusOnNode(mutableRef.current.nodeToFocus);
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
						elemFromPoint && elemFromPoint.closest && getIntersectingElement(elemFromPoint.closest(`.${spottableClass}`), uiScrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(direction, position, uiScrollContainerRef.current) ||
						getTargetInViewByDirectionFromPosition(reverseDirections[direction], position, uiScrollContainerRef.current);

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
		if (uiScrollAdapter.current.scrollToInfo === null) {
			const scrollHeight = uiScrollAdapter.current.getScrollBounds().scrollHeight;

			if (scrollHeight !== uiScrollAdapter.current.bounds.scrollHeight) {
				calculateAndScrollTo();
			}
		}

		// oddly, Scroller manages uiScrollAdapter.current.bounds so if we don't update it here (it is also
		// updated in calculateAndScrollTo but we might not have made it to that point), it will be
		// out of date when we land back in this method next time.
		uiScrollAdapter.current.bounds.scrollHeight = uiScrollAdapter.current.getScrollBounds().scrollHeight;
	}

	function handleResizeWindow () {
		const focusedItem = Spotlight.getCurrent();

		if (focusedItem) {
			focusedItem.blur();
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function addEventListeners (ref) { // `ref` is always `uiChildContainerRef`.
		utilEvent('focusin').addEventListener(ref, handleFocus);

		if (ref.current) {
			addVoiceEventListener(ref);
		}
	}

	// FIXME setting event handlers directly to work on the V8 snapshot.
	function removeEventListeners (ref) { // `ref` is always `uiChildContainerRef`.
		utilEvent('focusin').removeEventListener(ref, handleFocus);

		if (ref.current) {
			removeVoiceEventListener(ref);
		}
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

const useScroll = (props) => {
	const {
			'data-spotlight-container': spotlightContainer,
			'data-spotlight-container-disabled': spotlightContainerDisabled,
			'data-spotlight-id': spotlightId,
			focusableScrollbar,
			preventBubblingOnKeyDown,
			scrollDownAriaLabel,
			scrollLeftAriaLabel,
			scrollRightAriaLabel,
			scrollUpAriaLabel,
			type,
			...rest
		} = props,
		downButtonAriaLabel = scrollDownAriaLabel == null ? $L('scroll down') : scrollDownAriaLabel,
		upButtonAriaLabel = scrollUpAriaLabel == null ? $L('scroll up') : scrollUpAriaLabel,
		rightButtonAriaLabel = scrollRightAriaLabel == null ? $L('scroll right') : scrollRightAriaLabel,
		leftButtonAriaLabel = scrollLeftAriaLabel == null ? $L('scroll left') : scrollLeftAriaLabel;

	// Mutable value

	const uiScrollContainerRef = useRef();
	const uiChildContainerRef = useRef();

	const horizontalScrollbarRef = useRef();
	const verticalScrollbarRef = useRef();

	// Adapters

	const [childAdapter, setChildAdapter] = useChildAdapter();

	const uiScrollAdapter = useRef({
		animator: null,
		bounds: null,
		calculateDistanceByWheel: null,
		canScrollHorizontally: null,
		canScrollVertically: null,
		getScrollBounds: null,
		isDragging: null,
		isFlicked: null,
		isScrollAnimationTargetAccumulated: null,
		isUpdatedScrollThumb: null,
		lastInputType: null,
		rtl: null,
		scrollBounds: null,
		scrollHeight: null,
		scrolling: null,
		scrollLeft: null,
		scrollPos: null,
		scrollTo: null,
		scrollToAccumulatedTarget: null,
		scrollToInfo: null,
		scrollTop: null,
		showThumb: null,
		start: null,
		startHidingThumb: null,
		stop: null,
		wheelDirection: null
	});

	const setUiScrollAdapter = (adapter) => {
		uiScrollAdapter.current = adapter;
	};

	const [uiChildAdapter, setUiChildAdapter] = useUiChildAdapter();

	// Hooks

	const instance = {
		// Ref
		uiScrollContainerRef,
		uiChildContainerRef,
		horizontalScrollbarRef,
		verticalScrollbarRef,

		// Adapter
		childAdapter,
		uiScrollAdapter,
		uiChildAdapter
	};

	const
		decoratedChildProps = {},
		decorateChildProps = utilDecorateChildProps(decoratedChildProps),
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
		scrollStopOnScroll, // Native
		scrollTo,
		start, // Native
		stop // JS
	} = useSpottableScroll(props, instance, {type});

	// Render

	if (type === 'JS') {
		scrollProps.stop = stop;
	} else {
		scrollProps.scrollStopOnScroll = scrollStopOnScroll;
		scrollProps.start = start;
	}

	decorateChildProps('scrollContainerProps', {
		'data-spotlight-container': spotlightContainer,
		'data-spotlight-container-disabled': spotlightContainerDisabled,
		'data-spotlight-id': spotlightId,
		onTouchStart: handleTouchStart
	});

	decorateChildProps('childProps', {
		onUpdate: handleScrollerUpdate,
		scrollAndFocusScrollbarButton,
		setChildAdapter,
		spotlightId,
		uiScrollAdapter
	});

	decorateChildProps('verticalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: downButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: upButtonAriaLabel
	});

	decorateChildProps('horizontalScrollbarProps', {
		...scrollbarProps,
		focusableScrollButtons: focusableScrollbar,
		nextButtonAriaLabel: rightButtonAriaLabel,
		onKeyDownButton: handleKeyDown,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel: leftButtonAriaLabel
	});

	const {
		childWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	} = useScrollBase({
		...rest,
		...scrollProps,
		decorateChildProps,
		noScrollByDrag: !platform.touchscreen,
		addEventListeners,
		handleResizeWindow,
		horizontalScrollbarRef,
		onDragEnd: handleDragEnd,
		onDragStart: handleDragStart,
		onFlick: handleFlick,
		onKeyDown: handleKeyDown,
		onMouseDown: handleMouseDown,
		onScroll: handleScroll,
		onWheel: handleWheel,
		removeEventListeners,
		scrollTo,
		setUiChildAdapter,
		setUiScrollAdapter,
		type,
		uiChildAdapter,
		uiChildContainerRef,
		uiScrollContainerRef,
		verticalScrollbarRef
	});

	decorateChildProps('scrollContainerProps', {ref: uiScrollContainerRef});
	decorateChildProps('childProps', {uiChildAdapter, uiChildContainerRef});
	decorateChildProps('verticalScrollbarProps', {ref: verticalScrollbarRef});
	decorateChildProps('horizontalScrollbarProps', {ref: horizontalScrollbarRef});

	decorateChildProps('innerScrollContainerProps', {});
	decorateChildProps('childWrapperProps', {});

	return {
		...decoratedChildProps,
		childWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible
	};
};

/**
 * An Agate-styled component that provides horizontal and vertical scrollbars.
 *
 * @class Scrollable
 * @memberof agate/Scrollable
 * @mixes spotlight/SpotlightContainerDecorator
 * @extends agate/Scrollable.ScrollableBase
 * @ui
 * @public
 */

export default useScroll;
export {
	dataIndexAttribute,
	ScrollableBase as Scrollable,
	ScrollableBase,
	useScroll
};
