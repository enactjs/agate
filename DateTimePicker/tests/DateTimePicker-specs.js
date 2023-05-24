import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker from '../DateTimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('DateTimePicker', () => {
	test('should emit an onChange event when changing a component picker', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<DateTimePicker
				locale="en-US"
				onChange={handleChange}
				value={new Date(2000, 0, 15, 12, 30)}
			/>
		);

		await user.click(screen.getByLabelText('15 day decrease the value'));

		expect(handleChange).toHaveBeenCalled();

		await user.click(screen.getByLabelText('12 hour next item'));

		const expected = 2;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<DateTimePicker locale="en-US" value={new Date(2000, 0, 1, 12, 30)} />);
		const year = screen.getAllByRole('spinbutton')[5];
		const minute = screen.getAllByRole('spinbutton')[1];

		const expectedYear = '2000';
		const expectedMinute = '30';

		expect(year).toHaveTextContent(expectedYear);
		expect(minute).toHaveTextContent(expectedMinute);
	});

	test('should set `dayAriaLabel` to day picker', () => {
		const label = 'custom day aria-label';
		render(
			<DateTimePicker
				dayAriaLabel={label}
				locale="en-US"
				value={new Date(2000, 0, 1, 12, 0)}
			/>
		);
		const dayPicker = screen.getByLabelText(label);

		const expected = '1';

		expect(dayPicker).toHaveTextContent(expected);
	});

	test('should set `monthAriaLabel` to month picker', () => {
		const label = 'custom month aria-label';
		render(
			<DateTimePicker
				locale="en-US"
				monthAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 0)}
			/>
		);
		const monthPicker = screen.getByLabelText(label);

		const expected = '1';

		expect(monthPicker).toHaveTextContent(expected);
	});

	test('should set `yearAriaLabel` to year picker', () => {
		const label = 'custom year aria-label';
		render(
			<DateTimePicker
				locale="en-US"
				value={new Date(2000, 0, 1, 12, 0)}
				yearAriaLabel={label}
			/>
		);
		const yearPicker = screen.getByLabelText(label);

		const expected = '2000';

		expect(yearPicker).toHaveTextContent(expected);
	});

	test('should set `hourAriaLabel` to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<DateTimePicker
				hourAriaLabel={label}
				locale="en-US"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByLabelText(label);

		const expected = '12';

		expect(hourPicker).toHaveTextContent(expected);
	});

	test('should set `meridiemAriaLabel` to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<DateTimePicker
				locale="en-US"
				meridiemAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const meridiemPicker = screen.getByLabelText(label);

		const expected = 'PM';

		expect(meridiemPicker).toHaveTextContent(expected);
	});

	test('should set `minuteAriaLabel` to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<DateTimePicker
				locale="en-US"
				minuteAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const minutePicker = screen.getByLabelText(label);

		const expected = '30';

		expect(minutePicker).toHaveTextContent(expected);
	});
});
