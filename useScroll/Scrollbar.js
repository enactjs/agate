import {useScrollbar as useScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {memo, useEffect, useRef} from 'react';

import ScrollButtons from './ScrollButtons';
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
			focusableScrollButtons,
			nextButtonAriaLabel,
			onKeyDownButton,
			onNextScroll,
			onPrevScroll,
			preventBubblingOnKeyDown,
			previousButtonAriaLabel,
			rtl,
			vertical
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
const ScrollbarBase = memo((props) => {
	const scrollButtonsRef = useRef();

	const {
		restProps,
		scrollbarProps,
		scrollbarButtonsProps,
		scrollbarTrackProps
	} = useThemeScrollbar(props);

	useEffect(() => {
		const {scrollbarHandle} = props;
		const {update: uiUpdate} = scrollbarHandle.current;
		const {focusOnButton, isOneOfScrollButtonsFocused, updateButtons} = scrollButtonsRef.current;

		scrollbarHandle.current.update = (bounds) => {
			updateButtons(bounds);
			uiUpdate(bounds);
		};

		scrollbarHandle.current.focusOnButton = focusOnButton;
		scrollbarHandle.current.isOneOfScrollButtonsFocused = isOneOfScrollButtonsFocused;
	});

	return (
		<div {...restProps} {...scrollbarProps}>
			<ScrollButtons
				{...scrollbarButtonsProps}
				ref={scrollButtonsRef}
				scrollbarTrackRenderer={() => { // eslint-disable-line react/jsx-no-bind
					return (
						<ScrollbarTrack
							{...scrollbarTrackProps}
							key="scrollbarTrack"
						/>
					);
				}}
			/>
		</div>
	);
});

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends agate/useScroll.Scrollbar.prototype */ {
	/**
	 * If `true`, add the corner between vertical and horizontal scrollbars.
	 *
	 * @type {Booelan}
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
	 * The minimum size of the thumb.
	 * This value will be applied ri.scale.
	 *
	 * @type {number}
	 * @public
	 */
	minThumbSize: PropTypes.number,

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

ScrollbarBase.defaultProps = {
	corner: false,
	css: componentCss,
	minThumbSize: 18,
	vertical: true
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
