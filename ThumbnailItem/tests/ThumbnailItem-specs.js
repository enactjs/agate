import {mount} from 'enzyme';

import ThumbnailItem from '../ThumbnailItem';

import css from '../ThumbnailItem.module.less';

describe('ThumbnailItem Specs', () => {
	test('should render a thumbnail item with content', () => {
		const children = 'Main content';
		const subject = mount(
			<ThumbnailItem
				src="https://dummyimage.com/64/e048e0/0011ff"
			>
				{children}
			</ThumbnailItem>
		);

		const expected = 'Main content';
		const actual = subject.prop('children');

		expect(actual).toBe(expected);
	});

	test('should render a label when `label` prop is set', () => {
		const subject = mount(
			<ThumbnailItem
				label="label"
				src="https://dummyimage.com/64/e048e0/0011ff"
			/>
		);

		const expected = 'label';
		const actual = subject.prop('label');

		expect(actual).toBe(expected);
	});

	test('should display an image when given a `src` prop', () => {
		const children = 'Main content';
		const subject = mount(
			<ThumbnailItem
				src="https://dummyimage.com/64/e048e0/0011ff"
			>
				{children}
			</ThumbnailItem>
		);

		const expected = 'thumbnail';
		const actual = subject.find(`.${css.thumbnail}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply selected style when `selected=true`', () => {
		const children = 'Main content';
		const subject = mount(
			<ThumbnailItem
				selected
				src="https://dummyimage.com/64/e048e0/0011ff"
			>
				{children}
			</ThumbnailItem>
		);

		const expected = 'selected';
		const actual = subject.find(`.${css.selected}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply `styled` className when `type=styled`', () => {
		const children = 'Main children';
		const subject = mount(
			<ThumbnailItem
				src="https://dummyimage.com/64/e048e0/0011ff"
				type="styled"
			>
				{children}
			</ThumbnailItem>
		);

		const expected = 'styled';
		const actual = subject.find(`.${css.styled}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});
});
