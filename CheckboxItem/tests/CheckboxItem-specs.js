import React from 'react';
import {mount} from 'enzyme';
import {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		const expected = 'star';

		const subject = mount(
			<CheckboxItemBase icon={expected}>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const actual = subject.find('Checkbox').prop('children');

		expect(actual).toBe(expected);
	});
});
