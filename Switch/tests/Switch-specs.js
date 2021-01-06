import {mount} from 'enzyme';
import React from 'react';

import Switch from '../Switch';

describe('Switch Specs', () => {
	test('should have `selected` if selected prop is true', () => {
		const subject = mount(
			<Switch selected />
		);

		const expected = true;
		const actual = subject.find('Switch').prop('selected');

		expect(actual).toBe(expected);
	});

	// At this moment, Switch component is based on internal/ToggleIcon. After
	// Sandstone architecture sync-up, below tests need to be modified
	test('should have animated class by default', () => {
		const subject = mount(
			<Switch />
		);

		const expected = true;
		const actual = subject.find('ToggleIcon').hasClass('animated');

		expect(actual).toBe(expected);
	});

	test('should not have animated class when noAnimation prop is true', () => {
		const subject = mount(
			<Switch noAnimation />
		);

		const expected = false;
		const actual = subject.find('ToggleIcon').hasClass('animated');

		expect(actual).toBe(expected);
	});
});
