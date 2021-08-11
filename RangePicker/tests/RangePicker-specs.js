import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {RangePicker, RangePickerBase} from '../RangePicker';

const decrement = (value) => userEvent.click(screen.getByLabelText(`${value} decrease the value`));
const increment = (value) => userEvent.click(screen.getByLabelText(`${value} increase the value`));

describe('RangePicker Specs', () => {
	test('should render a single child with the current value', () => {
		render(<RangePicker max={20} min={-10} value={10} />);
		const pickerValue =	screen.getByRole('spinbutton');

		const expected = '10';

		expect(pickerValue).toHaveTextContent(expected);
	});

	test('should increase by step amount on increment press', () => {
		render(<RangePicker defaultValue={10} max={100} min={0} noAnimation step={1} />);

		increment(10);

		const expected = '11';
		const actual =	screen.getByRole('spinbutton');

		expect(actual).toHaveTextContent(expected);
	});

	test('should decrease by step amount on decrement press', () => {
		render(<RangePicker defaultValue={10} max={100} min={0} noAnimation step={1} />);

		decrement(10);

		const expected = '9';
		const actual =	screen.getByRole('spinbutton');

		expect(actual).toHaveTextContent(expected);
	});

	test('should be disabled when limited to a single value', () => {
		render(<RangePickerBase max={0} min={0} value={0} />);
		const pickerPreviousValue = screen.getByLabelText('0 decrease the value');
		const pickerNextValue = screen.getByLabelText('0 increase the value');

		const expectedAttribute = 'disabled';

		expect(pickerPreviousValue).toHaveAttribute(expectedAttribute);
		expect(pickerNextValue).toHaveAttribute(expectedAttribute);
	});
});
