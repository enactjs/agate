import PropTypes from 'prop-types';
import {Component} from 'react';

class VirtualListCore extends Component {
	displayName = 'VirtualListBasic'

	static propTypes = /** @lends agate/VirtualList.VirtualListBasic.prototype */ {
		/**
		 * The `render` function called for each item in the list.
		 *
		 * > NOTE: The list does NOT always render a component whenever its render function is called
		 * due to performance optimization.
		 *
		 * Usage:
		 * ```
		 * renderItem = ({index, ...rest}) => {
		 * 	return (
		 * 		<MyComponent index={index} {...rest} />
		 * 	);
		 * }
		 * ```
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @param {Number} event.data-index It is required for Spotlight 5-way navigation. Pass to the root element in the component.
		 * @param {Number} event.index The index number of the component to render
		 * @param {Number} event.key It MUST be passed as a prop to the root element in the component for DOM recycling.
		 *
		 * @required
		 * @public
		 */
		itemRenderer: PropTypes.func.isRequired,

		/**
		 * The render function for the items.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		itemsRenderer: PropTypes.func.isRequired,

		/**
		 * Callback method of scrollTo.
		 * Normally, [Scrollable]{@link ui/Scrollable.Scrollable} should set this value.
		 *
		 * @type {Function}
		 * @private
		 */
		cbScrollTo: PropTypes.func,

		/**
		 * Size of the data.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		dataSize: PropTypes.number,

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
		 * The array for individually sized items.
		 *
		 * @type {Number[]}
		 * @private
		 */
		itemSizes: PropTypes.array,

		/**
		 * It scrolls by page when `true`, by item when `false`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @private
		 */
		pageScroll: PropTypes.bool,

		/**
		 * The ARIA role for the list.
		 *
		 * @type {String}
		 * @default 'list'
		 * @public
		 */
		role: PropTypes.string,

		/**
		 * `true` if rtl, `false` if ltr.
		 * Normally, [Scrollable]{@link ui/Scrollable.Scrollable} should set this value.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Spacing between items.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		spacing: PropTypes.number,

		/**
		 * Spotlight Id. It would be the same with [Scrollable]{@link ui/Scrollable.Scrollable}'s.
		 *
		 * @type {String}
		 * @private
		 */
		spotlightId: PropTypes.string,

		/**
		 * TBD
		 */
		type: PropTypes.string,

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
	}

	static defaultProps = {
		dataSize: 0,
		focusableScrollbar: false,
		pageScroll: false,
		spacing: 0,
		type: 'JS',
		wrap: false
	}
}

/**
 * An Agate-styled base component for [VirtualList]{@link agate/VirtualList.VirtualList} and
 * [VirtualGridList]{@link agate/VirtualList.VirtualGridList}.
 *
 * @class VirtualListBasic
 * @memberof agate/VirtualList
 * @extends ui/VirtualList.VirtualListBasic
 * @ui
 * @private
 */
const VirtualListBasic = VirtualListCore;

/**
 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
 * not move focus to the scrollbar controls.
 *
 * @name focusableScrollbar
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {Boolean}
 * @default false
 * @private
 */

/**
 * Unique identifier for the component.
 *
 * When defined and when the `VirtualList` is within a [Panel]{@link agate/Panels.Panel},
 * the `VirtualList` will store its scroll position and restore that position when returning to
 * the `Panel`.
 *
 * @name id
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {String}
 * @private
 */

/**
 * Sets the hint string read when focusing the next button in the vertical scroll bar.
 *
 * @name scrollDownAriaLabel
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {String}
 * @default $L('scroll down')
 * @private
 */

/**
 * Sets the hint string read when focusing the previous button in the horizontal scroll bar.
 *
 * @name scrollLeftAriaLabel
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {String}
 * @default $L('scroll left')
 * @private
 */

/**
 * Sets the hint string read when focusing the next button in the horizontal scroll bar.
 *
 * @name scrollRightAriaLabel
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {String}
 * @default $L('scroll right')
 * @private
 */

/**
 * Sets the hint string read when focusing the previous button in the vertical scroll bar.
 *
 * @name scrollUpAriaLabel
 * @memberof agate/VirtualList.VirtualListBasic.prototype
 * @type {String}
 * @default $L('scroll up')
 * @private
 */

export default VirtualListBasic;
export {
	VirtualListBasic
};
