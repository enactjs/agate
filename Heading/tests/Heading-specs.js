import '@testing-library/jest-dom';
import {act, render, screen} from '@testing-library/react';

import Heading from '../Heading';

const longHeading = 'A long heading that should start scrolling as soon as it renders, with no focus needed';

const mockOverflow = () => {
	const original = global.Element.prototype.getBoundingClientRect;
	global.Element.prototype.getBoundingClientRect = function () {
		const wide = this && this.tagName === 'SPAN';
		return {width: wide ? 400 : 100, height: 20, top: 0, left: 0, bottom: 20, right: wide ? 400 : 100};
	};
	global.IntersectionObserver = class {
		disconnect () {}
		observe () {}
	};
	return () => {
		global.Element.prototype.getBoundingClientRect = original;
	};
};

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

	test('should marquee long text on render without focus', () => {
		jest.useFakeTimers();
		const restore = mockOverflow();

		render(<Heading>{longHeading}</Heading>);

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		const copies = screen.getAllByText(longHeading);

		expect(copies.some(node => node.classList.contains('animate'))).toBe(true);
		expect(copies.every(node => !node.hasAttribute('data-spotlight-focused'))).toBe(true);

		restore();
		jest.useRealTimers();
	});
});
