import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Checkbox, CheckboxBase} from '../Checkbox';

describe('Checkbox Specs', () => {
	test('should render correct icon when not selected', () => {
		render(<Checkbox />);
		const checkbox = screen.getByRole('checkbox');

		const expected = '✓';

		expect(checkbox).toHaveTextContent(expected);
	});

	test('should render correct icon when selected', () => {
		render(<Checkbox selected />);
		const checkbox = screen.getByRole('checkbox');

		const expected = '✓';

		expect(checkbox).toHaveTextContent(expected);
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		render(<CheckboxBase />);
		const checkbox = screen.getByRole('checkbox');

		const notExpected = 'indeterminate';

		expect(checkbox).not.toHaveClass(notExpected);
	});

	test('should add the indeterminate class when given the indeterminate prop', () => {
		render(<CheckboxBase indeterminate />);
		const checkbox = screen.getByRole('checkbox');

		const expected = 'indeterminate';

		expect(checkbox).toHaveClass(expected);
	});

	test('should prioritize indeterminate over selected', () => {
		render(<CheckboxBase indeterminate indeterminateIcon="minus" selected>Sel</CheckboxBase>);
		const checkbox = screen.getByRole('checkbox');

		const expected = '-';

		expect(checkbox).toHaveTextContent(expected);
	});
});
