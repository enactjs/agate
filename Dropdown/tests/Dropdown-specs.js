import React from 'react';
import {mount} from 'enzyme';
import {DropdownBase} from '../Dropdown';

const title = 'Dropdown select';
const children = ['option1', 'option2', 'option3'];

describe('Dropdown', () => {
	test('should have `title`', () => {
		const dropDown = mount(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const expected = title;
		const actual = dropDown.find('.text').text();

		expect(actual).toBe(expected);
	});

	test('should have `title` that reflects `selected` option', () => {
		const selectedIndex = 1;

		const dropDown = mount(
			<DropdownBase selected={selectedIndex} title={title}>
				{children}
			</DropdownBase>
		);

		const expected = children[selectedIndex];
		const actual = dropDown.find('.text').text();

		expect(actual).toBe(expected);
	});
});