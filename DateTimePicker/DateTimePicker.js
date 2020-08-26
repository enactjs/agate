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
import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';

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

	styles: {
		css,
		className: 'dateTimePicker'
	},

	render ({...rest}) {

		return (
			<Row {...rest} className={css.dateTimePicker} align="center center">
				<Cell>
					<Row align="center center">
						<TimePicker />
					</Row>
				</Cell>
				<Cell>
					<Row align="center center">
						<DatePicker />
					</Row>
				</Cell>
			</Row>
		);
	}
});

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
