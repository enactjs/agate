import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TimePicker from '../TimePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('TimePicker', () => {
	// Suite-wide setup

	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		render(
			<TimePicker
				locale="en-US"
				onChange={handleChange}
				value={new Date(2000, 6, 15, 12, 30)}
			/>
		);

		userEvent.click(screen.getByLabelText('12 hour next item'));

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should accept a JavaScript Date for its value prop', () => {
		render(<TimePicker locale="en-US" value={new Date(2000, 0, 1, 12, 30)} />);
		const minute = screen.getAllByRole('spinbutton')[1];

		const expectedMinute = '30';

		expect(minute).toHaveTextContent(expectedMinute);
	});

	test('should set "hourAriaLabel" to hour picker', () => {
		const label = 'custom hour aria-label';
		render(
			<TimePicker
				hourAriaLabel={label}
				locale="en-US"
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const hourPicker = screen.getByLabelText(label);

		const expected = '12';

		expect(hourPicker).toHaveTextContent(expected);
	});

	test('should set "meridiemAriaLabel" to meridiem picker', () => {
		const label = 'custom meridiem aria-label';
		render(
			<TimePicker
				locale="en-US"
				meridiemAriaLabel={label}
				value={new Date(2000, 0, 1, 12, 30)}
			/>
		);
		const meridiemPicker = screen.getByLabelText(label);

		const expected = 'PM';

		expect(meridiemPicker).toHaveTextContent(expected);
	});

	test('should set "minuteAriaLabel" to minute picker', () => {
		const label = 'custom minute aria-label';
		render(
			<TimePicker
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
