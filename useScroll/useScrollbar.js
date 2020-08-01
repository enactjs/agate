import {constants} from '@enact/ui/useScroll';

const {paginationPageMultiplier} = constants;

const useScrollbar = (props, instances) => {
	const {horizontalScrollbarHandle, scrollContainerHandle, verticalScrollbarHandle} = instances;

	const scrollbarProps = {
		cbAlertScrollbarTrack: alertScrollbarTrack,
		onNextScroll: onScrollbarButtonClick,
		onPrevScroll: onScrollbarButtonClick
	};

	// Functions

	function isScrollButtonFocused () {
		return (
			horizontalScrollbarHandle.current && horizontalScrollbarHandle.current.isOneOfScrollButtonsFocused() ||
			verticalScrollbarHandle.current && verticalScrollbarHandle.current.isOneOfScrollButtonsFocused()
		);
	}

	function onScrollbarButtonClick ({isPreviousScrollButton, isVerticalScrollBar}) {
		const
			{wheelDirection} = scrollContainerHandle.current,
			bounds = scrollContainerHandle.current.getScrollBounds(),
			direction = isPreviousScrollButton ? -1 : 1,
			pageDistance = direction * (isVerticalScrollBar ? bounds.clientHeight : bounds.clientWidth) * paginationPageMultiplier;

		scrollContainerHandle.current.lastInputType = 'scrollbarButton';

		if (direction !== wheelDirection) {
			scrollContainerHandle.current.isScrollAnimationTargetAccumulated = false;
			scrollContainerHandle.current.wheelDirection = direction;
		}

		scrollContainerHandle.current.scrollToAccumulatedTarget(pageDistance, isVerticalScrollBar);
	}

	function focusOnScrollButton (scrollbarHandle, isPreviousScrollButton) {
		if (scrollbarHandle.current) {
			scrollbarHandle.current.focusOnButton(isPreviousScrollButton);
		}
	}

	function scrollAndFocusScrollbarButton (direction) {
		if (scrollContainerHandle.current) {
			const
				{rtl} = scrollContainerHandle.current,
				isPreviousScrollButton = direction === 'up' || (rtl ? direction === 'right' : direction === 'left'),
				isHorizontalDirection = direction === 'left' || direction === 'right',
				isVerticalDirection = direction === 'up' || direction === 'down',
				canScrollHorizontally = isHorizontalDirection && (props.direction === 'horizontal' || props.direction === 'both'),
				canScrollingVertically = isVerticalDirection && (props.direction === 'vertical' || props.direction === 'both');

			if (canScrollHorizontally || canScrollingVertically) {
				onScrollbarButtonClick({
					isPreviousScrollButton,
					isVerticalScrollBar: canScrollingVertically
				});

				if (props.focusableScrollbar) {
					focusOnScrollButton(
						canScrollingVertically ? verticalScrollbarHandle : horizontalScrollbarHandle,
						isPreviousScrollButton
					);
				}
			}
		}
	}

	function alertScrollbarTrack () {
		const bounds = scrollContainerHandle.current.getScrollBounds();

		scrollContainerHandle.current.showScrollbarTrack(bounds);
		scrollContainerHandle.current.startHidingScrollbarTrack();
	}

	// Return

	return {
		alertScrollbarTrack,
		isScrollButtonFocused,
		onScrollbarButtonClick,
		scrollAndFocusScrollbarButton,
		scrollbarProps
	};
};

export default useScrollbar;
export {
	useScrollbar
};
