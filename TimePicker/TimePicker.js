/**
 * Provides an Agate-themed time selection component.
 *
 * @example
 * <TimePicker value={new Date()} />
 *
 * @module agate/TimePicker
 * @exports TimePicker
 * @exports TimePickerBase
 * @exports TimePickerDecorator
 * @exports timeToLocaleString
 */

import Pure from '@enact/ui/internal/Pure';
import DateFactory from 'ilib/lib/DateFactory';
import DateFmt from 'ilib/lib/DateFmt';
import LocaleInfo from 'ilib/lib/LocaleInfo';
import compose from 'ramda/src/compose';

import {DateTimeDecorator} from '../internal/DateTime';
import Skinnable from '../Skinnable';

import TimePickerBase from './TimePickerBase';

/*
 * Converts a string representation of time into minutes
 *
 * @param	{String}	time	Time in the format `HH:mm`
 *
 * @returns	{Number}			Time in minute
 * @private
 */
const toMinutes = (time) => {
	const colon = time.indexOf(':');
	const hour = parseInt(time.substring(0, colon));
	const minute = parseInt(time.substring(colon + 1));
	return hour * 60 + minute;
};

/*
 * Converts the `start` and `end` string representations (e.g. '12:00') into a numerical
 * representation.
 *
 * @param	{Object}	options			Time options
 * @param	{String}	options.start	Start time of meridiem
 * @param	{String}	options.end		End time of meridiem
 *
 * @returns	{Object}					Contains start and end time in minutes
 * @private
 */
const calcMeridiemRange = ({start, end}) => ({
	start: toMinutes(start),
	end: toMinutes(end)
});

/*
 * Finds the index of the meridiem which contains `time`
 *
 * @param	{Number}	time		Time in minutes
 * @param	{Object[]}	meridiems	Array of meridiems with `start` and `end` members in minutes
 *
 * @returns {Number}				Index of `time` in `meridiems`
 * @private
 */
const indexOfMeridiem = (time, meridiems) => {
	const minutes = time.getHours() * 60 + time.getMinutes();
	for (let i = 0; i < meridiems.length; i++) {
		const m = meridiems[i];
		if (minutes >= m.start && minutes <= m.end) {
			return i;
		}
	}

	return -1;
};

const getLabelFormatter = () => new DateFmt({
	type: 'time',
	useNative: false,
	timezone: 'local',
	length: 'full',
	date: 'dmwy'
});

const dateTimeConfig = {
	customProps: function (i18n, value) {
		let values = {
			// i18n props
			meridiems: i18n.meridiemLabels,

			// date components
			hour: 12,
			minute: 0,
			meridiem: 0
		};

		if (value) {
			if (i18n.meridiemEnabled) {
				values.meridiem = indexOfMeridiem(value, i18n.meridiemRanges);
			}
			values.hour = value.getHours();
			values.minute = value.getMinutes();
		}

		return values;
	},
	defaultOrder: ['h', 'm', 'a'],
	handlers: {
		onHourChange: function (ev, value) {
			const currentTime = DateFactory(value).getTimeExtended();
			const currentHour = value.hour;

			value.hour = ev.value;

			// In the case of navigating onto the skipped hour of DST, ilib will return the same
			// value, so we skip that hour and update the value again.
			const newTime = DateFactory(value).getTimeExtended();
			if (newTime === currentTime) {
				value.hour = ev.value * 2 - currentHour;
			}

			return value;
		},

		onMinuteChange: function (ev, value) {
			value.minute = ev.value;
			return value;
		},

		onMeridiemChange: function (ev, value, i18n) {
			const {meridiemRanges} = i18n;
			const meridiem = meridiemRanges[ev.value];

			if (meridiemRanges.length === 2) {
				// In the common case of 2 meridiems, we'll offset hours by 12 so that picker stays
				// the same.
				value.hour = (value.getHours() + 12) % 24;
			} else {
				// In the rarer case of > 2 meridiems (e.g. am-ET), try to set hours only first
				const hours = Math.floor(meridiem.start / 60);
				value.hour = hours;

				// but check if it is still out of bounds and update the minutes as well
				const minutes = hours * 60 + value.getMinutes();
				if (minutes > meridiem.end) {
					value.minute = meridiem.end % 60;
				} else if (minutes < meridiem.start) {
					value.minute = meridiem.start % 60;
				}
			}

			return value;
		}
	},
	i18n: function () {
		// Filters used to extract the order of pickers from the ilib template
		const includeMeridiem = /([khma])(?!\1)/ig;
		const excludeMeridiem = /([khm])(?!\1)/ig;

		// Meridiem localization
		const merFormatter = new DateFmt({
			template: 'a',
			useNative: false,
			timezone: 'local'
		});
		const meridiems = merFormatter.getMeridiemsRange();
		const meridiemRanges = meridiems.map(calcMeridiemRange);
		const meridiemLabels = meridiems.map(obj => obj.name);

		// Picker ordering
		const li = new LocaleInfo();
		const clockPref = li.getClock();
		const meridiemEnabled = clockPref === '12';

		const filter = meridiemEnabled ? includeMeridiem : excludeMeridiem;
		const order = getLabelFormatter().getTemplate()
			.replace(/'.*?'/g, '')
			.match(filter)
			.map(s => s[0].toLowerCase());

		return {
			formatter: getLabelFormatter(),
			meridiemEnabled,
			meridiemLabels,
			meridiemRanges,
			order
		};
	}
};

/**
 * Applies Agate specific behaviors to {@link agate/TimePicker.TimePickerBase|TimePickerBase} components.
 *
 * @hoc
 * @memberof agate/TimePicker
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const TimePickerDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A component that allows displaying or selecting time.
 *
 * Set the {@link agate/TimePicker.TimePicker#value|value} property to a standard JavaScript
 *  {@link /docs/developer-guide/glossary/#date|Date} object to initialize the picker.
 *
 * By default, `TimePicker` maintains the state of its `value` property. Supply the
 * `defaultValue` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `value` at creation time and update it in response to
 * `onChange` events.
 *
 * @class TimePicker
 * @memberof agate/TimePicker
 * @extends agate/TimePicker.TimePickerBase
 * @mixes agate/TimePicker.TimePickerDecorator
 * @ui
 * @public
 */
const TimePicker = TimePickerDecorator(
	DateTimeDecorator(
		dateTimeConfig,
		TimePickerBase
	)
);

/**
 * Default value
 *
 * @name defaultValue
 * @memberof agate/TimePicker.TimePicker.prototype
 * @type {Number}
 * @public
 */

/**
 * The selected date.
 *
 * @name value
 * @memberof agate/TimePicker.TimePicker
 * @instance
 * @type {Date}
 * @public
 */

/**
 * Converts a standard `Date` object into a locale-specific string.
 *
 * @function
 * @memberof agate/TimePicker
 * @param {Date} time `Date` to convert
 * @returns {String|null} Converted date or `null` if `date` is invalid
 */
const timeToLocaleString = (time) => {
	if (!time) {
		return null;
	}

	return getLabelFormatter().format(time);
};

export default TimePicker;
export {
	TimePicker,
	TimePickerBase,
	TimePickerDecorator,
	timeToLocaleString
};
