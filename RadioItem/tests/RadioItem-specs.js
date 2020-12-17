import {mount} from 'enzyme';
import React from 'react';

import RadioItem from '../RadioItem';

import css from '../RadioItem.module.less';

describe('RadioItem', () => {
	test('should support adding text as children', () => {
		const radioItem = mount(
			<RadioItem>
				Hello RadioItem
			</RadioItem>
		);

		const expected = 'Hello RadioItem';
		const actual = radioItem.find('ItemContent').text();

		expect(actual).toBe(expected);
	});

	test('should render correct icon when not selected', () => {
		const radioItem = mount(
			<RadioItem>
				Hello RadioItem
			</RadioItem>
		);

		const expected = 0;
		const actual = radioItem.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		const radioItem = mount(
			<RadioItem selected>
				Hello RadioItem
			</RadioItem>
		);

		const expected = 'selected';
		const actual = radioItem.find(`div.${css.selected}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should support custom icon', () => {
		const radioItem = mount(
			<RadioItem icon="check">
				Hello RadioItem
			</RadioItem>
		);

		const expected = 'check';
		const actual = radioItem.find('Icon').prop('children');

		expect(actual).toBe(expected);
	});

	test('should toggle selected prop when clicked', () => {
		const handleToggle = jest.fn();
		const radioItem = mount(
			<RadioItem onToggle={handleToggle}>
				Hello RadioItem
			</RadioItem>
		);

		radioItem.find('RadioItemBase').simulate('click');

		const expected = true;
		const actual = handleToggle.mock.calls[0][0].selected;

		expect(actual).toBe(expected);
	});

	test('should toggle selected prop to false when initiated as selected', () => {
		const handleToggle = jest.fn();
		const radioItem = mount(
			<RadioItem
				onToggle={handleToggle}
				selected
			>
				Hello RadioItem
			</RadioItem>
		);

		radioItem.find('RadioItemBase').simulate('click');

		const expected = false;
		const actual = handleToggle.mock.calls[0][0].selected;

		expect(actual).toBe(expected);
	});

	test('should not toggle selected prop when initiated as disabled', () => {
		const handleToggle = jest.fn();
		const radioItem = mount(
			<RadioItem
				disabled
				onToggle={handleToggle}
			>
				Hello RadioItem
			</RadioItem>
		);

		radioItem.find('RadioItemBase').simulate('click');

		const expected = 0;
		const actual = handleToggle.mock.calls.length;

		expect(actual).toBe(expected);
	});
});
