import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Header} from '../Header';

describe('Header', () => {
	test('should render a title when `title` prop is set', () => {
		render(<Header title="title" />);

		const expected = 'title';
		const actual = screen.getByText('title');

		expect(actual).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});

	test('should render a subtitle when `subtitle` prop is set', () => {
		render(<Header subtitle="subtitle" title="title" />);

		const expected = 'subtitle';
		const actual = screen.getByText('subtitle');

		expect(actual).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});

	test('should render a title above when `titleAbove` prop is set', () => {
		render(<Header title="title" titleAbove="title above" />);

		const expected = 'titleAbove';
		const actual = screen.getByText('title above');

		expect(actual).toBeInTheDocument();
		expect(actual).toHaveClass(expected);
	});
});
