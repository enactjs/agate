import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem specs', () => {
	test('should contain a Switch', () => {
		render(<SwitchItemBase>SwitchItem</SwitchItemBase>);
		const switchButton = screen.getAllByRole('button')[1];

		const expected = 'switch';

		expect(switchButton).toHaveClass(expected);
	});

	test('should pass selected to Switch element', () => {
		render(<SwitchItemBase selected>SwitchItem</SwitchItemBase>);
		const switchButton = screen.getAllByRole('button')[1];

		const expected = 'selected';

		expect(switchButton).toHaveClass(expected);
	});

	test('should apply disabled when `disabled` prop is true', () => {
		render(<SwitchItemBase disabled>SwitchItem</SwitchItemBase>);
		const switchButton = screen.getAllByRole('button')[0];

		const expected = 'disabled';

		expect(switchButton).toHaveAttribute(expected);
	});
});
