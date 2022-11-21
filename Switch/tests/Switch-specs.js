import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should not have `selected` className', () => {
		render(<SwitchBase />);

		const unexpected = 'selected';
		const actual = screen.getByRole('button');

		expect(actual).not.toHaveClass(unexpected);
	});

	test('should have `selected` if selected prop is true', () => {
		render(<Switch selected />);

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
		render(<Switch />);

		// decimal converted charCode of Unicode 'circle' character
		const expectedCode = 983071;
		const actualCode = screen.getByRole('button').children[0].textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});
});
