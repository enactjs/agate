/**
 * Exports the {@link agate/internal/DateTimeDecorator.DateTimeDecorator} higher-order component
 *
 * @module agate/internal/DateTimeDecorator
 * @private
 */

import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {memoize} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Changeable from '@enact/ui/Changeable';
import DateFactory from 'ilib/lib/DateFactory';
import PropTypes from 'prop-types';
import {Component} from 'react';

/*
 * Converts a JavaScript Date to unix time
 *
 * @param	{Date}	date	A Date to convert
 *
 * @returns	{undefined}
 */
const toTime = (date) => {
	return (date && typeof date.getTime === 'function') ? date.getTime() : null;
};

/**
 * {@link agate/internal/DateTimeDecorator.DateTimeDecorator} provides common behavior for
 * {@link agate/DatePicker.DatePicker} and {@link agate/TimePicker.TimePicker}.
 *
 * @class DateTimeDecorator
 * @hoc
 * @memberof agate/internal/DateTimeDecorator
 * @mixes ui/Changeable.Changeable
 * @private
 */
const DateTimeDecorator = hoc((config, Wrapped) => {
	const {customProps, defaultOrder, handlers, i18n} = config;

	const memoizedI18nConfig = memoize((/* locale */) => {
		// Guard for isomorphic builds
		if (typeof window !== 'undefined' && i18n) {
			return i18n();
		}
		return null;
	});

	const Decorator = class extends Component {
		static displayName = 'DateTimeDecorator';

		static propTypes = /** @lends agate/internal/DateTimeDecorator.DateTimeDecorator.prototype */ {
			/**
			 * The current locale as a
			 * {@link https://tools.ietf.org/html/rfc5646|BCP 47 language tag}.
			 *
			 * @type {String}
			 * @public
			 */
			locale: PropTypes.string,

			/**
			 * Handler for `onChange` events
			 *
			 * @type {Function}
			 * @public
			 */
			onChange: PropTypes.func,

			/**
			 * The selected date
			 *
			 * @type {Date}
			 * @public
			 */
			value: PropTypes.instanceOf(Date)
		};

		constructor (props) {
			super(props);

			this.state = {
				initialValue: null,
				dayReverseTransition: null,
				value: null
			};

			const newValue = toTime(this.props.value);
			const value = newValue || Date.now();

			// if no value was provided, we need to emit the onChange event for the generated value
			if (!newValue) {
				this.emitChange(this.toIDate(value));
			}

			this.handlers = {};
			if (handlers) {
				Object.keys(handlers).forEach(name => {
					this.handlers[name] = this.handlePickerChange.bind(this, handlers[name]);
				});
			}
		}

		static getDerivedStateFromProps (props, state) {
			let value = toTime(props.value);

			if (!props.disabled && state.initialValue == null && state.value == null) {
				return {
					initialValue: value,
					value: value || Date.now()
				};
			} else if (state.value !== value) {
				// always respect a value change from props
				return {
					value
				};
			}

			return null;
		}

		/**
		 * Converts a Date to an IDate
		 *
		 * @param	{Date}	time	Date object
		 *
		 * @returns	{IDate}			ilib Date object
		 */
		toIDate (time) {
			if (time && this.props.locale) {
				return DateFactory({
					unixtime: time,
					timezone: 'local'
				});
			}
		}

		/**
		 * Updates the internal value in state
		 *
		 * @param	{IDate}		value	ilib Date object
		 * @param 	{Function}  reverseTransition function for reverse transition
		 *
		 * @returns {Number}			Updated internal value
		 */
		updateValue = (value, reverseTransition) => {
			const {day, month, year} = value;
			const maxDays = value.cal.getMonLength(month, year);
			value.day = (day <= maxDays) ? day : maxDays;

			const prevValue = this.toIDate(this.state.value);
			const prevMaxDays = prevValue.cal.getMonLength(prevValue.month, prevValue.year);

			const date = DateFactory(value);
			const newValue = date.getTimeExtended();
			const changed =	this.props.value == null || this.props.value !== newValue;

			if (prevMaxDays === maxDays) {
				this.setState({
					value: newValue,
					dayReverseTransition: reverseTransition
				});
			} else if (prevValue.day === prevMaxDays || (prevValue.day !== prevMaxDays && prevValue.day > maxDays)) {
				this.setState({
					value: newValue,
					dayReverseTransition: true
				});
			} else if (prevValue.day !== prevMaxDays && prevValue.day <= maxDays ) {
				this.setState({
					value: newValue,
					dayReverseTransition: false
				});
			}

			if (changed) {
				this.emitChange(date);
			}

			return newValue;
		};

		emitChange = (date) => {
			forward('onChange', {value: date ? date.getJSDate() : null}, this.props);
		};

		handlePickerChange = (handler, ev) => {
			const value = this.toIDate(this.state.value);
			handler(ev, value, memoizedI18nConfig(this.props.locale));
			this.updateValue(value, ev.reverseTransition);
		};

		handleCancel = () => {
			const {initialValue, value} = this.state;

			// if we're cancelling, reset our state and emit an onChange with the initial value
			this.setState({
				value: null,
				initialValue: null,
				pickerValue: value
			});

			if (initialValue !== value) {
				this.emitChange(this.toIDate(initialValue));
			}
		};

		render () {
			const value = this.toIDate(this.state.value);
			// pickerValue is only set when cancelling to prevent the unexpected changing of the
			// picker values before closing.
			const pickerValue = this.state.pickerValue ? this.toIDate(this.state.pickerValue) : value;

			let props = null;
			let order = defaultOrder;

			const i18nConfig = memoizedI18nConfig(this.props.locale);
			if (i18nConfig) {
				props = customProps(i18nConfig, pickerValue, this.state.dayReverseTransition, this.props);
				order = i18nConfig.order;
			}

			return (
				<Wrapped
					{...this.props}
					{...props}
					{...this.handlers}
					order={order}
					value={value}
				/>
			);
		}
	};

	return I18nContextDecorator(
		{rtlProp: 'rtl', localeProp: 'locale'},
		Changeable(
			Decorator
		)
	);
});

export default DateTimeDecorator;
export {
	DateTimeDecorator
};
