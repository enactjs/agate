import React from 'react';
import {mount} from 'enzyme';
import Item from '../Item';

describe('Item Specs', () => {
	test('should render an Item with content', () => {
		const content = 'Hello Item';

		const item = mount(
			<Item>{content}</Item>
		);

		const expected = content;
		const actual = item.text();

		expect(actual).toBe(expected);
	});
});
