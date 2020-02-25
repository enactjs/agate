import PropTypes from 'prop-types';
import {Component} from 'react';

/**
 * An Agate-styled base component for [Scroller]{@link agate/Scroller.Scroller}.
 * In most circumstances, you will want to use the
 * [SpotlightContainerDecorator]{@link spotlight/SpotlightContainerDecorator.SpotlightContainerDecorator}
 * and the Scrollable version, [Scroller]{@link agate/Scroller.Scroller}.
 *
 * @class ScrollerBasic
 * @memberof agate/Scroller
 * @extends ui/Scroller.ScrollerBasic
 * @ui
 * @private
 */
class ScrollerBasic extends Component {
	static displayName = 'ScrollerBasic'

	static propTypes = /** @lends agate/Scroller.ScrollerBasic.prototype */ {
		/**
		 * Passes the instance of [Scroller]{@link ui/Scroller.Scroller}.
		 *
		 * @type {Object}
		 * @param {Object} ref
		 * @private
		 */
		initUiChildRef: PropTypes.func,

		/**
		 * Called when [Scroller]{@link agate/Scroller.Scroller} updates.
		 *
		 * @type {function}
		 * @private
		 */
		onUpdate: PropTypes.func,

		/**
		 * `true` if rtl, `false` if ltr.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Called when [Scroller]{@link agate/Scroller.Scroller} should be scrolled
		 * and the focus should be moved to a scrollbar button.
		 *
		 * @type {function}
		 * @private
		 */
		scrollAndFocusScrollbarButton: PropTypes.func,

		/**
		 * The spotlight id for the component.
		 *
		 * @type {String}
		 * @private
		 */
		spotlightId: PropTypes.string
	}
}

/**
 * Allows 5-way navigation to the scrollbar controls. By default, 5-way will
 * not move focus to the scrollbar controls.
 *
 * @name focusableScrollbar
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {Boolean}
 * @default false
 * @private
 */

/**
 * Unique identifier for the component.
 *
 * When defined and when the `Scroller` is within a [Panel]{@link agate/Panels.Panel}, the
 * `Scroller` will store its scroll position and restore that position when returning to the
 * `Panel`.
 *
 * @name id
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @private
 */

/**
 * Sets the hint string read when focusing the next button in the vertical scroll bar.
 *
 * @name scrollDownAriaLabel
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @default $L('scroll down')
 * @private
 */

/**
 * Sets the hint string read when focusing the previous button in the horizontal scroll bar.
 *
 * @name scrollLeftAriaLabel
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @default $L('scroll left')
 * @private
 */

/**
 * Sets the hint string read when focusing the next button in the horizontal scroll bar.
 *
 * @name scrollRightAriaLabel
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @default $L('scroll right')
 * @private
 */

/**
 * Sets the hint string read when focusing the previous button in the vertical scroll bar.
 *
 * @name scrollUpAriaLabel
 * @memberof agate/Scroller.ScrollerBasic.prototype
 * @type {String}
 * @default $L('scroll up')
 * @private
 */

/**
 * An Agate-styled Scroller, Scrollable applied.
 *
 * Usage:
 * ```
 * <Scroller>Scroll me.</Scroller>
 * ```
 *
 * @class Scroller
 * @memberof agate/Scroller
 * @extends agate/Scroller.ScrollerBasic
 * @ui
 * @private
 */

export default ScrollerBasic;
export {
	ScrollerBasic
};
