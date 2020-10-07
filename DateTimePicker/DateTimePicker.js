/**
 * An Agate-themed date/time picker component.
 *
 * @example
 * <DateTimePicker />
 *
 * @module agate/DateTimePicker
 * @exports DateTimePicker
 * @exports DateTimePickerBase
 * @exports DateTimePickerDecorator
 */

import kind from '@enact/core/kind';
import {Cell, Row} from '@enact/ui/Layout';
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

	propTypes: /** @lends agate/DateTimePicker.PickerBase.prototype */ {
		/**
		 * Disables the `DateTimePicker`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool
	},

	styles: {
		css,
		className: 'dateTimePicker'
	},

	render ({disabled, ...rest}) {

		return (
			<Row {...rest} className={css.dateTimePicker} align="center center">
				<Cell>
					<Row align="center center">
						<TimePicker css={css} disabled={disabled} />
					</Row>
				</Cell>
				<Cell>
					<Row align="center center">
						<DatePicker css={css} disabled={disabled} />
					</Row>
				</Cell>
			</Row>
		);
	}
});

/**
 * Applies Agate specific behaviors to [DateTimePicker]{@link agate/DateTimePicker.DateTimePicker} components.
 *
 * @hoc
 * @memberof agate/DateTimePicker
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DateTimePickerDecorator = compose(
	Skinnable
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
	DateTimePickerBase,
	DateTimePickerDecorator
};
