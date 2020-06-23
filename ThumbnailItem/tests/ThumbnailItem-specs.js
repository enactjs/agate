import React from 'react';
import {shallow} from 'enzyme';

import ThumbnailItem from '../ThumbnailItem';

import css from '../ThumbnailItem.module.less';

describe('ThumbnailItem Specs', () => {
	test('should apply `.content` when children is defined', () => {
		const subject = shallow(
			<ThumbnailItem>
				{'content'}
			</ThumbnailItem>
		);

		const expected = 1;
		const actual = subject.find(`.${css.content}`).length;

		expect(actual).toBe(expected);
	});

	test('should apply `.subContent` when label is defined', () => {
		const subject = shallow(
			<ThumbnailItem label="sub content" />
		);

		const expected = 1;
		const actual = subject.find(`.${css.subContent}`).length;

		expect(actual).toBe(expected);
	});

	test('should apply `.roundThumbnail` when `type=true`', () 	=> {
		const subject = shallow(
			<ThumbnailItem type="round" />
		);

		const expected = 1;
		const actual = subject.find(`.${css.roundThumbnail}`).length;

		expect(actual).toBe(expected);
	});
});
