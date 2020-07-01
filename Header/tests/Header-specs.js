import {mount} from 'enzyme';
import React from 'react';

import {Header} from '../Header';

describe('Header', () => {
	test('should render a title when `title` prop is set', () => {
		const subject = mount(
			<Header title="title" />
		);

		const expected = 'title';
		const actual = subject.prop('title');

		expect(actual).toBe(expected);
	});

	test('should render a subtitle when `subtitle` prop is set', () => {
		const subject = mount(
			<Header
				title="title"
				subtitle="subtitle"
			/>
		);

		const expected = 'subtitle';
		const actual = subject.prop('subtitle');

		expect(actual).toBe(expected);
	});

	test('should render a title above when `titleAbove` prop is set', () => {
		const subject = mount(
			<Header
				title="title"
				titleAbove="title above"
			/>
		);

		const expected = 'title above';
		const actual = subject.prop('titleAbove');

		expect(actual).toBe(expected);
	});
});
