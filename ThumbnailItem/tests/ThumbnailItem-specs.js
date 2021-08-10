import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {ThumbnailItemBase} from '../ThumbnailItem';

describe('ThumbnailItem Specs', () => {
	const children = 'Main content';

	test('should render a thumbnail item with content', () => {
		render(
			<ThumbnailItemBase src="https://dummyimage.com/64/e048e0/0011ff">
				{children}
			</ThumbnailItemBase>
		);

		const actual = screen.getByText(children);

		expect(actual).toHaveTextContent(children);
	});

	test('should render a label when `label` prop is set', () => {
		render(<ThumbnailItemBase label="label" src="https://dummyimage.com/64/e048e0/0011ff" />);

		const expected = 'label';
		const actual = screen.getByText('label').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should display an image when given a `src` prop', () => {
		render(
			<ThumbnailItemBase src="https://dummyimage.com/64/e048e0/0011ff">
				{children}
			</ThumbnailItemBase>
		);

		const expected = 'thumbnail';
		const actual = screen.getAllByRole('img')[0];

		expect(actual).toHaveClass(expected);
	});

	test('should apply selected style when `selected=true`', () => {
		render(
			<ThumbnailItemBase selected src="https://dummyimage.com/64/e048e0/0011ff">
				{children}
			</ThumbnailItemBase>
		);

		const expected = 'selected';
		const actual = screen.getAllByRole('img')[0].parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply `styled` className when `type=styled`', () => {
		render(
			<ThumbnailItemBase src="https://dummyimage.com/64/e048e0/0011ff" type="styled">
				{children}
			</ThumbnailItemBase>
		);

		const expected = 'styled';
		const actual = screen.getAllByRole('img')[0].parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});
});
