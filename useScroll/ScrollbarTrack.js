import {ScrollbarTrack as UiScrollbarTrack} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import {forwardRef, useEffect} from 'react';

const nop = () => {};

/**
 * An Agate-styled scrollbar track with agate behavior
 *
 * @class ScrollbarTrack
 * @memberof agate/useScroll
 * @ui
 * @private
 */
const ScrollbarTrack = forwardRef(({cbAlertScrollbarTrack, ...rest}, ref) => {
	useEffect (() => {
		cbAlertScrollbarTrack();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <UiScrollbarTrack {...rest} ref={ref} />;
});

ScrollbarTrack.displayName = 'ScrollbarTrack';

ScrollbarTrack.propTypes = /** @lends agate/useScroll.ScrollbarTrack.prototype */ {
	/**
	 * Called when {@link agate/useScroll.ScrollbarTrack|ScrollbarTrack} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertScrollbarTrack: PropTypes.func
};

ScrollbarTrack.defaultProps = {
	cbAlertScrollbarTrack: nop
};

export default ScrollbarTrack;
export {
	ScrollbarTrack,
	ScrollbarTrack as ScrollbarTrackBase
};
