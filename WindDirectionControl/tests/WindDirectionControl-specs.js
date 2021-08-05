import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import WindDirectionControl from '../WindDirectionControl';

describe('WindDirectionControl Specs', () => {
	test('should change value when navigating to the second arc segment', () => {
		const handleChange = jest.fn();
		render(<WindDirectionControl onChange={handleChange} />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const expected = 'airRight';
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should change value when navigating to the third arc segment', () => {
		const handleChange = jest.fn();
		render(<WindDirectionControl onChange={handleChange} />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});
		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const expected = 'airUp';
		const actual = handleChange.mock.calls[1][0].value;

		expect(actual).toBe(expected);
	});

	test('should change value when navigating to the first arc segment', () => {
		const handleChange = jest.fn();
		// initiate WindDirectionControl with second arc selected
		render(<WindDirectionControl onChange={handleChange} value="airRight" />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 40});

		const expected = 'airDown';
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should not call onChange handler when disabled', () => {
		const handleChange = jest.fn();
		render(<WindDirectionControl disabled onChange={handleChange} />);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});
});
