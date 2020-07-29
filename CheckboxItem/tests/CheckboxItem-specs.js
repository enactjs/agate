import React from 'react';
import {mount} from 'enzyme';
import CheckboxItem from '../CheckboxItem';
import css from '../CheckboxItem.module.less';

describe('CheckboxItem Specs', () => {
	test('should render correct icon when not selected', () => {

		const checkboxItem = mount(
			<CheckboxItem />
		);

		const expected = 0;
		const actual =  checkboxItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {

		const checkboxItem = mount(
			<CheckboxItem selected />
		);

		const expected = 1;
		const actual =  checkboxItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});
});
