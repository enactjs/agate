/**
 * An Agate-themed date/time picker component.
 *
 * @example
 * <DateTimePicker />
 *
 * @module agate/DateTimePicker
 * @exports DateTimePicker
 * @exports DateTimePickerBase
 */

import kind from '@enact/core/kind';
import {Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import React from 'react';

import DatePicker from '../DatePicker';
import Skinnable from '../Skinnable';
import TimePicker from '../TimePicker';

import css from './DateTimePicker.module.less';

/**
 * A date/time Picker component.
 *
 * @class DateTimePickerBase
 * @memberof agate/DateTimePicker
 * @ui
 * @public
 */
const DateTimePickerBase = kind({
	name: 'DateTimePickerBase',

	propTypes: /** @lends agate/DateTimePicker.DateTimePickerBase.prototype */ {
		/**
		 * Disables the `DateTimePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Handler for `onChange` events
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func
	},

	styles: {
		css,
		className: 'dateTimePicker'
	},

	render ({disabled, onChange, ...rest}) {

		return (
			<Row {...rest} className={css.dateTimePicker} align="center center">
				<Row align="center center">
					<TimePicker css={css} disabled={disabled} onChange={onChange} />
				</Row>
				<Row align="center center">
					<DatePicker css={css} disabled={disabled} onChange={onChange} />
				</Row>
			</Row>
		);
	}
});

/**
 * An Agate themed date/time Picker component.
 *
 * @class DateTimePicker
 * @memberof agate/DateTimePicker
 * @extends agate/DateTimePicker.DateTimePickerBase
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const DateTimePicker = Skinnable(DateTimePickerBase);

export default DateTimePicker;
export {
	DateTimePicker,
	DateTimePickerBase
};
