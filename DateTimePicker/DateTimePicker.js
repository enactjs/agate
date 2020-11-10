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
import Changeable from '@enact/ui/Changeable';
import {Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
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
		onChange: PropTypes.func,

		/**
		 * The value of the DateTimePicker.
		 *
		 * @type {String}
		 * @public
		 */
		value: PropTypes.any
	},

	styles: {
		css,
		className: 'dateTimePicker'
	},

	render ({disabled, onChange, value, ...rest}) {

		return (
			<Row {...rest} className={css.dateTimePicker} align="center center">
				<Row align="center center">
					<TimePicker css={css} disabled={disabled} onChange={onChange} value={value} />
				</Row>
				<Row align="center center">
					<DatePicker css={css} disabled={disabled} onChange={onChange} value={value} />
				</Row>
			</Row>
		);
	}
});

/**
 * Applies Agate specific behaviors to [DateTimePickerBase]{@link agate/DateTimePicker.DateTimePickerBase} components.
 *
 * @hoc
 * @memberof agate/DateTimePicker
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/Changeable.Changeable
 * @public
 */
const DateTimePickerDecorator = compose(
	Skinnable,
	Changeable
);

/**
 * An Agate themed date/time Picker component.
 *
 * @class DateTimePicker
 * @memberof agate/DateTimePicker
 * @extends agate/DateTimePicker.DateTimePickerBase
 * @mixes agate/DateTimePicker.DateTimePickerDecorator
 * @ui
 * @public
 */
const DateTimePicker = DateTimePickerDecorator(DateTimePickerBase);

export default DateTimePicker;
export {
	DateTimePicker,
	DateTimePickerBase
};
