import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Picker from '../Picker';

describe('Picker Specs', () => {
	test('should have a default `value` of 0', () => {
		render(<Picker index={0} max={0} min={0} />);
		const picker = screen.getByRole('spinbutton');

		const expectedAttribute = 'aria-valuetext';
		const expectedValue = '0';

		expect(picker).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should return an object {value: Number} of the next value when incrementing', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={5} min={0} onChange={handleChange} value={0} />);

		await user.click(screen.getByLabelText(`${0} next item`));

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should return an object {value: Number} of the next value when decrementing', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={1} min={-1} onChange={handleChange} value={0} />);

		await user.click(screen.getByLabelText(`${0} previous item`));

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should wrap to the beginning of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={0} min={-1} onChange={handleChange} value={0} wrap />);

		await user.click(screen.getByLabelText(`${0} next item`));

		const expected = -1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should wrap to the end of the value range if \'wrap\' is true', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={1} min={0} onChange={handleChange} value={0} wrap />);

		await user.click(screen.getByLabelText(`${0} previous item`));

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not run the onChange handler when disabled', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />);

		await user.click(screen.getByLabelText(`${0} next item`));

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should increment by `step` value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={6} min={0} onChange={handleChange} step={3} value={0} />);

		await user.click(screen.getByLabelText(`${0} next item`));

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by `step` value', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} />);

		await user.click(screen.getByLabelText(`${3} previous item`));

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should disable the increment button when there is no value to increment', () => {
		render(<Picker index={0} max={2} min={0} value={2} />);
		const picker = screen.getByLabelText('2 next item');

		const expected = 'disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should disable the decrement button when there is no value to decrement', () => {
		render(<Picker index={0} max={2} min={0} value={0} />);
		const picker = screen.getByLabelText('0 previous item');

		const expected = 'disabled';

		expect(picker).toHaveAttribute(expected);
	});

	test('should set custom decrement aria label', () => {
		render(<Picker decrementAriaLabel="Custom decrement aria label" index={0} max={2} min={0} value={0} />);
		const itemDecrement = screen.queryByLabelText('0 Custom decrement aria label');

		expect(itemDecrement).toBeInTheDocument();
	});

	test('should set custom increment aria label', () => {
		render(<Picker incrementAriaLabel="Custom increment aria label" index={0} max={2} min={0} value={0} />);
		const itemIncrement = screen.queryByLabelText('0 Custom increment aria label');

		expect(itemIncrement).toBeInTheDocument();
	});
});
