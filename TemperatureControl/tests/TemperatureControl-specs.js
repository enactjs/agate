import ilib from 'ilib';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import TemperatureControl from '../TemperatureControl';

const focus = (temperatureControl) => fireEvent.focus(temperatureControl);
const keyDown = (keyCode) => (temperatureControl) => fireEvent.keyDown(temperatureControl, {keyCode});

const downKeyDown = keyDown(40);
const upKeyDown = keyDown(38);

describe('TemperatureControl', () => {

	test('should reflect disabled state to `aria-disabled`', () => {
		render(<TemperatureControl disabled />);
		const temperatureControl = screen.getByRole('slider');

		const expected = 'true';

		expect(temperatureControl).toHaveAttribute('aria-disabled', expected);
	});

	test('should call `onChange` when value is increased', () => {
		const handleChange = jest.fn();
		render(<TemperatureControl onChange={handleChange} />);
		const temperatureControl = screen.getByRole('slider');

		focus(temperatureControl);
		upKeyDown(temperatureControl);

		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];
		const expected = {type: 'onChange', value: 16};

		expect(actual).toMatchObject(expected);
	});

	test('should call `onChange` when value is decreased', () => {
		const handleChange = jest.fn();
		render(<TemperatureControl onChange={handleChange} />);
		const temperatureControl = screen.getByRole('slider');

		focus(temperatureControl);
		downKeyDown(temperatureControl);

		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];
		const expected = {type: 'onChange', value: 14};

		expect(actual).toMatchObject(expected);
	});

	test('should not call `onChange` when disabled', () => {
		const handleChange = jest.fn();
		render(<TemperatureControl disabled onChange={handleChange} />);
		const temperatureControl = screen.getByRole('slider');

		focus(temperatureControl);
		downKeyDown(temperatureControl);

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should have `#007aff` foreground color when knob is positioned on the left side', () => {
		render(<TemperatureControl value={10} />);
		const foregroundColor = screen.getByRole('slider').children.item(1).children.item(0);

		const expected = '#007aff';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	test('should have `#f24949` foreground color when knob is positioned on the right side', () => {
		render(<TemperatureControl value={25} />);
		const foregroundColor = screen.getByRole('slider').children.item(1).children.item(0);

		const expected = '#f24949';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	describe('locale', () => {
		test('should convert unit to `Fahrenheit` with default `un-US` locale', () => {
			render(<TemperatureControl />);
			const temperatureControl = screen.getByRole('slider').children.item(2).children.item(0);

			const expected = '59°F';

			expect(temperatureControl).toHaveTextContent(expected);
		});

		test('should convert unit to `Celsius` with `ko-KR` locale', () => {
			ilib.setLocale('ko-KR');
			render(<TemperatureControl />);

			const temperatureControl = screen.getByRole('slider').children.item(2).children.item(0);

			const expected = '15°C';

			expect(temperatureControl).toHaveTextContent(expected);
		});
	});
});
