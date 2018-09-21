import React from 'react';
import Picker from '../Picker';
import Button from '../Button';
import {Cell, Column, Row} from '@enact/ui/Layout';

import css from './DateTimePicker.less';

class DateTimePicker extends React.Component {
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
		return (
			<Row className={css.dateTimePicker}>
				<Cell size="70%">
					<Row>
						<Cell size="50%">
							<Row align=" center">
								<Column align="center">
									<Picker onChange={this.handleTimeChange('month')}>
										{['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
									</Picker>
									<p>Month</p>
								</Column>
								<Column align="center">
									<Picker onChange={this.handleTimeChange('day')}>
										{['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']}
									</Picker>
									<p>Day</p>
								</Column>
								<Column align="center">
									<Picker onChange={this.handleTimeChange('year')}>
										{['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027']}
									</Picker>
									<p>Year</p>
								</Column>
							</Row>
						</Cell>
						<Cell size="50%">
							<Row align=" center">
								<Column align="center">
									<Picker onChange={this.handleTimeChange('hour')}>
										{['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']}
									</Picker>
									<p>Hour</p>
								</Column>
								<Column align="center">
									<Picker onChange={this.handleTimeChange('minute')}>
										{['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']}
									</Picker>
									<p>Minute</p>
								</Column>
								<Column align="center">
									<Picker onChange={this.handleTimeChange('meridiem')}>
										{['AM', 'PM']}
									</Picker>
									<p>{'AM/PM'}</p>
								</Column>
							</Row>
						</Cell>
					</Row>
				</Cell>
				<Cell size="30%">
					<Column align="end">
						<Button onClick={this.onSave}>Save</Button>
					</Column>
				</Cell>
			</Row>
		);
	}
}

export default DateTimePicker;
export {
	DateTimePicker
};
