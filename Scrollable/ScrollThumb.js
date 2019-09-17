import {ScrollThumb as UiScrollThumb} from '@enact/ui/Scrollable/Scrollbar';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

const nop = () => {};

/**
 * An Agate-styled scroll thumb with agate behavior
 *
 * @class ScrollThumb
 * @memberof agate/Scrollable
 * @extends ui/Scrollable/ScrollThumb
 * @ui
 * @private
 */
class ScrollThumb extends Component {
	static propTypes = /** @lends agate/Scrollable.ScrollThumb.prototype */ {
		/**
		 * Called when [ScrollThumb]{@link agate/Scrollable.ScrollThumb} is updated.
		 *
		 * @type {Function}
		 * @private
		 */
		cbAlertThumb: PropTypes.func
	}

	static defaultProps = {
		cbAlertThumb: nop
	}

	componentDidUpdate () {
		this.props.cbAlertThumb();
	}

	render () {
		const props = Object.assign({}, this.props);

		delete props.cbAlertThumb;

		return <UiScrollThumb {...props} />;
	}
}

export default ScrollThumb;
export {
	ScrollThumb,
	ScrollThumb as ScrollThumbBase
};
