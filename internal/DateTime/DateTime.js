import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import componentCss from './DateTime.module.less';

/**
 * {@link agate/internal/DateTime.DateTime} provides the surrounding
 * markup and styling for a {@link agate/DatePicker} and
 * {@link agate/TimePicker}.
 *
 * @class DateTime
 * @memberof agate/internal/DateTime
 * @ui
 * @private
 */
const DateTimeBase = kind({
	name: 'DateTime',

	propTypes:  /** @lends agate/internal/DateTime.DateTime.prototype */ {
		css: PropTypes.object,

		/**
		 * The label to display above the picker
		 *
		 * @type {String}
		 */
		label: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'dateTime',
		publicClassNames: ['dateTime', 'pickers']
	},

	render: ({children, css, label, ...rest}) => (
		<div {...rest}>
			<div className={css.pickers}>
				{children}
			</div>
		</div>
	)
});

export default DateTimeBase;
export {
	DateTimeBase,
	DateTimeBase as DateTime
};
