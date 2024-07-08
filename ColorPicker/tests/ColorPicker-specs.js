import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ColorPicker from '../ColorPicker';

const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});

const leftKeyDown = keyDown(37);
const rightKeyDown = keyDown(39);

describe('ColorPicker', () => {
	test('should have transitionContainer with `right` class when `direction` is set to  `left`', () => {
		render(
			<ColorPicker direction="left" open>
				{[]}
			</ColorPicker>
		);

		const actual = screen.getAllByRole('button')[0].nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable
		const expected = 'right';

		expect(actual).toHaveClass(expected);
	});

	test('should have transitionContainer with `down` class when `direction` is set to  `up`', () => {
		render(
			<ColorPicker direction="up" open>
				{[]}
			</ColorPicker>
		);

		const actual = screen.getAllByRole('button')[0].nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable
		const expected = 'down';

		expect(actual).toHaveClass(expected);
	});

	test('should have transitionContainer with `up` class when `direction` is set to  `down`', () => {
		render(
			<ColorPicker direction="down" open>
				{[]}
			</ColorPicker>
		);

		const actual = screen.getAllByRole('button')[0].nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable
		const expected = 'up';

		expect(actual).toHaveClass(expected);
	});

	test('should change value when selecting a different color', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		await user.click(screen.getAllByRole('button')[0]);
		// Now click on blue color
		await user.click(screen.getByLabelText('blue'));

		const expected = 'blue';
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should change backgroundColor of swatchButton when selecting a different color', async () => {
		const user = userEvent.setup();
		render(
			<ColorPicker>
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		await user.click(screen.getAllByRole('button')[0]);
		// Now click on blue color
		await user.click(screen.getByLabelText('blue'));

		const expected = 'blue';
		const actual = screen.getAllByRole('button')[0].children[1].children[0];

		expect(actual).toHaveClass('colorSwatch');
		expect(actual).toHaveStyle({'background-color': expected});
	});

	test('should emit an onChange event when changing hue', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		await user.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		await user.click(screen.getByLabelText('More'));
		// Focus slider and move it with right key
		activate(screen.getAllByRole('slider')[0]);
		rightKeyDown(screen.getAllByRole('slider')[0]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing saturation', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		await user.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		await user.click(screen.getByLabelText('More'));
		// Focus slider and move it with left key
		activate(screen.getAllByRole('slider')[1]);
		leftKeyDown(screen.getAllByRole('slider')[1]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should emit an onChange event when changing lightness', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// First extend color picker
		await user.click(screen.getAllByRole('button')[0]);
		// Click on the "More" button
		await user.click(screen.getByLabelText('More'));
		// Focus slider and move it with right key
		activate(screen.getAllByRole('slider')[2]);
		rightKeyDown(screen.getAllByRole('slider')[2]);

		const expected = 1;

		expect(handleChange).toHaveBeenCalledTimes(expected);
	});

	test('should close palette on second click on primary swatchButton', async () => {
		const handleChange = jest.fn();
		const user = userEvent.setup();
		render(
			<ColorPicker onChange={handleChange} value="pink">
				{['red', 'blue', 'yellow', 'pink']}
			</ColorPicker>
		);

		// Extend color picker
		await user.click(screen.getAllByRole('button')[0]);

		const actual = screen.getAllByRole('button')[0].nextElementSibling.nextElementSibling; // there is a dummy sibling by Spottable
		const expected = 'shown';

		expect(actual).toHaveClass(expected);

		// Hide color picker
		await user.click(screen.getAllByRole('button')[0]);

		expect(actual).not.toHaveClass(expected);
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
