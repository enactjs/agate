import {mount} from 'enzyme';

import {ImageItem} from '../ImageItem';

import css from '../ImageItem.module.less';

describe('ImageItem', () => {
	test('should render ImageItem with children', () => {
		const children = 'caption';

		const subject = mount(
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">
				{children}
			</ImageItem>
		);

		const expected = children;
		const actual = subject.text();

		expect(actual).toBe(expected);
	});

	test('should omit caption node when `children` is unset', () => {
		const subject = mount(
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" />
		);

		const actual = subject.find(`.${css.caption}`);

		expect(actual).toHaveLength(0);
	});

	test('should apply `captionOverlay` className when given `captionPosition=captionOverlay`', () => {
		const children = 'caption';

		const subject = mount(
			<ImageItem
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				captionPosition="overlay"
			>
				{children}
			</ImageItem>
		);

		const expected = 'captionOverlay';
		const actual = subject.find(`.${css.captionOverlay}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply horizontal className when given `orientation=horizontal`', () => {
		const children = 'caption';

		const subject = mount(
			<ImageItem
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				orientation="horizontal"
			>
				{children}
			</ImageItem>
		);

		const expected = 'horizontal';
		const actual = subject.find(`.${css.horizontal}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});

	test('should display an image when given `src` prop', () => {
		const children = 'caption';

		const subject = mount(
			<ImageItem
				src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
			>
				{children}
			</ImageItem>
		);

		const expected = 'image';
		const actual = subject.find(`.${css.image}`).at(1).prop('className');

		expect(actual).toContain(expected);
	});
});
