import kind from '@enact/core/kind';
import {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
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
class HourPicker extends Component {
	static propTypes = {
		hasMeridiem: PropTypes.bool,
		value: PropTypes.number
	};

	constructor (props) {
		super(props);

		this.state = {
			noAnimation: false,
			prevValue: props.value
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevValue !== props.value) {
			const hours = props.hasMeridiem ? hours12 : hours24;

			return {
				noAnimation: hours[state.prevValue] === hours[props.value],
				prevValue: props.value
			};
		}

		return null;
	}

	render () {
		const {hasMeridiem, ...rest} = this.props;
		const hours = hasMeridiem ? hours12 : hours24;

		return (
			<DateComponentPicker {...rest} noAnimation={this.state.noAnimation}>
				{hours}
			</DateComponentPicker>
		);
	}
}

/**
 * {@link agate/TimePicker.TimePickerBase|TimePickerBase} is the stateless functional time picker
 * component. Should not be used directly but may be composed within another component as it is
 * within {@link agate/TimePicker.TimePicker|TimePicker}.
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
		 * @default false
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
		onHourChange: PropTypes.func,

		/**
		 * Called on changes in the `meridiem` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onMeridiemChange: PropTypes.func,

		/**
		 * Called on changes in the `minute` component of the time.
		 *
		 * @type {Function}
		 * @public
		 */
		onMinuteChange: PropTypes.func,

		/**
		 * Called when the component is removed while retaining focus.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onSpotlightDisappear: PropTypes.func,

		/**
		 * Set content to RTL.
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
		spotlightDisabled: PropTypes.bool
	},

	defaultProps: {
		disabled: false
	},

	styles: {
		css,
		className: 'timePicker',
		publicClassNames: true
	},

	computed: {
		hasMeridiem: ({order}) => order && order.indexOf('a') >= 0,
		meridiemPickerWidth: ({meridiem, meridiems}) => meridiems && meridiems[meridiem].length * 1.5
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
		onHourChange,
		onMeridiemChange,
		onMinuteChange,
		onSpotlightDisappear,
		order,
		spotlightDisabled,
		...rest
	}) => {
		const hourAccessibilityHint = $L('hour');
		const minuteAccessibilityHint = $L('minute');

		delete rest.rtl;

		return (
			<DateTime {...rest} css={css} disabled={disabled}>
				{order && order.map((picker) => {
					switch (picker) {
						case 'h':
						case 'k':
							return (
								<Fragment key="hour-picker">
									<HourPicker
										accessibilityHint={hourAccessibilityHint}
										aria-label={hourAriaLabel}
										className={css.hourPicker}
										disabled={disabled}
										hasMeridiem={hasMeridiem}
										onChange={onHourChange}
										onSpotlightDisappear={onSpotlightDisappear}
										spotlightDisabled={spotlightDisabled}
										value={hour}
										width={2}
										wrap
									/>
								</Fragment>
							);
						case 'm':
							return (
								<DateComponentRangePicker
									accessibilityHint={minuteAccessibilityHint}
									aria-label={minuteAriaLabel}
									className={css.minutePicker}
									disabled={disabled}
									key="minute-picker"
									max={59}
									min={0}
									onChange={onMinuteChange}
									onSpotlightDisappear={onSpotlightDisappear}
									spotlightDisabled={spotlightDisabled}
									value={minute}
									width={2}
									wrap
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
									onChange={onMeridiemChange}
									onSpotlightDisappear={onSpotlightDisappear}
									spotlightDisabled={spotlightDisabled}
									value={meridiem}
									width={meridiemPickerWidth}
									reverseTransition={null}
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
export {
	TimePickerBase
};
