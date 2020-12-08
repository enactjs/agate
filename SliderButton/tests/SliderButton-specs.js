import {mount} from 'enzyme';
import React from 'react';
import SliderButton from '../SliderButton';

const children = ['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed'];

describe('SliderButton Specs', () => {
	test('should change value when clicking on the second button', () => {
		const handleChange = jest.fn();
		const evt = {value: 1};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 1;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Ridiculous Speed');
	});

	test('should change value when clicking on the third button', () => {
		const handleChange = jest.fn();
		const evt = {value: 2};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 2;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Ludicrous Speed');
	});

	test('should change value when clicking on the first button', () => {
		const handleChange = jest.fn();
		const evt = {value: 0};
		const sliderButton = mount(
			<SliderButton onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;
		expect(actual).toBe(expected);

		const valueText = sliderButton.find('SliderButton').prop('aria-valuetext');
		expect(valueText).toBe('Light Speed');
	});

	test('should not call `onChange` when disabled', () => {
		const handleChange = jest.fn();
		const evt = {value: 1};
		const sliderButton = mount(
			<SliderButton disabled onChange={handleChange}>
				{children}
			</SliderButton>
		);

		sliderButton.find('SliderButton').simulate('change', evt);

		const expected = 0;
		const actual = handleChange.mock.calls.length;
		expect(actual).toBe(expected);
	});
});
