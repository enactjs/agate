/**
 * Provides Agate-themed scroller components and behaviors.
 *
 * @example
 * <Scroller>
 * 	<div style={{height: '100%'}}>
 * 		<p>San Francisco</p>
 * 		<p>Seoul</p>
 * 		<p>Bangalore</p>
 * 		<p>New York</p>
 * 		<p>London</p>
 * 	</div>
 * </Scroller>
 *
 * @module agate/Scroller
 * @exports Scroller
 */

import {setDefaultProps} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {ResizeContext} from '@enact/ui/Resizable';
import {ScrollerBasic as UiScrollerBasic} from '@enact/ui/Scroller';
import PropTypes from 'prop-types';

import useScroll from '../useScroll';
import Scrollbar from '../useScroll/Scrollbar';
import Skinnable from '../Skinnable';

import useThemeScroller from './useThemeScroller';

const nop = () => {};

const scrollerDefaultProps = {
	'data-spotlight-container-disabled': false,
	cbScrollTo: nop,
	direction: 'both',
	focusableScrollbar: false,
	horizontalScrollbar: 'auto',
	noScrollByWheel: false,
	onScroll: nop,
	onScrollStart: nop,
	onScrollStop: nop,
	preventBubblingOnKeyDown: 'none',
	scrollMode: 'native',
	verticalScrollbar: 'auto'
};

/**
 * An Agate-styled Scroller, useScroll applied.
 *
 * Usage:
 * ```
 * <Scroller>Scroll me.</Scroller>
 * ```
 *
 * @class Scroller
 * @memberof agate/Scroller
 * @extends ui/Scroller.ScrollerBasic
 * @ui
 * @public
 */
let Scroller = (props) => {
	const scrollerProps = setDefaultProps(props, scrollerDefaultProps);

	// Hooks
	const {
		scrollContentWrapper: ScrollContentWrapper,
		scrollContentHandle,
		isHorizontalScrollbarVisible,
		isVerticalScrollbarVisible,

		resizeContextProps,
		scrollContainerProps,
		scrollInnerContainerProps,
		scrollContentWrapperProps,
		scrollContentProps,
		verticalScrollbarProps,
		horizontalScrollbarProps
	} = useScroll(scrollerProps);

	const themeScrollContentProps = useThemeScroller(scrollContentProps);

	// Render
	return (
		<ResizeContext {...resizeContextProps}>
			<div {...scrollContainerProps}>
				<div {...scrollInnerContainerProps}>
					<ScrollContentWrapper {...scrollContentWrapperProps}>
						<UiScrollerBasic {...themeScrollContentProps} ref={scrollContentHandle} />
					</ScrollContentWrapper>
					{isVerticalScrollbarVisible ? <Scrollbar {...verticalScrollbarProps} /> : null}
				</div>
				{isHorizontalScrollbarVisible ? <Scrollbar {...horizontalScrollbarProps} /> : null}
			</div>
		</ResizeContext>
	);
};

Scroller.displayName = 'Scroller';

Scroller.propTypes = /** @lends agate/Scroller.Scroller.prototype */ {
	/**
	 * A callback function that receives a reference to the `scrollTo` feature.
	 *
	 * Once received, the `scrollTo` method can be called as an imperative interface.
	 *
	 * - {position: {x, y}} - Pixel value for x and/or y position
	 * - {align} - Where the scroll area should be aligned. Values are:
	 *   `'left'`, `'right'`, `'top'`, `'bottom'`,
	 *   `'topleft'`, `'topright'`, `'bottomleft'`, and `'bottomright'`.
	 * - {node} - Node to scroll into view
	 * - {animate} - When `true`, scroll occurs with animation. When `false`, no
	 *   animation occurs.
	 * - {focus} - When `true`, attempts to focus item after scroll. Only valid when scrolling
	 *   by `node`.
	 * > Note: Only specify one of: `position`, `align`, `node`
	 *
	 * Example:
	 * ```
	 *	// If you set cbScrollTo prop like below;
	 *	cbScrollTo: (fn) => {this.scrollTo = fn;}
	 *	// You can simply call like below;
	 *	this.scrollTo({align: 'top'}); // scroll to the top
	 * ```
	 *
	 * @type {Function}
	 * @public
	 */
	cbScrollTo: PropTypes.func,

	/**
	 * This is set to `true` by SpotlightContainerDecorator
	 *
	 * @type {Boolean}
	 * @private
	 */
	'data-spotlight-container': PropTypes.bool,

	/**
	 * `false` if the content of the scroller could get focus
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
	 * Direction of the scroller.
	 *
	 * Valid values are:
	 * * `'both'`,
	 * * `'horizontal'`, and
	 * * `'vertical'`.
	 *
	 * @type {String}
	 * @default 'both'
	 * @public
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
	 * Specifies how to show horizontal scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	horizontalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden']),

	/**
	 * Unique identifier for the component.
	 *
	 * When defined and when the `Scroller` is within a {@link agate/Panels.Panel|Panel}, the
	 * `Scroller` will store its scroll position and restore that position when returning to the
	 * `Panel`.
	 *
	 * @type {String}
	 * @public
	 */
	id: PropTypes.string,

	/**
	 * Prevents scroll by wheeling on the scroller.
	 *
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	noScrollByWheel: PropTypes.bool,

	/**
	 * Called when scrolling.
	 *
	 * Passes `scrollLeft`, `scrollTop`.
	 * It is not recommended to set this prop since it can cause performance degradation.
	 * Use `onScrollStart` or `onScrollStop` instead.
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScroll: PropTypes.func,

	/**
	 * Called when scroll starts.
	 *
	 * Passes `scrollLeft` and `scrollTop`.
	 *
	 * Example:
	 * ```
	 * onScrollStart = ({scrollLeft, scrollTop}) => {
	 *     // do something with scrollLeft and scrollTop
	 * }
	 *
	 * render = () => (
	 *     <Scroller
	 *         ...
	 *         onScrollStart={this.onScrollStart}
	 *         ...
	 *     />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScrollStart: PropTypes.func,

	/**
	 * Called when scroll stops.
	 *
	 * Passes `scrollLeft` and `scrollTop`.
	 *
	 * Example:
	 * ```
	 * onScrollStop = ({scrollLeft, scrollTop}) => {
	 *     // do something with scrollLeft and scrollTop
	 * }
	 *
	 * render = () => (
	 *     <Scroller
	 *         ...
	 *         onScrollStop={this.onScrollStop}
	 *         ...
	 *     />
	 * )
	 * ```
	 *
	 * @type {Function}
	 * @param {Object} event
	 * @param {Number} event.scrollLeft Scroll left value.
	 * @param {Number} event.scrollTop Scroll top value.
	 * @public
	 */
	onScrollStop: PropTypes.func,

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
	 * Specifies how to scroll.
	 *
	 * Valid values are:
	 * * `'translate'`,
	 * * `'native'`.
	 *
	 * @type {('native'|'translate')}
	 * @default 'native'
	 * @public
	 */
	scrollMode: PropTypes.oneOf(['native', 'translate']),

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
	 * Specifies how to show vertical scrollbar.
	 *
	 * Valid values are:
	 * * `'auto'`,
	 * * `'visible'`, and
	 * * `'hidden'`.
	 *
	 * @type {String}
	 * @default 'auto'
	 * @public
	 */
	verticalScrollbar: PropTypes.oneOf(['auto', 'visible', 'hidden'])
};

Scroller = Skinnable(
	SpotlightContainerDecorator(
		{
			overflow: true,
			preserveId: true,
			restrict: 'self-first'
		},
		I18nContextDecorator(
			{rtlProp: 'rtl'},
			Scroller
		)
	)
);

Scroller.defaultPropValues = scrollerDefaultProps;

export default Scroller;
export {
	Scroller
};
