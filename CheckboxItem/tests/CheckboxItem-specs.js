import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {CheckboxItemBase} from '../CheckboxItem';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		render(<CheckboxItemBase icon="star">Hello CheckboxItem</CheckboxItemBase>);

		const expected = 983272; // decimal converted charCode of Unicode 'star' character used by agate
		const actual = screen.getAllByRole('checkbox')[1].textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		render(<CheckboxItemBase selected />);
		const checkbox = screen.getAllByRole('checkbox')[1];

		const expected = '✓';

		expect(checkbox).toHaveTextContent(expected);
	});

	test('should include the indeterminate class when indeterminate', () => {
		render(<CheckboxItemBase indeterminate>Hello CheckboxItem</CheckboxItemBase>);
		const checkbox = screen.getAllByRole('checkbox')[1];

		const expected = 'indeterminate';

		expect(checkbox).toHaveClass(expected);
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		render(<CheckboxItemBase>Hello CheckboxItem</CheckboxItemBase>);
		const checkbox = screen.getAllByRole('checkbox')[1];

		const notExpected = 'indeterminate';

		expect(checkbox).not.toHaveClass(notExpected);
	});
});
