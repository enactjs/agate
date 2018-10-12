import React from 'react';
import classnames from 'classnames';
import kind from '@enact/core/kind';
import {Cell, Column, Row} from '@enact/ui/Layout';

import Button from '../Button';
import Picker from '../Picker';
import Skinnable from '../Skinnable';

import css from './DateTimePicker.less';

const ranges = {
	years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
	months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
	hours: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
	minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
	meridiem: ['AM', 'PM']
};

const PickerCell = kind({
	name: 'PickerCell',
	render: ({children, range, ...rest}) => (
		<Cell shrink>
			<Column align="center" className={css.pickerCol}>
				<Cell shrink {...rest} component={Picker}>
					{range}
				</Cell>
				<Cell className={css.label} shrink>{children}</Cell>
			</Column>
		</Cell>
	)
});

class DateTimePickerBase extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			hour: '12',
			minute: '00',
			meridiem: 'AM',
			month: '1',
			day: '1',
			year: '2018'
		};
	}

	componentDidUpdate () {
		if (this.props.onChange) {
			this.props.onChange({...this.state});
		}
	}

	onSave = () => {
		if (this.props.onSave) {
			this.props.onSave({...this.state});
		}

		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	handleTimeChange = (type) => ({value}) => {
		this.setState({[type]: value});
	}

	render () {
		const {className, ...rest} = this.props;
		delete rest.onChange;
		delete rest.onClose;
		delete rest.onSave;

		return (
			<Row {...rest} className={classnames(className, css.dateTimePicker)} align="center center">
				<Cell size="35%">
					<Row align="center center">
						<PickerCell className={css.pickerLeft} onChange={this.handleTimeChange('month')} range={ranges.months}>
								Month
						</PickerCell>
						<PickerCell className={css.pickerCell} onChange={this.handleTimeChange('day')} range={ranges.days}>
								Day
						</PickerCell>
						<PickerCell className={css.pickerRight} onChange={this.handleTimeChange('year')} range={ranges.years}>
								Year
						</PickerCell>
					</Row>
				</Cell>
				<Cell size="35%">
					<Row align="center center">
						<PickerCell className={css.pickerLeft} onChange={this.handleTimeChange('hour')} range={ranges.hours}>
								Hour
						</PickerCell>
						<PickerCell className={css.pickerCell} onChange={this.handleTimeChange('minute')} range={ranges.minutes}>
								Minute
						</PickerCell>
						<PickerCell className={css.pickerRight} onChange={this.handleTimeChange('meridiem')} range={ranges.meridiem}>
								AM/PM
						</PickerCell>
					</Row>
				</Cell>
				<Cell size="30%" shrink>
					<Button onClick={this.onSave}>Save</Button>
				</Cell>
			</Row>
		);
	}
}

const DateTimePicker = Skinnable(DateTimePickerBase);

export default DateTimePicker;
export {
	DateTimePicker,
	DateTimePickerBase
};
