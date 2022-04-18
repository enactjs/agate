import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import LabeledIcon from '../LabeledIcon';

describe('LabeledIcon Specs', () => {
	test('should support label when given children', () => {
		render(<LabeledIcon>Hello LabeledIcon</LabeledIcon>);

		const expected = 'Hello LabeledIcon';
		const actual = screen.getByText(expected);

		expect(actual).toHaveClass('label');
	});

	test('should apply flipBoth class when flip prop equals "both"', () => {
		render(<LabeledIcon flip="both">Hello LabeledIcon</LabeledIcon>);

		const expected = 'flipBoth';
		const actual = screen.getByText('Hello LabeledIcon').previousElementSibling.children[0];

		expect(actual).toHaveClass(expected);
	});

	test('should apply flipHorizontal class when flip prop equals "horizontal"', () => {
		render(<LabeledIcon flip="horizontal">Hello LabeledIcon</LabeledIcon>);

		const expected = 'flipHorizontal';
		const actual = screen.getByText('Hello LabeledIcon').previousElementSibling.children[0];

		expect(actual).toHaveClass(expected);
	});

	test('should apply flipVertical class when flip prop equals "vertical"', () => {
		render(<LabeledIcon flip="vertical">Hello LabeledIcon</LabeledIcon>);

		const expected = 'flipVertical';
		const actual = screen.getByText('Hello LabeledIcon').previousElementSibling.children[0];

		expect(actual).toHaveClass(expected);
	});

	test('should support custom icon', () => {
		render(<LabeledIcon icon="0x0F0014">Hello LabeledIcon</LabeledIcon>);

		const expected = 983060; // decimal converted charCode of 'happyface' character
		const actual = screen.getByText('Hello LabeledIcon').previousElementSibling.children[0].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should apply inline class when inline prop is set to true', () => {
		render(<LabeledIcon inline>Hello LabeledIcon</LabeledIcon>);

		const expected = 'inline';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have above class when labelPosition prop equals "above"', () => {
		render(<LabeledIcon labelPosition="above">Hello LabeledIcon</LabeledIcon>);

		const expected = 'above';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have below class by default', () => {
		render(<LabeledIcon>Hello LabeledIcon</LabeledIcon>);

		const expected = 'below';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have before class when labelPosition prop equals "before"', () => {
		render(<LabeledIcon labelPosition="before">Hello LabeledIcon</LabeledIcon>);

		const expected = 'before';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have after class when labelPosition prop equals "after"', () => {
		render(<LabeledIcon labelPosition="after">Hello LabeledIcon</LabeledIcon>);

		const expected = 'after';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have left class when labelPosition prop equals "left"', () => {
		render(<LabeledIcon labelPosition="left">Hello LabeledIcon</LabeledIcon>);

		const expected = 'left';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should have right class when labelPosition prop equals "right"', () => {
		render(<LabeledIcon labelPosition="right">Hello LabeledIcon</LabeledIcon>);

		const expected = 'right';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply small class to Icon when size prop equals "small"', () => {
		render(<LabeledIcon size="small">Hello LabeledIcon</LabeledIcon>);

		const expected = 'small';
		const actual = screen.getByText('Hello LabeledIcon').parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply large class to Icon by default', () => {
		render(<LabeledIcon>Hello LabeledIcon</LabeledIcon>);

		const expected = 'large';
		const actual = screen.getByText('Hello LabeledIcon').previousElementSibling.children[0];

		expect(actual).toHaveClass(expected);
	});
});
