import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Heading from '../Heading';

describe('Heading Specs', () => {
	const content = 'Hello Heading!';

	test('should render a Heading with content', () => {
		render(<Heading>{content}</Heading>);
		const heading = screen.getByText(content);

		expect(heading).toBeInTheDocument();
	});

	test('should add the showLine class', () => {
		render(<Heading showLine>{content}</Heading>);
		const heading = screen.getByText(content).parentElement.parentElement;

		const expected = 'showLine';

		expect(heading).toHaveClass(expected);
	});

	test('should render a Heading with spacing large', () => {
		render(<Heading spacing="large">{content}</Heading>);
		const heading = screen.getByText(content).parentElement.parentElement;

		const expected = 'largeSpacing';

		expect(heading).toHaveClass(expected);
	});

	test('should render a Heading with spacing medium', () => {
		render(<Heading>{content}</Heading>);
		const heading = screen.getByText(content).parentElement.parentElement;

		const expected = 'mediumSpacing';

		expect(heading).toHaveClass(expected);
	});

	test('should render a Heading with spacing small', () => {
		render(<Heading spacing="small">{content}</Heading>);
		const heading = screen.getByText(content).parentElement.parentElement;

		const expected = 'smallSpacing';

		expect(heading).toHaveClass(expected);
	});

	test('should render a Heading with spacing none', () => {
		render(<Heading spacing="none">{content}</Heading>);
		const heading = screen.getByText(content).parentElement.parentElement;

		const expected = 'noneSpacing';

		expect(heading).toHaveClass(expected);
	});

	test('should show back button', () => {
		render(<Heading showBackButton>{content}</Heading>);

		const actual = screen.getByRole('button');

		expect(actual).toBeInTheDocument();
	});
});
