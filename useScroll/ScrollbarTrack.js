import {ScrollbarTrack as UiScrollbarTrack} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import {forwardRef, useEffect, memo} from 'react';

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

const MemoizedScrollbarTrack = memo(ScrollbarTrack);

export default MemoizedScrollbarTrack;
export {
	MemoizedScrollbarTrack,
	MemoizedScrollbarTrack as ScrollbarTrackBase
};
