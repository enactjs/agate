import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import BodyText from '../BodyText';

describe('BodyText Specs', () => {
	test('should render a text', () => {
		render(<BodyText>Hello!</BodyText>);
		const bodyText = screen.getByText('Hello!');

		expect(bodyText).toBeInTheDocument();
	});

	test('should support multi-line content', () => {
		render(
			<BodyText>
				Hello!
				I am
				Multi-line
			</BodyText>
		);
		const bodyText = screen.getByText('Hello! I am Multi-line');

		const expected = 'P';
		const actual = bodyText.tagName;

		expect(actual).toBe(expected);
	});

	test('should support single-line marqueeing content when `noWrap` is true', () => {
		render(<BodyText noWrap>Hello!</BodyText>);
		const bodyText = screen.getByText('Hello!').parentElement;

		const expected = 'marquee';

		expect(bodyText).toHaveClass(expected);
	});

	test('should include the noWrap class if `noWrap` is true', () => {
		render(<BodyText noWrap>Hello!</BodyText>);
		const bodyText = screen.getByText('Hello!').parentElement.parentElement;

		const expected = 'noWrap';

		expect(bodyText).toHaveClass(expected);
	});

	test('should have small class if `size` is small', () => {
		render(<BodyText size="small">Hello!</BodyText>);
		const bodyText = screen.getByText('Hello!');

		const expected = 'small';

		expect(bodyText).toHaveClass(expected);
	});

	test('should have centered class if `centered` is true', () => {
		render(<BodyText centered>Hello!</BodyText>);
		const bodyText = screen.getByText('Hello!');

		const expected = 'centered';

		expect(bodyText).toHaveClass(expected);
	});
});
