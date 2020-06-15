import React from 'react';
import {mount} from 'enzyme';

import Picker from '../Picker';
import css from '../Picker.module.less';

const decrement = (picker) => picker.find(`.${css.itemDecrement}`).first().simulate('click');
const increment = (picker) => picker.find(`.${css.itemIncrement}`).first().simulate('click');

describe('Picker Specs', () => {

	test('should have a default \'value\' of 0', () => {
		const picker = mount(
			<Picker index={0} max={0} min={0} />
		);

		const expected = 0;
		const actual = picker.find('Picker').prop('value');

		expect(actual).toBe(expected);
	});

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the increment <div>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={5} min={0} value={0} onChange={handleChange} />
			);

			increment(picker);

			const expected = 1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test(
		'should return an object {value: Number} that represents the next value of the Picker component when pressing the decrement <div>',
		() => {
			const handleChange = jest.fn();
			const picker = mount(
				<Picker index={0} max={1} min={-1} value={0} onChange={handleChange} />
			);

			decrement(picker);

			const expected = -1;
			const actual = handleChange.mock.calls[0][0].value;

			expect(actual).toBe(expected);
		}
	);

	test('should not run the onChange handler when disabled', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker disabled index={0} max={0} min={0} onChange={handleChange} value={0} />
		);

		increment(picker);

		const expected = 0;
		const actual = handleChange.mock.calls.length;

		expect(actual).toBe(expected);
	});



	test('should increment by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={6} min={0} onChange={handleChange} step={3} value={0} />
		);

		increment(picker);

		const expected = 3;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test('should decrement by \'step\' value', () => {
		const handleChange = jest.fn();
		const picker = mount(
			<Picker index={0} max={3} min={0} onChange={handleChange} step={3} value={3} />
		);

		decrement(picker);

		const expected = 0;
		const actual = handleChange.mock.calls[0][0].value;

		expect(actual).toBe(expected);
	});

	test(
		'should disable the increment button when there is no value to increment',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={2} />
			);

			const expected = true;
			const actual = picker.find(`.${css.itemIncrement}`).first().prop('disabled');

			expect(actual).toBe(expected);
		}
	);

	test(
		'should disable the decrement button when there is no value to decrement',
		() => {
			const picker = mount(
				<Picker index={0} max={2} min={0} value={0} />
			);

			const expected = true;
			const actual = picker.find(`.${css.itemDecrement}`).first().prop('disabled');

			expect(actual).toBe(expected);
		}
	);
});
