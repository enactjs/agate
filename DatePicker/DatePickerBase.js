import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
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
		 * @default 31
		 * @required
		 * @public
		 */
		maxDays: PropTypes.number.isRequired,

		/**
		 * The number of months in the year.
		 *
		 * @type {Number}
		 * @default 12
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
		 * When it's `true`, it changes the direction of the transition animation for the day.
		 *
		 * @type {Boolean}
		 * @public
		 */
		dayReverseTransition: PropTypes.bool,

		/**
		 * Disables the `DatePicker`.
		 *
		 * @type {Boolean}
		 * @default false
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
		onDateChange: PropTypes.func,

		/**
		 * Called when the `month` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onMonthChange: PropTypes.func,

		/**
		 * Called when the component is removed when it had focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Called when the `year` component of the Date changes.
		 *
		 * @type {Function}
		 * @public
		 */
		onYearChange: PropTypes.func,

		/**
		 * Indicates the content's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Disables 5-way spotlight from navigating into the component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

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
		maxDays: 31,
		maxMonths: 12,
		maxYear: 2099,
		minYear: 1900,
		disabled: false
	},

	styles: {
		css,
		className: 'datePicker',
		publicClassNames: true
	},

	render: ({
		disabled,
		day,
		dayAriaLabel,
		dayReverseTransition,
		maxDays,
		maxMonths,
		maxYear,
		minYear,
		month,
		monthAriaLabel,
		onDateChange,
		onMonthChange,
		onYearChange,
		onSpotlightDisappear,
		order,
		spotlightDisabled,
		year,
		yearAriaLabel,
		...rest
	}) => {
		const dayAccessibilityHint = $L('day');
		const monthAccessibilityHint = $L('month');
		const yearAccessibilityHint = $L('year');
		delete rest.rtl;

		return (
			<DateTime {...rest}>
				{order && order.map((picker) => {
					switch (picker) {
						case 'd':
							return (
								<DateComponentRangePicker
									accessibilityHint={dayAccessibilityHint}
									aria-label={dayAriaLabel}
									className={css.day}
									disabled={disabled}
									key="day-picker"
									max={maxDays}
									min={1}
									onChange={onDateChange}
									onSpotlightDisappear={onSpotlightDisappear}
									reverseTransition={dayReverseTransition}
									spotlightDisabled={spotlightDisabled}
									value={day}
									width={2}
									wrap
								/>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									accessibilityHint={monthAccessibilityHint}
									aria-label={monthAriaLabel}
									className={css.month}
									disabled={disabled}
									key="month-picker"
									max={maxMonths}
									min={1}
									onChange={onMonthChange}
									onSpotlightDisappear={onSpotlightDisappear}
									spotlightDisabled={spotlightDisabled}
									value={month}
									width={2}
									wrap
								/>
							);
						case 'y':
							return (
								<DateComponentRangePicker
									accessibilityHint={yearAccessibilityHint}
									aria-label={yearAriaLabel}
									className={css.year}
									disabled={disabled}
									key="year-picker"
									max={maxYear}
									min={minYear}
									onChange={onYearChange}
									onSpotlightDisappear={onSpotlightDisappear}
									spotlightDisabled={spotlightDisabled}
									value={year}
									width={4}
									wrap
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
