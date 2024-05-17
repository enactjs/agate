import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import {memo, useLayoutEffect} from 'react';

import ScrollButton from './ScrollButton';
import useScrollButtons from './ScrollButtons';
import ScrollbarTrack from './ScrollbarTrack';
import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

const useThemeScrollbar = (props) => {
	const {
		restProps,
		scrollbarProps,
		scrollbarTrackProps
	} = useScrollbarBase(props);

	const {
		cbAlertScrollbarTrack,
		disabled,
		focusableScrollButtons,
		nextButtonAriaLabel,
		onKeyDownButton,
		onNextScroll,
		onPrevScroll,
		preventBubblingOnKeyDown,
		previousButtonAriaLabel,
		rtl,
		...rest
	} = restProps;

	const {vertical} = scrollbarTrackProps;

	return {
		restProps: rest,
		scrollbarProps,
		scrollbarButtonsProps: {
			disabled,
			focusableScrollButtons,
			nextButtonAriaLabel,
			onKeyDownButton,
			onNextScroll,
			onPrevScroll,
			preventBubblingOnKeyDown,
			previousButtonAriaLabel,
			rtl,
			"verticalScrollbar": vertical
		},
		scrollbarTrackProps: {
			...scrollbarTrackProps,
			cbAlertScrollbarTrack
		}
	};
};

/**
 * An Agate-styled scrollbar base component.
 *
 * @class ScrollbarBase
 * @memberof agate/useScroll
 * @ui
 * @private
 */
const ScrollbarBase = memo(({css = componentCss, minThumbSize = 18, vertical = true,  ...rest}) => {
	const props = {
		css,
		minThumbSize,
		vertical,
		...rest
	};

	const {
		restProps,
		scrollbarProps,
		scrollbarButtonsProps,
		scrollbarTrackProps
	} = useThemeScrollbar(props);

	const {
		focusOnButton,
		isOneOfScrollButtonsFocused,
		nextButtonDisabled,
		nextButtonRef,
		nextIcon,
		onClickNext,
		onClickPrev,
		prevButtonDisabled,
		prevButtonRef,
		prevIcon,
		updateButtons
	} = useScrollButtons(scrollbarButtonsProps);

	const {disabled, nextButtonAriaLabel, previousButtonAriaLabel, rtl, verticalScrollbar} = scrollbarButtonsProps;

	useLayoutEffect(() => {
		const {scrollbarHandle} = props;
		const {update: uiUpdate} = scrollbarHandle.current;

		scrollbarHandle.current.update = (bounds) => {
			updateButtons(bounds);
			uiUpdate(bounds);
		};

		scrollbarHandle.current.focusOnButton = focusOnButton;
		scrollbarHandle.current.isOneOfScrollButtonsFocused = isOneOfScrollButtonsFocused;
	});

	return (
		<div {...restProps} {...scrollbarProps}>
			<ScrollButton
				aria-label={rtl && !verticalScrollbar ? nextButtonAriaLabel : previousButtonAriaLabel}
				data-spotlight-overflow="ignore"
				disabled={disabled || prevButtonDisabled}
				onClick={onClickPrev}
				onHold={onClickPrev}
				ref={prevButtonRef}
				icon={prevIcon}
			/>
			<ScrollbarTrack
				{...scrollbarTrackProps}
			/>
			<ScrollButton
				aria-label={rtl && !vertical ? previousButtonAriaLabel : nextButtonAriaLabel}
				data-spotlight-overflow="ignore"
				disabled={disabled || nextButtonDisabled}
				onClick={onClickNext}
				onHold={onClickNext}
				ref={nextButtonRef}
				icon={nextIcon}
			/>
		</div>
	);
});

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends agate/useScroll.Scrollbar.prototype */ {
	/**
	 * If `true`, add the corner between vertical and horizontal scrollbars.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	corner: PropTypes.bool,

	/**
	 * Customizes the component by mapping the supplied collection of CSS class names to the
	 * corresponding internal elements and states of this component.
	 *
	 * The following classes are supported:
	 *
	 * * `scrollbar` - The scrollbar component class
	 *
	 * @type {Object}
	 * @public
	 */
	css: PropTypes.object,

	/**
	 * Specifies to reflect scrollbar's disabled property to the paging controls.
	 * When it is `true`, both prev/next buttons are going to be disabled.
	 *
	 * @type {Boolean}
	 * @default false
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
	 * The minimum size of the thumb.
	 * This value will be applied ri.scale.
	 *
	 * @type {Number}
	 * @default 18
	 * @public
	 */
	minThumbSize: PropTypes.number,

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

/**
 * An Agate-styled scroll bar.
 *
 * @class Scrollbar
 * @memberof agate/useScroll
 * @ui
 * @private
 */
const Scrollbar = Skinnable(ScrollbarBase);

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	ScrollbarBase
};
