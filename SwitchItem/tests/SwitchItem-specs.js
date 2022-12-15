import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem Specs', () => {
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

	test('should have `check` icon when specified', () => {
		render(<SwitchItemBase icon="check">SwitchItem</SwitchItemBase>);
		const icon = screen.getByText('✓');

		expect(icon).toBeInTheDocument();
		expect(icon).toHaveClass('icon');
	});

	test('should show Switch with icon `squarelarge` for Carbon skin', () => {
		render(<SwitchItemBase skin="carbon" />);

		// decimal converted charCode of Unicode 'squarelarge' character
		const expectedCode = 11035;
		const actualCode = screen.getAllByRole('button')[1].children[0].textContent.codePointAt();

		expect(actualCode).toBe(expectedCode);
	});
});
