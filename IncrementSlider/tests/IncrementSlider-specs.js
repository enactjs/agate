import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IncrementSlider from '../IncrementSlider';

const decrement = () => userEvent.click(screen.getAllByRole('button')[0]);
const focus = (slider) => fireEvent.focus(slider);
const increment = () => userEvent.click(screen.getAllByRole('button')[1]);
const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
};

describe('IncrementSlider Specs', () => {
	test('should decrement value', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(<IncrementSlider onChange={handleChange} value={value} />);

		decrement();

		const expected = value - 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should increment value', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(<IncrementSlider onChange={handleChange} value={value} />);

		increment();

		const expected = value + 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should only call onChange once', () => {
		const handleChange = jest.fn();
		const value = 50;
		render(<IncrementSlider onChange={handleChange} value={value} />);
		const incrementButton = screen.getAllByRole('button')[1];

		tap(incrementButton);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should not call onChange on prop change', () => {
		const handleChange = jest.fn();
		const value = 50;
		const {rerender} = render(<IncrementSlider onChange={handleChange} value={value} />);

		rerender(<IncrementSlider onChange={handleChange} value={value + 1} />);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should disable decrement button when value === min', () => {
		render(<IncrementSlider min={0} value={0} />);

		const expected = 'disabled';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute(expected);
	});

	test('should disable increment button when value === max', () => {
		render(<IncrementSlider max={10} value={10} />);

		const expected = 'disabled';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute(expected);
	});

	test('should use custom incrementIcon', () => {
		const icon = 'plus';
		render(<IncrementSlider incrementIcon={icon} />);

		const expected = '+';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveTextContent(expected);
	});

	test('should use custom decrementIcon', () => {
		const icon = 'minus';
		render(<IncrementSlider decrementIcon={icon} />);

		const expected = '-';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveTextContent(expected);
	});

	test('should set decrementButton "aria-label" to value and hint string',
		() => {
			render(<IncrementSlider value={10} />);

			const expected = '10 press button to decrease the value';
			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute('aria-label', expected);
		});

	test('should set decrementButton "aria-label" to decrementAriaLabel',
		() => {
			const label = 'decrement aria label';
			render(<IncrementSlider decrementAriaLabel={label} value={10} />);

			const expected = `10 ${label}`;
			const actual = screen.getAllByRole('button')[0];

			expect(actual).toHaveAttribute('aria-label', expected);
		});

	test('should set decrementButton "aria-label" when decrementButton is disabled', () => {
		render(<IncrementSlider disabled value={10} />);

		const expected = '10 press button to decrease the value';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton "aria-label" to value and hint string', () => {
		render(<IncrementSlider value={10} />);

		const expected = '10 press button to increase the value';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton "aria-label" to incrementAriaLabel', () => {
		const label = 'increment aria label';
		render(<IncrementSlider incrementAriaLabel={label} value={10} />);

		const expected = `10 ${label}`;
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton "aria-label" when incrementButton is disabled', () => {
		render(<IncrementSlider disabled value={10} />);

		const expected = '10 press button to increase the value';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set the tooltip to visible when focused', () => {
		render(<IncrementSlider tooltip />);
		const slider = screen.getByRole('slider');

		focus(slider);

		const actual = screen.getByText('0');
		const expected = 'tooltipLabel';

		expect(actual).toHaveClass(expected);
	});

	test('should set the tooltip to not visible when unfocused', () => {
		render(<IncrementSlider tooltip />);

		const tooltip = screen.queryByText('0');

		expect(tooltip).toBeNull();
	});
});
