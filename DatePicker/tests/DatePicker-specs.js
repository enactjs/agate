import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker from '../DatePicker';

// Note: Tests pass 'locale' because there's no I18nDecorator to provide a value via context and
// otherwise, nothing renders in the label.

describe('DatePicker', () => {
	test('should emit an onChange event when changing a component picker', () => {
		const handleChange = jest.fn();
		render(<DatePicker locale="en-US" onChange={handleChange} value={new Date(2000, 6, 15)} />);

		userEvent.click(screen.getByLabelText('15 day decrease the value'));

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
});
