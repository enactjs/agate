import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb Specs', () => {
	test('should include {index} in the payload of {onSelect}', async () => {
		const handleSelect = jest.fn();
		const user = userEvent.setup();
		render(<Breadcrumb index={3} onSelect={handleSelect} />);

		const breadcrumb = screen.getByLabelText('GO TO PREVIOUS');
		await user.click(breadcrumb);

		const expected = 3;
		const actual = handleSelect.mock.calls[0][0].index;

		expect(actual).toBe(expected);
	});

	test('should include call both the {onClick} and {onSelect} handlers on click', async () => {
		const handleSelect = jest.fn();
		const handleClick = jest.fn();
		const user = userEvent.setup();
		render(<Breadcrumb index={3} onClick={handleClick} onSelect={handleSelect} />);

		const breadCrumb = screen.getByLabelText('GO TO PREVIOUS');
		await user.click(breadCrumb);

		const expected = true;
		const actual = handleSelect.mock.calls.length === 1 &&
			handleClick.mock.calls.length === 1;

		expect(actual).toBe(expected);
	});
});
