import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Keypad from '../Keypad';

describe('Keypad Specs', () => {
	test('should add new digits on every digit click', () => {
		const handleChange = jest.fn();
		render(<Keypad onChange={handleChange} />);

		userEvent.click(screen.getByLabelText('2'));
		userEvent.click(screen.getByLabelText('5'));
		userEvent.click(screen.getByLabelText('7'));

		const expected = '257';
		const actual = handleChange.mock.calls[2][0].value;

		expect(actual).toBe(expected);
	});

	test('should remove digits on every backspace button click', () => {
		const handleChange = jest.fn();
		render(<Keypad onChange={handleChange} />);

		userEvent.click(screen.getByLabelText('2'));
		userEvent.click(screen.getByLabelText('5'));
		userEvent.click(screen.getByLabelText('7'));
		userEvent.click(screen.getByLabelText('backspace'));

		const expected = '25';
		const actual = handleChange.mock.calls[3][0].value;

		expect(actual).toBe(expected);
	});

	test('should reset the digits after pressing \'phone\' key', () => {
		const handleChange = jest.fn();
		render(<Keypad onChange={handleChange} />);

		userEvent.click(screen.getByLabelText('2'));
		userEvent.click(screen.getByLabelText('5'));
		userEvent.click(screen.getByLabelText('7'));

		const expected1 = '257';
		const actual1 = handleChange.mock.calls[2][0].value;

		expect(actual1).toBe(expected1);

		userEvent.click(screen.getByLabelText('call'));

		const expected2 = '';
		const actual2 = handleChange.mock.calls[3][0].value;

		expect(actual2).toBe(expected2);
	});

	describe('Disabled Keypad', () => {
		test('should not run the onChange handler when disabled', () => {
			const handleChange = jest.fn();
			render(<Keypad disabled onChange={handleChange} />);

			userEvent.click(screen.getByLabelText('2'));
			userEvent.click(screen.getByLabelText('5'));
			userEvent.click(screen.getByLabelText('7'));

			expect(handleChange).not.toHaveBeenCalled();
		});
	});
});
