import React from 'react';
import {shallow} from 'enzyme';

import ThumbnailItem from '../ThumbnailItem';

import css from '../ThumbnailItem.module.less';

describe('ThumbnailItem Specs', () => {
	test('should apply `.content` when content is defined', () => {
		const subject = shallow(
			<ThumbnailItem content="content" />
		);

		const expected = 1;
		const actual = subject.find(`.${css.content}`).length;

		expect(actual).toBe(expected);
	});

	test('should apply `.subContent` when subContent is defined', () => {
		const subject = shallow(
			<ThumbnailItem subContent="sub content" />
		);

		const expected = 1;
		const actual = subject.find(`.${css.subContent}`).length;

		expect(actual).toBe(expected);
	});

	test('should apply `.roundThumbnail` when `roundThumbnail=true`', () 	=> {
		const subject = shallow(
			<ThumbnailItem roundThumbnail />
		);

		const expected = 1;
		const actual = subject.find(`.${css.roundThumbnail}`).length;

		expect(actual).toBe(expected);
	});
});
