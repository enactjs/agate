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

import React from 'react';
import classnames from 'classnames';
import {Cell, Row} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import DatePicker from './DatePicker';
import Skinnable from '../Skinnable';
import TimePicker from './TimePicker';

import css from './DateTimePicker.module.less';

/**
 * A date/time Picker component.
 *
 * @class DateTimePickerBase
 * @memberof agate/DateTimePicker
 * @ui
 * @public
 */
class DateTimePickerBase extends React.Component {
	static propTypes = /** @lends agate/DateTimePicker.DateTimePickerBase.prototype */ {
		onChange: PropTypes.func
	};

	constructor (props) {
		super(props);

		this.state = {
			date: new Date(),
			time: new Date(),
			dateTime: new Date()
		};
	}

	componentDidUpdate () {
		if (this.props.onChange) {
			this.props.onChange({...this.state});
		}
	}

	handleChange = (type) => ({value}) => {
		const {date, time} = this.state;

		this.setState({
			[type]: value
		});

		setTimeout(() => {
			let dateStr = date.toString();
			let timeStr = time.toString();

			this.setState({
				dateTime: dateStr.slice(0, 16) + timeStr.slice(16, timeStr.length)
			});
		});
	};

	render () {
		const {className, ...rest} = this.props;
		const {date, time} = this.state;
		delete rest.onChange;

		return (
			<Row {...rest} className={classnames(className, css.dateTimePicker)} align="center center">
				<Cell>
					<Row align="center center">
						<TimePicker defaultValue={time} onChange={this.handleChange('time')} />
					</Row>
				</Cell>
				<Cell>
					<Row align="center center">
						<DatePicker defaultValue={date} onChange={this.handleChange('date')} />
					</Row>
				</Cell>
			</Row>
		);
	}
}

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
