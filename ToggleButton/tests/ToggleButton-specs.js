import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ToggleButton from '../ToggleButton';

describe('ToggleButton', () => {
	const textChild = 'TOGGLE ME';
	const toggleOnLabel = 'IT\'S ON!';
	const toggleOffLabel = 'IT\'S OFF!';

	test('should use \'toggleOffLabel\' if toggled off and label provided', () => {
		render(<ToggleButton toggleOffLabel={toggleOffLabel}>{textChild}</ToggleButton>);

		const expected = toggleOffLabel;
		const actual = screen.getByRole('button');

		expect(actual).toHaveTextContent(expected);
	});

	test('should use \'toggleOnLabel\' if toggled on and label provided', () => {
		render(<ToggleButton selected toggleOnLabel={toggleOnLabel}>{textChild}</ToggleButton>);

		const expected = toggleOnLabel;
		const actual = screen.getByRole('button');

		expect(actual).toHaveTextContent(expected);
	});

	test('should use child node for label when \'toggleOffLabel\' is missing', () => {
		render(<ToggleButton toggleOnLabel={toggleOnLabel}>{textChild}</ToggleButton>);
		const button = screen.getByRole('button');

		expect(button).toHaveTextContent(textChild);
	});

	test('should use child node for label when \'toggleOnLabel\' is missing', () => {
		render(<ToggleButton selected toggleOffLabel={toggleOffLabel}>{textChild}</ToggleButton>);
		const button = screen.getByRole('button');

		expect(button).toHaveTextContent(textChild);
	});

	test('should set "aria-pressed" to the value of "selected"', () => {
		render(<ToggleButton selected={false} toggleOffLabel={toggleOffLabel}>{textChild}</ToggleButton>);

		const expected = 'false';
		const actual = screen.getByRole('button');

		expect(actual).toHaveAttribute('aria-pressed', expected);
	});
});
