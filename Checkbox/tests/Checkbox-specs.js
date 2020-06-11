import React from 'react';
import {mount} from 'enzyme';
import Checkbox from '../Checkbox';
import css from '../Checkbox.module.less';

describe('Checkbox Specs', () => {
	test('should render correct icon when not selected', () => {

		const checkbox = mount(
			<Checkbox />
		);

		const expected = 0;
		const actual =  checkbox.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {

		const checkbox = mount(
			<Checkbox selected />
		);

		const expected = 1;
		const actual =  checkbox.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});
});
