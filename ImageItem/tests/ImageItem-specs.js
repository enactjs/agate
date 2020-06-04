import React from 'react';
import {mount} from 'enzyme';
import {ImageItem} from '../ImageItem';
import css from '../ImageItem.module.less';

describe('ImageItem', () => {
	test('should render ImageItem with children', () => {
		const children = 'caption';

		const subject = mount(
			<ImageItem>{children}</ImageItem>
		);
		const expected = children;
		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test('should omit caption node when `children` is unset', () => {
		const subject = mount(
			<ImageItem />
		);

		const actual = subject.find(`.${css.caption}`);

		expect(actual).toHaveLength(0);
	});
});
