import React from 'react';
import {mount} from 'enzyme';
import Keypad from '../Keypad';

import css from '../Keypad.module.less';

const click = (key, value) => key.find(`.${css.button}[aria-label="${value}"]`).simulate('click');

describe('Keypad Specs', () => {
	test('should add new digits on every digit click', () => {
		const handleChange = jest.fn();

		const keypad = mount(
			<Keypad onChange={handleChange} />
		);

		click(keypad, 2);
		click(keypad, 5);
		click(keypad, 7);

		const expected = '257';
		const actual = handleChange.mock.calls[2][0].value;

		expect(actual).toBe(expected);
	});

	test('should remove digits on every backspace button click', () => {
		const handleChange = jest.fn();

		const keypad = mount(
			<Keypad onChange={handleChange} />
		);

		click(keypad, 2);
		click(keypad, 5);
		click(keypad, 7);
		click(keypad, 'backspace');

		const expected = '25';
		const actual = handleChange.mock.calls[3][0].value;

		expect(actual).toBe(expected);
	});

	describe('Disabled Keypad', () => {
		test('should not run the onChange handler when disabled', () => {
			const handleChange = jest.fn();
			const keypad = mount(
				<Keypad disabled onChange={handleChange} />
			);

			click(keypad, 2);
			click(keypad, 5);
			click(keypad, 7);

			const expected = 0;
			const actual = handleChange.mock.calls.length;

			expect(actual).toBe(expected);
		});
	});
});
