import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker, {dateToLocaleString} from '../DatePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('DatePicker', () => {
	test('should set the value to the current date when no value is provided', () => {
		render(<DatePicker locale="en-US" />);
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();

		const datePickerYear = screen.getAllByRole('spinbutton')[2].children.item(1);
		const datePickerMonth = screen.getAllByRole('spinbutton')[0].children.item(1);
		const datePickerDay = screen.getAllByRole('spinbutton')[1].children.item(1);

		expect(datePickerYear).toHaveTextContent(currentYear);
		expect(datePickerMonth).toHaveTextContent(currentMonth);
		expect(datePickerDay).toHaveTextContent(currentDay);
	});

	test('should emit an onChange event when changing the day', () => {
		const handleChange = jest.fn();
		render(<DatePicker locale="en-US" onChange={handleChange} value={new Date(2000, 6, 15)} />);

		userEvent.click(screen.getByLabelText('15 day decrease the value'));

		expect(handleChange).toHaveBeenCalled();
	});

	test('should emit an onChange event when changing the month', () => {
		const handleChange = jest.fn();
		render(<DatePicker locale="en-US" onChange={handleChange} value={new Date(2000, 6, 15)} />);

		userEvent.click(screen.getByLabelText('7 month decrease the value'));

		expect(handleChange).toHaveBeenCalled();
	});

	test('should emit an onChange event when changing the year', () => {
		const handleChange = jest.fn();
		render(<DatePicker locale="en-US" onChange={handleChange} value={new Date(2000, 6, 15)} />);

		userEvent.click(screen.getByLabelText('2000 year decrease the value'));

		expect(handleChange).toHaveBeenCalled();
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<DatePicker locale="en-US" value={new Date(2000, 0, 1)} />);
		const year = screen.getAllByRole('spinbutton')[2];

		const expected = '2000';

		expect(year).toHaveTextContent(expected);
	});

	test('should set "dayAriaLabel" to day picker', () => {
		const label = 'custom day aria-label';
		render(<DatePicker dayAriaLabel={label} locale="en-US" value={new Date(2000, 0, 1)} />);
		const dayPicker = screen.getByLabelText(label);

		const expected = '1';

		expect(dayPicker).toHaveTextContent(expected);
	});

	test('should set "monthAriaLabel" to month picker', () => {
		const label = 'custom month aria-label';
		render(<DatePicker locale="en-US" monthAriaLabel={label} value={new Date(2000, 0, 1)} />);
		const monthPicker = screen.getByLabelText(label);

		const expected = '1';

		expect(monthPicker).toHaveTextContent(expected);
	});

	test('should set "yearAriaLabel" to year picker', () => {
		const label = 'custom year aria-label';
		render(<DatePicker locale="en-US" value={new Date(2000, 0, 1)} yearAriaLabel={label} />);
		const yearPicker = screen.getByLabelText(label);

		const expected = '2000';

		expect(yearPicker).toHaveTextContent(expected);
	});

	describe('#dateToLocaleString', () => {
		test('method should convert date to a localized string', () => {
			const date = new Date(2000, 0, 1);

			const expected = 'Saturday, January 1, 2000';
			const actual = dateToLocaleString(date);

			expect(actual).toBe(expected);
		});

		test('method should return \'null\' for an invalid date', () => {
			const actual = dateToLocaleString(null);

			expect(actual).toBeNull();
		});
	});
});
