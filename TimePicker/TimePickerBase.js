import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import {DateComponentPicker, DateComponentRangePicker} from '../internal/DateComponentPicker';
import DateTime from '../internal/DateTime';

import css from './TimePicker.module.less';

// values to use in hour picker for 24 and 12 hour locales
const hours24 = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
];

const hours12 = [
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
	'12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'
];

/**
 * {@link agate/TimePicker/TimePickerBase.HourPicker} is a utility component to prevent the
 * animation of the picker when the display text doesn't change for 12-hour locales.
 *
 * @class HourPicker
 * @memberof agate/TimePicker/TimePickerBase
 * @ui
 * @private
 */
class HourPicker extends React.Component {
	static propTypes = {
		hasMeridiem: PropTypes.bool,
		value: PropTypes.number
	};

	constructor (props) {
		super(props);

		this.state = {
			prevValue: props.value
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevValue !== props.value) {
			return {
				prevValue: props.value
			};
		}

		return null;
	}

	render () {
		const {hasMeridiem, ...rest} = this.props;
		const hours = hasMeridiem ? hours12 : hours24;

		return (
			<DateComponentPicker {...rest}>
				{hours}
			</DateComponentPicker>
		);
	}
}

/**
* {@link agate/TimePicker.TimePickerBase} is the stateless functional time picker
* component. Should not be used directly but may be composed within another component as it is
* within {@link agate/TimePicker.TimePicker}.
*
* @class TimePickerBase
* @memberof agate/TimePicker
* @ui
* @public
*/
const TimePickerBase = kind({
	name: 'TimePickerBase',

	propTypes: /** @lends agate/TimePicker.TimePickerBase.prototype */ {
		/**
		 * The `hour` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		hour: PropTypes.number.isRequired,

		/**
		 * The `meridiem` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		meridiem: PropTypes.number.isRequired,

		/**
		 * The `minute` component of the time.
		 *
		 * @type {Number}
		 * @required
		 * @public
		 */
		minute: PropTypes.number.isRequired,

		/**
		 * The order in which the component pickers are displayed.
		 *
		 * Should be an array of 2 or 3 strings containing one of `'h'`, `'k'`, `'m'`, and `'a'`.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		order: PropTypes.arrayOf(PropTypes.oneOf(['h', 'k', 'm', 'a'])).isRequired,

		/**
		 * Disables the `TimePicker`.
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
		 * Array of meridiem labels to display.
		 *
		 * @type {String[]}
		 * @required
		 * @public
		 */
		meridiems: PropTypes.arrayOf(PropTypes.string),

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
		 * Called on changes in the `hour` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeHour: PropTypes.func,

		/**
		 * Called on changes in the `meridiem` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMeridiem: PropTypes.func,

		/**
		 * Called on changes in the `minute` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onChangeMinute: PropTypes.func,

		/**
		 * Set content to RTL.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool
	},

	defaultProps: {
		disabled: false
	},

	styles: {
		css,
		className: 'timePicker'
	},

	computed: {
		hasMeridiem: ({order}) => order.indexOf('a') >= 0,
		meridiemPickerWidth: ({meridiem, meridiems}) => meridiems[meridiem].length * 2
	},

	render: ({
		disabled,
		hasMeridiem,
		hour,
		hourAriaLabel,
		meridiem,
		meridiemAriaLabel,
		meridiemPickerWidth,
		meridiems,
		minute,
		minuteAriaLabel,
		onChangeHour,
		onChangeMeridiem,
		onChangeMinute,
		order,
		...rest
	}) => {

		delete rest.rtl;

		return (
			<DateTime {...rest} css={css}>
				{order.map((picker) => {
					switch (picker) {
						case 'h':
						case 'k':
							return (
								<React.Fragment key="hour-picker">
									<HourPicker
										aria-label={hourAriaLabel}
										className={css.hourPicker}
										disabled={disabled}
										hasMeridiem={hasMeridiem}
										onChange={onChangeHour}
										value={hour}
										width={4}
									/>
								</React.Fragment>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									aria-label={minuteAriaLabel}
									className={css.minutePicker}
									disabled={disabled}
									key="minute-picker"
									max={59}
									min={0}
									onChange={onChangeMinute}
									value={minute}
									width={4}
								/>
							);
						case 'a':
							return (
								<DateComponentPicker
									aria-label={meridiemAriaLabel}
									aria-valuetext={meridiems ? meridiems[meridiem] : null}
									className={css.meridiemPicker}
									disabled={disabled}
									key="meridiem-picker"
									onChange={onChangeMeridiem}
									value={meridiem}
									width={meridiemPickerWidth}
								>
									{meridiems}
								</DateComponentPicker>
							);
					}

					return null;
				})}
			</DateTime>
		);
	}
});

export default TimePickerBase;
export {TimePickerBase};
