import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker from '../ColorPicker';

const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('ColorPicker', () => {
	test('should change value when selecting a different color', () => {
		const handleChange = jest.fn();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		userEvent.click(screen.getAllByRole('button')[0]);
		// Now click on blue color
		userEvent.click(screen.getByLabelText('blue'));

		const expected = 'blue';
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should emit an onChange event when changing hue', () => {
		const handleChange = jest.fn();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		userEvent.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		userEvent.click(screen.getByLabelText('More'));
		// Focus slider and move it with right key
		activate(screen.getAllByRole('slider')[0]);
		rightKeyDown(screen.getAllByRole('slider')[0]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing saturation', () => {
		const handleChange = jest.fn();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		userEvent.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		userEvent.click(screen.getByLabelText('More'));
		// Focus slider and move it with left key
		activate(screen.getAllByRole('slider')[1]);
		leftKeyDown(screen.getAllByRole('slider')[1]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing lightness', () => {
		const handleChange = jest.fn();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		userEvent.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		userEvent.click(screen.getByLabelText('More'));
		// Focus slider and move it with right key
		activate(screen.getAllByRole('slider')[2]);
		rightKeyDown(screen.getAllByRole('slider')[2]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should not extend palette when disabled', () => {
		const handleChange = jest.fn();
		render(
			<ColorPicker disabled onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// Extend color picker
		userEvent.click(screen.getAllByRole('button')[0]);

		// Query for the color palette
		const colorPalette = screen.queryByRole('group');

		expect(colorPalette).toBeNull();
	});
});
