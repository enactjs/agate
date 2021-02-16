import React from 'react';
import {mount} from 'enzyme';
import Heading from '../Heading';

import css from '../Heading.module.less';

describe('Heading Specs', () => {

	test('should render a Heading with content', () => {
		const content = 'Hello Heading!';

		const heading = mount(
			<Heading>{content}</Heading>
		);

		const expected = content;
		const actual = heading.text();

		expect(actual).toBe(expected);
	});

	test('should add the showLine class', () => {
		const content = 'Hello Heading!';

		const heading = mount(
			<Heading showLine>
				{content}
			</Heading>
		);

		const expected = true;
		const actual = heading.find(`.${css.heading}`).at(0).hasClass(css.showLine);

		expect(actual).toBe(expected);
	});

	test('should show back button', () => {
		const content = 'Hello Heading!';

		const heading = mount(
			<Heading showBackButton>
				{content}
			</Heading>
		);

		const backButton = heading.find('Button');
		const expected = 1;
		const actual = backButton.length;

		expect(actual).toBe(expected);
	});
});
