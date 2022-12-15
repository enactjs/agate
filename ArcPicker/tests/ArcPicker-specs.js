import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import ArcPicker from '../ArcPicker';

const blur = (arcPicker) => fireEvent.blur(arcPicker);

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

	test('should have `strokeWidth=6` by default', () => {
		render(<ArcPicker>{[1, 2, 3, 4]}</ArcPicker>);
		const arcPicker = screen.getByRole('slider');

		const expected = '6';

		expect(arcPicker).toHaveAttribute('stroke-width', expected);
	});

	test('should set `strokeWidth`', () => {
		render(<ArcPicker strokeWidth={10}>{[1, 2, 3, 4]}</ArcPicker>);
		const arcPicker = screen.getByRole('slider');

		const expected = '10';

		expect(arcPicker).toHaveAttribute('stroke-width', expected);
	});

	test('should set foreground color', () => {
		render(<ArcPicker foregroundColor="#FF0000">{[1, 2, 3, 4]}</ArcPicker>);
		const foregroundColor = screen.getByRole('slider').children.item(0).children.item(0);

		const expected = '#FF0000';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	test('should have `#343434` foreground color with `carbon` skin', async () => {
		render(<ArcPicker skin="carbon">{[1, 2, 3, 4]}</ArcPicker>);
		const arcPicker = screen.getByRole('slider');
		const foregroundColor = screen.getByRole('slider').children.item(0).children.item(0);

		// on render arcPicker is focused, so blur is called
		blur(arcPicker);

		const expected = '#343434';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	test('should have `#ffffff` foreground color with night mode', () => {
		render(<ArcPicker skinVariants={{night: true}}>{[1, 2, 3, 4]}</ArcPicker>);
		const foregroundColor = screen.getByRole('slider').children.item(0).children.item(0);

		const expected = '#ffffff';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});
});
