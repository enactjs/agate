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

		const expected = 1;
		const actual = heading.find(`.${css.showLine}`).length;

		expect(actual).toBe(expected);
	});
});
