import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ImageItem} from '../ImageItem';


describe('ImageItem', () => {
	const children = 'caption';

	test('should render ImageItem with children', () => {
		render(
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">
				{children}
			</ImageItem>
		);

		const actual = screen.getByText(children);

		expect(actual).toBeInTheDocument();
	});

	test('should omit caption node when `children` is unset', () => {
		render(<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" />);

		const actual = screen.getAllByRole('img')[0];

		expect(actual.nextElementSibling).toBeNull();
	});

	test('should apply `captionOverlay` className when given `captionPosition=captionOverlay`', () => {
		render(
			<ImageItem captionPosition="overlay" src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">
				{children}
			</ImageItem>
		);

		const expected = 'captionOverlay';
		const actual = screen.getByText('caption').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply horizontal className when given `orientation=horizontal`', () => {
		render(
			<ImageItem orientation="horizontal" src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">
				{children}
			</ImageItem>
		);

		const expected = 'horizontal';
		const actual = screen.getAllByRole('img')[0].parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should display an image when given `src` prop', () => {
		render(
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">
				{children}
			</ImageItem>
		);

		const expected = 'image';
		const actual = screen.getAllByRole('img')[0];

		expect(actual).toHaveClass(expected);
	});
});
