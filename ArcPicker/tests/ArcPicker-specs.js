import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import ArcPicker from '../ArcPicker';

describe('ArcPicker Specs', () => {
	test('should change value when navigating to a certain arc segment', () => {
		const handleChange = jest.fn();
		render(<ArcPicker onChange={handleChange}>{[1, 2, 3, 4]}</ArcPicker>);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const expected = 2;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});
		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		const secondExpected = 4;
		const secondActual = handleChange.mock.calls[2][0].value;

		expect(secondActual).toBe(secondExpected);
	});

	test('should not run the onChange handler when disabled', () => {
		const handleChange = jest.fn();
		render(<ArcPicker disabled onChange={handleChange}>{[1, 2, 3, 4]}</ArcPicker>);
		const arcPicker = screen.getByRole('slider');

		fireEvent.keyDown(arcPicker.children.item(1).children.item(0), {keyCode: 38});

		expect(handleChange).not.toHaveBeenCalled();
	});
});
