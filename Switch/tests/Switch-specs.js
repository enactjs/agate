import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Switch, {SwitchBase} from '../Switch';

describe('Switch Specs', () => {
	test('should have `selected` if selected prop is true', () => {
		render(<Switch selected />);
		const switchButton = screen.getByRole('button');

		const expected = 'selected';

		expect(switchButton).toHaveClass(expected);
	});

	test('should have animated class by default', () => {
		render(<SwitchBase />);
		const switchButton = screen.getByRole('button');

		const expected = 'animated';

		expect(switchButton).toHaveClass(expected);
	});

	test('should not have animated class when noAnimation prop is true', () => {
		render(<SwitchBase noAnimation />);
		const switchButton = screen.getByRole('button');

		const expected = 'animated';

		expect(switchButton).not.toHaveClass(expected);
	});
});
