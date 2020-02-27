import {ScrollThumb as UiScrollThumb} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {forwardRef, useEffect} from 'react';

const nop = () => {};

/**
 * An Agate-styled scroll thumb with agate behavior
 *
 * @class ScrollThumb
 * @memberof agate/useScroll
 * @extends ui/Scrollable/ScrollThumb
 * @ui
 * @private
 */
const ScrollThumb = forwardRef(({cbAlertThumb, ...rest}, ref) => {
	useEffect (() => {
		cbAlertThumb();
	});

	return <UiScrollThumb {...rest} ref={ref} />;
});

ScrollThumb.displayName = 'ScrollThumb';

ScrollThumb.propTypes = /** @lends agate/useScroll.ScrollThumb.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link agate/useScroll.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func
};

ScrollThumb.defaultProps = {
	cbAlertThumb: nop
};

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
