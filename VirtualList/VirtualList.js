/**
 * Provides Agate-themed virtual list components and behaviors.
 *
 * @module agate/VirtualList
 * @exports VirtualGridList
 * @exports VirtualList
 */

import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {ResizeContext} from '@enact/ui/Resizable';
import {gridListItemSizeShape, itemSizesShape, VirtualListBasic as UiVirtualListBasic} from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import {useThemeVirtualList} from './useThemeVirtualList';

/**
 * An Agate-styled scrollable and spottable virtual list component.
 *
 * @class VirtualList
 * @memberof agate/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualList = ({itemSize, role, ...rest}) => {
	const props = itemSize && itemSize.minSize ?
		{
			itemSize: itemSize.minSize,
			itemSizes: itemSize.size
		} :
		{
			itemSize
		};

	warning(
		!rest.itemSizes || !rest.cbScrollTo,
		'VirtualList with `minSize` in `itemSize` prop does not support `cbScrollTo` prop'
	);

	// Hooks

	const {
		// Variables
		scrollContentWrapper: ScrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll({...rest, ...props});

	const themeScrollContentProps = useThemeVirtualList({
		...scrollContentProps,
		focusableScrollbar: rest.focusableScrollbar,
		role
	});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiVirtualListBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
					{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				</div>
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
		</ResizeContext.Provider>
	);
};

VirtualList.displayName = 'VirtualList';

VirtualList.propTypes = /** @lends agate/VirtualList.VirtualList.prototype */ {
	/**
	 * Size of an item for the VirtualList; valid value is a number generally.
	 * For different item size, value is an object that has `minSize`
	 * and `size` as properties.
	 * If the direction for the list is vertical, itemSize means the height of an item.
	 * For horizontal, it means the width of an item.
	 *
	 * Usage:
	 * ```
	 * <VirtualList itemSize={ri.scale(144)} />
	 * ```
	 *
	 * @type {Number|ui/VirtualList.itemSizesShape}
	 * @required
	 * @public
	 */
	itemSize: PropTypes.oneOfType([PropTypes.number, itemSizesShape]).isRequired,

	/**
	 * This is set to `true` by SpotlightContainerDecorator
	 *
	 * @type {Boolean}
	 * @private
	 */
	'data-spotlight-container': PropTypes.bool,

	/**
	 * `false` if the content of the list could get focus
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
	 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
	 * not move focus to the scrollbar controls.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	focusableScrollbar: PropTypes.bool,

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `VirtualList` is within a [Panel]{@link sandstone/Panels.Panel},
	 * the `VirtualList` will store its scroll position and restore that position when returning to
	 * the `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prop to check if horizontal Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isHorizontalScrollbarVisible: PropTypes.bool,

	/**
	 * Prop to check if vertical Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isVerticalScrollbarVisible: PropTypes.bool,


	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: false,
	 *	pageKey: false,
	 *	scrollbarButton: false,
	 *	wheel: true
	 * }
	 * @private
	 */
	overscrollEffectOn: PropTypes.shape({
		arrowKey: PropTypes.bool,
		drag: PropTypes.bool,
		pageKey: PropTypes.bool,
		scrollbarButton: PropTypes.bool,
		wheel: PropTypes.bool
	}),

	/**
	 * Specifies preventing keydown events from bubbling up to applications.
	 * Valid values are `'none'`, and `'programmatic'`.
	 *
	 * When it is `'none'`, every keydown event is bubbled.
	 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
	 * which invokes programmatic spotlight moving.
	 *
	 * @type {String}
	 * @default 'programmatic'
	 * @private
	 */
	preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

	/**
	 * The ARIA role for the list.
	 *
	 * @type {String}
	 * @default 'list'
	 * @public
	 */
	role: PropTypes.string,

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

	/**
	 * Spotlight Id.
	 *
	 * @type {String}
	 * @private
	 */
	spotlightId: PropTypes.string,

	/**
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * @type {Boolean|String}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualList.defaultProps = {
	'data-spotlight-container-disabled': false,
	dataSize: 0,
	direction: 'vertical',
	focusableScrollbar: false,
	horizontalScrollbar: 'auto',
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		scrollbarButton: false,
		wheel: true
	},
	pageScroll: false,
	preventBubblingOnKeyDown: 'programmatic',
	role: 'list',
	scrollMode: 'translate',
	spacing: 0,
	verticalScrollbar: 'auto',
	wrap: false
};

VirtualList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualList
		)
	)
);

/**
 * An Agate-styled scrollable and spottable virtual grid list component.
 *
 * @class VirtualGridList
 * @memberof agate/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @public
 */
let VirtualGridList = ({role, ...rest}) => {
	const {
		// Variables
		scrollContentWrapper: ScrollContentWrapper,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		// Child Props
		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(rest);

	const themeScrollContentProps = useThemeVirtualList({
		...scrollContentProps,
		focusableScrollbar: rest.focusableScrollbar,
		role
	});

	return (
		<ResizeContext.Provider {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiVirtualListBasic {...themeScrollContentProps} />
					</ScrollContentWrapper>
					{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				</div>
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
		</ResizeContext.Provider>
	);
};

VirtualGridList.displayName = 'VirtualGridList';

VirtualGridList.propTypes = /** @lends agate/VirtualList.VirtualGridList.prototype */ {
	/**
	 * Size of an item for the VirtualGridList; valid value is an object that has `minWidth`
	 * and `minHeight` as properties.
	 *
	 * Usage:
	 * ```
	 * <VirtualGridList
	 * 	itemSize={{
	 * 		minWidth: ri.scale(360),
	 * 		minHeight: ri.scale(540)
	 * 	}}
	 * />
	 * ```
	 *
	 * @type {ui/VirtualList.gridListItemSizeShape}
	 * @required
	 * @public
	 */
	itemSize: gridListItemSizeShape.isRequired,

	/**
	 * This is set to `true` by SpotlightContainerDecorator
	 *
	 * @type {Boolean}
	 * @private
	 */
	'data-spotlight-container': PropTypes.bool,

	/**
	 * `false` if the content of the list could get focus
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
	 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
	 * not move focus to the scrollbar controls.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	focusableScrollbar: PropTypes.bool,

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `VirtualGridList` is within a [Panel]{@link sandstone/Panels.Panel},
	 * the `VirtualGridList` will store its scroll position and restore that position when returning to
	 * the `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prop to check if horizontal Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isHorizontalScrollbarVisible: PropTypes.bool,

	/**
	 * Prop to check if vertical Scrollbar exists or not.
	 *
	 * @type {Boolean}
	 * @private
	 */
	isVerticalScrollbarVisible: PropTypes.bool,

	/**
	 * Specifies overscroll effects shows on which type of inputs.
	 *
	 * @type {Object}
	 * @default {
	 *	arrowKey: false,
	 *	drag: false,
	 *	pageKey: false,
	 *	scrollbarButton: false,
	 *	wheel: true
	 * }
	 * @private
	 */
	overscrollEffectOn: PropTypes.shape({
		arrowKey: PropTypes.bool,
		drag: PropTypes.bool,
		pageKey: PropTypes.bool,
		scrollbarButton: PropTypes.bool,
		wheel: PropTypes.bool
	}),

	/**
	 * Specifies preventing keydown events from bubbling up to applications.
	 * Valid values are `'none'`, and `'programmatic'`.
	 *
	 * When it is `'none'`, every keydown event is bubbled.
	 * When it is `'programmatic'`, an event bubbling is not allowed for a keydown input
	 * which invokes programmatic spotlight moving.
	 *
	 * @type {String}
	 * @default 'programmatic'
	 * @private
	 */
	preventBubblingOnKeyDown: PropTypes.oneOf(['none', 'programmatic']),

	/**
	 * The ARIA role for the list.
	 *
	 * @type {String}
	 * @default 'list'
	 * @public
	 */
	role: PropTypes.string,

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

	/**
	 * Spotlight Id.
	 *
	 * @type {String}
	 * @private
	 */
	spotlightId: PropTypes.string,

	/**
	 * When it's `true` and the spotlight focus cannot move to the given direction anymore by 5-way keys,
	 * a list is scrolled with an animation to the other side and the spotlight focus moves in wraparound manner.
	 *
	 * When it's `'noAnimation'`, the spotlight focus moves in wraparound manner as same as when it's `true`
	 * except that a list is scrolled without an animation.
	 *
	 * @type {Boolean|String}
	 * @default false
	 * @public
	 */
	wrap: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.oneOf(['noAnimation'])
	])
};

VirtualGridList.defaultProps = {
	'data-spotlight-container-disabled': false,
	dataSize: 0,
	direction: 'vertical',
	focusableScrollbar: false,
	horizontalScrollbar: 'auto',
	overscrollEffectOn: {
		arrowKey: false,
		drag: false,
		pageKey: false,
		scrollbarButton: false,
		wheel: true
	},
	pageScroll: false,
	preventBubblingOnKeyDown: 'programmatic',
	role: 'list',
	scrollMode: 'translate',
	spacing: 0,
	verticalScrollbar: 'auto',
	wrap: false
};

VirtualGridList = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			VirtualGridList
		)
	)
);

export default VirtualList;
export {
	VirtualGridList,
	VirtualList
};
