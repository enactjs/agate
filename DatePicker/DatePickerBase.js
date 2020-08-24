import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import {DateComponentRangePicker} from '../internal/DateComponentPicker';
import DateTime from '../internal/DateTime';

import css from './DatePicker.module.less';

/**
 * A date selection component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [DatePicker]{@link agate/DatePicker.DatePicker}.
 *
 * @class DatePickerBase
 * @memberof agate/DatePicker
 * @ui
 * @public
 */
const DatePickerBase = kind({
	name: 'DatePickerBase',

	propTypes:  /** @lends agate/DatePicker.DatePickerBase.prototype */ {
		/**
		 * The `day` component of the Date.
		 *
		 * The value should be a number between 1 and `maxDays`.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		day: PropTypes.number.isRequired,

		/**
		 * The number of days in the month.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		maxDays: PropTypes.number.isRequired,

		/**
		 * The number of months in the year.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		maxMonths: PropTypes.number.isRequired,

		/**
		 * The `month` component of the Date.
		 *
		 * The value should be a number between 1 and `maxMonths`.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		month: PropTypes.number.isRequired,

		/**
		 * The order in which the component pickers are displayed.
		 *
		 * The value should be an array of 3 strings containing one of `'m'`, `'d'`, and `'y'`.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		order: PropTypes.arrayOf(PropTypes.oneOf(['m', 'd', 'y'])).isRequired,

		/**
		 * The `year` component of the Date.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		year: PropTypes.number.isRequired,

		/**
		 * The "aria-label" for the day picker.
		 *
		 * If not specified, the "aria-label" for the day picker will be
		 * a combination of the current value and 'day change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		dayAriaLabel: PropTypes.string,

		/**
		 * Disables the `DatePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The maximum selectable `year` value.
		 *
		 * @type {Number}
		 * @default 2099
		 * @public
		 */
		maxYear: PropTypes.number,

		/**
		 * The minimum selectable `year` value.
		 *
		 * @type {Number}
		 * @default 1900
		 * @public
		 */
		minYear: PropTypes.number,

		/**
		 * The "aria-label" for the month picker.
		 *
		 * If not specified, the "aria-label" for the month picker will be
		 * a combination of the current value and 'month change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		monthAriaLabel: PropTypes.string,

		/**
		 * Called when the `date` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeDate: PropTypes.func,

		/**
		 * Called when the `month` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMonth: PropTypes.func,

		/**
		 * Called when the `year` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeYear: PropTypes.func,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * The "aria-label" for the year picker.
		 *
		 * If not specified, the "aria-label" for the year picker will be
		 * a combination of the current value and 'year change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		yearAriaLabel: PropTypes.string
	},

	defaultProps: {
		maxYear: 2099,
		minYear: 1900,
		disabled: false
	},

	styles: {
		css,
		className: 'datePicker'
	},

	render: ({
		disabled,
		day,
		dayAriaLabel,
		maxDays,
		maxMonths,
		maxYear,
		minYear,
		month,
		monthAriaLabel,
		onChangeDate,
		onChangeMonth,
		onChangeYear,
		order,
		year,
		yearAriaLabel,
		...rest
	}) => {

		delete rest.rtl;

		return (
			<DateTime {...rest}>
				{order.map((picker) => {
					switch (picker) {
						case 'd':
							return (
								<DateComponentRangePicker
									aria-label={dayAriaLabel}
									className={css.day}
									disabled={disabled}
									key="day-picker"
									max={maxDays}
									min={1}
									onChange={onChangeDate}
									value={day}
									width={4}
								/>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									aria-label={monthAriaLabel}
									className={css.month}
									disabled={disabled}
									key="month-picker"
									max={maxMonths}
									min={1}
									onChange={onChangeMonth}
									value={month}
									width={4}
								/>
							);
						case 'y':
							return (
								<DateComponentRangePicker
									aria-label={yearAriaLabel}
									className={css.year}
									disabled={disabled}
									key="year-picker"
									max={maxYear}
									min={minYear}
									onChange={onChangeYear}
									value={year}
									width={4}
								/>
							);
					}
					return null;
				})}
			</DateTime>
		);
	}
});

export default DatePickerBase;
export {
	DatePickerBase
};
