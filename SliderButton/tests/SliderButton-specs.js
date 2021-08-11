import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import SliderButton from '../SliderButton';

const children = ['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed'];

const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('SliderButton Specs', () => {
	test('should emit an onChange event when changing to value 1', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		activate(sliderButton);
		rightKeyDown(sliderButton);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should set "aria-valueText" to text when value is changed to the 2nd item', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		activate(sliderButton);
		rightKeyDown(sliderButton);

		expect(sliderButton).toHaveAttribute('aria-valuetext', 'Ridiculous Speed');
	});

	test('should set "aria-valueText" to text when value is changed to the 3rd item', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		activate(sliderButton);
		rightKeyDown(sliderButton);
		rightKeyDown(sliderButton);

		expect(sliderButton).toHaveAttribute('aria-valuetext', 'Ludicrous Speed');
	});

	test('should set "aria-valueText" to text when value is changed to the 1st item', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		activate(sliderButton);

		expect(sliderButton).toHaveAttribute('aria-valuetext', 'Light Speed');
	});

	test('should not emit onChange event when disabled', () => {
		const handleChange = jest.fn();
		render(<SliderButton disabled onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		activate(sliderButton);
		rightKeyDown(sliderButton);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should change value on arrow right key press', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		rightKeyDown(sliderButton);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should change value on arrow left press', () => {
		const handleChange = jest.fn();
		render(<SliderButton onChange={handleChange}>{children}</SliderButton>);
		const sliderButton = screen.getByRole('slider');

		leftKeyDown(sliderButton);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});
});
