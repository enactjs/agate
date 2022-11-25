import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have `selected` className', () => {
		render(<SwitchBase />);

		const unexpected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).not.toHaveClass(unexpected);
	});

	test('should have `selected` if selected prop is true', () => {
		render(<SwitchBase selected />);

		const actual = screen.getByRole('button');
		const expected = 'selected';

		expect(actual).toHaveClass(expected);
	});

	test('should have animated class by default', () => {
		render(<SwitchBase />);

		const actual = screen.getByRole('button');
		const expected = 'animated';

		expect(actual).toHaveClass(expected);
	});

	test('should not have animated class when `noAnimation` prop is true', () => {
		render(<SwitchBase noAnimation />);

		const actual = screen.getByRole('button');
		const expected = 'animated';

		expect(actual).not.toHaveClass(expected);
	});

	test('should show default icon `circle`', () => {
		render(<SwitchBase />);

		// decimal converted charCode of Unicode 'circle' character
		const expectedCode = 983071;
		const actualCode = screen.getByRole('button').children[0].textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});

	test('should show `squarelarge` icon for Carbon skin', () => {
		render(<SwitchBase skin="carbon" />);

		// decimal converted charCode of Unicode 'squarelarge' character
		const expectedCode = 11035;
		const actualCode = screen.getByRole('button').children[0].textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});
});
