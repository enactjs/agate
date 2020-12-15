/**
 * Date selection components and behaviors.
 *
 * @example
 * <DatePicker onChange={console.log} />
 *
 * @module agate/DatePicker
 * @exports DatePicker
 * @exports DatePickerBase
 * @exports DatePickerDecorator
 * @exports dateToLocaleString
 */

import Pure from '@enact/ui/internal/Pure';
import DateFactory from 'ilib/lib/DateFactory';
import DateFmt from 'ilib/lib/DateFmt';
import compose from 'ramda/src/compose';

import {DateTimeDecorator} from '../internal/DateTime';
import Skinnable from '../Skinnable';

import DatePickerBase from './DatePickerBase';

const getLabelFormatter = () => new DateFmt({
	date: 'dmwy',
	length: 'full',
	timezone: 'local',
	useNative: false
});

const dateTimeConfig = {
	customProps: function (i18n, value, reverseTransition,  props) {
		const values = {
			maxMonths: 12,
			maxDays: 31,
			year: 1900,
			month: 1,
			day: 1,
			reverseTransition: false
		};

		if (value && i18n) {
			values.year = value.getYears();
			values.month = value.getMonths();
			values.day = value.getDays();
			values.maxMonths = i18n.formatter.cal.getNumMonths(values.year);
			values.maxDays = i18n.formatter.cal.getMonLength(values.month, values.year);
			values.maxYear = i18n.toLocalYear(props.maxYear || DatePickerBase.defaultProps.maxYear);
			values.minYear = i18n.toLocalYear(props.minYear || DatePickerBase.defaultProps.minYear);
		}

		if (reverseTransition) {
			values.reverseTransition = reverseTransition;
		}

		return values;
	},
	defaultOrder: ['d', 'm', 'y'],
	handlers: {
		onDateChange: (ev, value) => {
			value.day = ev.value;
			return value;
		},

		onMonthChange: (ev, value) => {
			value.month = ev.value;
			return value;
		},

		onYearChange: (ev, value) => {
			value.year = ev.value;
			return value;
		}
	},
	i18n: function () {
		const order = getLabelFormatter().getTemplate()
			.replace(/'.*?'/g, '')
			.match(/([mdy]+)/ig)
			.map(s => s[0].toLowerCase());

		/*
		 * Converts a gregorian year to local year
		 *
		 * @param	{Number}	year	gregorian year
		 *
		 * @returns	{Number}		local year
		 */
		const toLocalYear = (year) => {
			return DateFactory({
				julianday: DateFactory({
					year,
					type: 'gregorian',
					month: 1,
					day: 1,
					timezone: 'local'
				}).getJulianDay(),
				timezone: 'local'
			}).getYears();
		};

		return {formatter: getLabelFormatter(), order, toLocalYear};
	}
};

/**
 * Applies Agate specific behaviors to [DatePickerBase]{@link agate/DatePicker.DatePickerBase} components.
 *
 * @hoc
 * @memberof agate/DatePicker
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DatePickerDecorator = compose(
	Pure,
	Skinnable,
	DateTimeDecorator(dateTimeConfig)
);

/**
 * A date selection component, ready to use in Agate applications.
 *
 * `DatePicker` may be used to select the year, month, and day. It uses a standard `Date` object for
 * its `value` which can be shared as the `value` for a
 * [TimePicker]{@link agate/TimePicker.TimePicker} to select both a date and time.
 *
 * By default, `DatePicker` maintains the state of its `value` property. Supply the
 * `defaultValue` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `value` at creation time and update it in response to
 * `onChange` events.
 *
 * Usage:
 * ```
 * <DatePicker
 *   defaultValue={selectedDate}
 *   onChange={handleChange}
 * />
 * ```
 *
 * @class DatePicker
 * @memberof agate/DatePicker
 * @extends agate/DatePicker.DatePickerBase
 * @mixes agate/DatePicker.DatePickerDecorator
 * @omit day
 * @omit maxDays
 * @omit maxMonths
 * @omit month
 * @omit order
 * @omit year
 * @ui
 * @public
 */
const DatePicker = DatePickerDecorator(DatePickerBase);

/**
 * The initial value used when `value` is not set.
 *
 * @name defaultValue
 * @type {Date}
 * @memberof agate/DatePicker.DatePicker.prototype
 * @public
 */

/**
 * The selected date
 *
 * @name value
 * @type {Date}
 * @memberof agate/DatePicker.DatePicker.prototype
 * @public
 */

/**
 * Converts a standard `Date` object into a locale-specific string.
 *
 * @function
 * @memberof agate/DatePicker
 * @param {Date} date `Date` to convert
 * @returns {String?} Converted date or `null` if `date` is invalid
 */
const dateToLocaleString = (date) => {
	if (!date) {
		return null;
	}

	return getLabelFormatter().format(date);
};

export default DatePicker;
export {
	DatePicker,
	DatePickerBase,
	DatePickerDecorator,
	dateToLocaleString
};
