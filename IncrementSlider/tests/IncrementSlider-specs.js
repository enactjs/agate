import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IncrementSlider from '../IncrementSlider';

const tap = (node) => {
	fireEvent.mouseDown(node);
	fireEvent.mouseUp(node);
};

const decrement = () => userEvent.click(screen.getAllByRole('button')[0]);
const focus = (slider) => fireEvent.focus(slider);
const increment = () => userEvent.click(screen.getAllByRole('button')[1]);
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const downKeyDown = keyDown(40);
const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);
const upKeyDown = keyDown(38);

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

	test('should increment value by knobStep', () => {
		const spy = jest.fn();
		render(<IncrementSlider active defaultValue={50} knobStep={2} onChange={spy} />);

		increment();

		const expected = 52;
		const actual = spy.mock.calls[0][0].value;

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

	test('should set decrementButton `aria-label` to value and hint string', () => {
		render(<IncrementSlider value={10} />);

		const expected = '10 press button to decrease the value';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set decrementButton `aria-label` to decrementAriaLabel', () => {
		const label = 'decrement aria label';
		render(<IncrementSlider decrementAriaLabel={label} value={10} />);

		const expected = `10 ${label}`;
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set decrementButton `aria-label` when decrementButton is disabled', () => {
		render(<IncrementSlider disabled value={10} />);

		const expected = '10 press button to decrease the value';
		const actual = screen.getAllByRole('button')[0];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton `aria-label` to value and hint string', () => {
		render(<IncrementSlider value={10} />);

		const expected = '10 press button to increase the value';
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton `aria-label` to incrementAriaLabel', () => {
		const label = 'increment aria label';
		render(<IncrementSlider incrementAriaLabel={label} value={10} />);

		const expected = `10 ${label}`;
		const actual = screen.getAllByRole('button')[1];

		expect(actual).toHaveAttribute('aria-label', expected);
	});

	test('should set incrementButton `aria-label` when incrementButton is disabled', () => {
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

	describe('Directional events from IncrementSliderButtons', () => {
		test('should call onSpotlightLeft from the decrement button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightLeft={handleSpotlight} />);

			leftKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightLeft from the decrement button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightLeft={handleSpotlight} orientation="vertical" />);

			leftKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightLeft from the increment button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightLeft={handleSpotlight} orientation="vertical" />);

			leftKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightRight from the increment button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightRight={handleSpotlight} />);

			rightKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightRight from the increment button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightRight={handleSpotlight} orientation="vertical" />);

			rightKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightRight from the decrement button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightRight={handleSpotlight} orientation="vertical" />);

			rightKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightUp from the decrement button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightUp={handleSpotlight} />);

			upKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightUp from the increment button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightUp={handleSpotlight} />);

			upKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightUp from the increment button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightUp={handleSpotlight} orientation="vertical" />);

			upKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightDown from the increment button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightDown={handleSpotlight} />);

			downKeyDown(screen.getAllByRole('button')[1]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightDown from the decrement button of horizontal IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightDown={handleSpotlight} orientation="vertical" />);

			downKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightDown from the decrement button of vertical IncrementSlider', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider onSpotlightDown={handleSpotlight} orientation="vertical" />);

			downKeyDown(screen.getAllByRole('button')[0]);

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});
	});

	describe('Directional events at bounds of slider', () => {
		test('should call onSpotlightLeft from slider of horizontal IncrementSlider when value is at min', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider min={0} onSpotlightLeft={handleSpotlight} value={0} />);

			leftKeyDown(screen.getByRole('slider'));

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightRight from slider of horizontal IncrementSlider when value is at max', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider max={100} onSpotlightRight={handleSpotlight} value={100} />);

			rightKeyDown(screen.getByRole('slider'));

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightDown from slider of vertical IncrementSlider when value is at min', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider min={0} onSpotlightDown={handleSpotlight} orientation="vertical" value={0} />);

			downKeyDown(screen.getByRole('slider'));

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});

		test('should call onSpotlightUp from slider of vertical IncrementSlider when value is at max', () => {
			const handleSpotlight = jest.fn();
			render(<IncrementSlider max={100} onSpotlightUp={handleSpotlight} orientation="vertical" value={100} />);

			upKeyDown(screen.getByRole('slider'));

			const expected = 1;

			expect(handleSpotlight).toBeCalledTimes(expected);
		});
	});
});
