import {mount} from 'enzyme';
import React from 'react';

import {RangePicker, RangePickerBase} from '../RangePicker';

import css from '../../internal/Picker/Picker.module.less';

const decrement = (picker) => picker.find(`.${css.itemDecrement}`).first().simulate('click');
const increment = (picker) => picker.find(`.${css.itemIncrement}`).first().simulate('click');

describe('RangePicker Specs', () => {
	test('should render a single child with the current value', () => {
		const picker = mount(
			<RangePicker min={-10} max={20} value={10} />
		);

		const expected = '10';
		const actual = picker.find('PickerItem').text();

		expect(actual).toBe(expected);
	});

	test('should increase by step amount on increment press', () => {
		const picker = mount(
			<RangePicker min={0} max={100} defaultValue={10} step={1} />
		);

		increment(picker);

		const expected = '11';
		const actual = picker.find('PickerItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should decrease by step amount on decrement press', () => {
		const picker = mount(
			<RangePicker min={0} max={100} defaultValue={10} step={1} />
		);

		decrement(picker);

		const expected = '9';
		const actual = picker.find('PickerItem').first().text();

		expect(actual).toBe(expected);
	});

	test('should be disabled when limited to a single value', () => {
		const picker = mount(
			<RangePickerBase min={0} max={0} value={0} />
		);

		const actual = picker.find('Picker').last().prop('disabled');
		expect(actual).toBe(true);
	});
});
