import {mount, shallow} from 'enzyme';
import React from 'react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should have `selected` if selected prop is true', () => {
		const subject = mount(
			<Switch selected />
		);

		const expected = true;
		const actual = subject.find('Switch').prop('selected');

		expect(actual).toBe(expected);
	});

	test('should have animated class by default', () => {
		const subject = shallow(
			<SwitchBase />
		);

		const expected = true;
		const actual = subject.hasClass('animated');

		expect(actual).toBe(expected);
	});

	test('should not have animated class when noAnimation prop is true', () => {
		const subject = shallow(
			<SwitchBase noAnimation />
		);

		const expected = false;
		const actual = subject.hasClass('animated');

		expect(actual).toBe(expected);
	});
});
