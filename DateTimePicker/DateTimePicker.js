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
		 * Disables the `DateTimePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The "aria-label" for the hour picker
		 *
		 * If not specified, the "aria-label" for the hour picker will be
		 * a combination of the current value and 'hour change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		hourAriaLabel: PropTypes.string,

		/**
		 * The "aria-label" for the meridiem picker.
		 *
		 * If not specified, the "aria-label" for the meridiem picker will be
		 * a combination of the current value and 'change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		meridiemAriaLabel: PropTypes.string,

		/**
		 * The "aria-label" for the minute picker.
		 *
		 * If not specified, the "aria-label" for the minute picker will be
		 * a combination of the current value and 'minute change a value with up down button'.
		 *
		 * @type {String}
		 * @public
		 */
		minuteAriaLabel: PropTypes.string,

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
		 * Handler for `onChange` events
		 *
		 * @type {Function}
		 * @public
		 */
		onChange: PropTypes.func,

		/**
		 * Called when the component is removed when it had focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Disables 5-way spotlight from navigating into the component.
		 *
		 * @type {Boolean}
		 * @public
		 */
		spotlightDisabled: PropTypes.bool,

		/**
		 * The value of the DateTimePicker.
		 *
		 * @type {Date}
		 * @public
		 */
		value: PropTypes.instanceOf(Date),

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

	styles: {
		css,
		className: 'dateTimePicker'
	},

	render ({dayAriaLabel, disabled, hourAriaLabel, meridiemAriaLabel, minuteAriaLabel, monthAriaLabel, onChange, onSpotlightDisappear, spotlightDisabled, value, yearAriaLabel, ...rest}) {

		return (
			<Row {...rest} className={css.dateTimePicker} align="center center">
				<Row align="center center">
					<TimePicker {...rest} css={css} disabled={disabled} hourAriaLabel={hourAriaLabel} meridiemAriaLabel={meridiemAriaLabel} minuteAriaLabel={minuteAriaLabel} onChange={onChange} onSpotlightDisappear={onSpotlightDisappear} spotlightDisabled={spotlightDisabled} value={value} />
				</Row>
				<Row align="center center">
					<DatePicker {...rest} css={css} dayAriaLabel={dayAriaLabel} disabled={disabled} monthAriaLabel={monthAriaLabel} onChange={onChange} onSpotlightDisappear={onSpotlightDisappear} spotlightDisabled={spotlightDisabled} value={value} yearAriaLabel={yearAriaLabel} />
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
