import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {IconBase as Icon} from '../Icon';

describe('Icon Specs', () => {
	test('should return the correct Unicode value for named icon \'wifi\'', function () {
		render(<Icon data-testid="icon">wifi</Icon>);

		const expected = 983059; // decimal converted charCode of Unicode 'wi-fi' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided \'star\' hex value', function () {
		render(<Icon data-testid="icon">0x0F0028</Icon>);

		const expected = 983080; // decimal converted charCode of character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided HTML entity as hex value', function () {
		render(<Icon data-testid="icon">&#x2605;</Icon>);

		const expected = 9733; // decimal converted charCode of character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should return the correct Unicode value when provided Unicode reference', function () {
		render(<Icon data-testid="icon">\u0F0028</Icon>);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support high code point Unicode values', function () {
		render(<Icon data-testid="icon">{String.fromCodePoint(0x0F0028)}</Icon>);

		const expected = 983080; // decimal converted charCode of Unicode 'star' character
		const actual = screen.getByTestId('icon').textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support preset size "smallest"', () => {
		render(<Icon data-testid="icon" size="smallest">wifi</Icon>);

		const expected = 'smallest';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "small"', () => {
		render(<Icon data-testid="icon" size="small">wifi</Icon>);

		const expected = 'small';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "large" by default', () => {
		render(<Icon data-testid="icon">wifi</Icon>);

		const expected = 'large';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});

	test('should support preset size "huge"', () => {
		render(<Icon data-testid="icon" size="huge">wifi</Icon>);

		const expected = 'huge';
		const icon = screen.getByTestId('icon');

		expect(icon).toHaveClass(expected);
	});
});
