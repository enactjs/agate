import {fireEvent, render, screen} from '@testing-library/react';
import FanSpeedControl from '../FanSpeedControl';

describe('FanSpeedControl Specs', () => {
	test('should change value when navigating to certain arc segment', () => {
		const handleChange = jest.fn();
		render(<FanSpeedControl max={10} min={1} onChange={handleChange} />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});
		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const expected = 3;
		const actual = handleChange.mock.calls[1][0].value;
		expect(actual).toBe(expected);

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});
		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});
		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const secondExpected = 6;
		const secondActual = handleChange.mock.calls[4][0].value;
		expect(secondActual).toBe(secondExpected);
	});

	test('should not call onChange handler when disabled', () => {
		const handleChange = jest.fn();
		render(<FanSpeedControl disabled max={10} min={1} onChange={handleChange} />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});
});
