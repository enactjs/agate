import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioItem from '../RadioItem';

describe('RadioItem', () => {
	test('should support adding text as children', () => {
		render(<RadioItem>Hello RadioItem</RadioItem>);
		const textField = screen.getByRole('checkbox').lastElementChild;

		const expected = 'Hello RadioItem';

		expect(textField).toHaveTextContent(expected);
	});

	test('should render correct icon when not selected', () => {
		render(<RadioItem>Hello RadioItem</RadioItem>);

		const expected = 983071; // decimal converted charCode of Unicode 'circle' character used by agate
		const actual = screen.getByRole('checkbox').firstElementChild.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		render(<RadioItem selected>Hello RadioItem</RadioItem>);

		const expected = 983071; // decimal converted charCode of Unicode 'circle' character used by agate
		const actual = screen.getByRole('checkbox').firstElementChild.textContent.codePointAt();

		expect(actual).toBe(expected);
	});

	test('should support custom icon', () => {
		render(<RadioItem icon="check">Hello RadioItem</RadioItem>);
		const checkbox = screen.getByRole('checkbox').firstElementChild;

		const expected = '✓';

		expect(checkbox).toHaveTextContent(expected);
	});

	test('should toggle selected prop when clicked', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();
		render(<RadioItem onToggle={handleToggle}>Hello RadioItem</RadioItem>);
		const checkbox = screen.getByRole('checkbox').firstElementChild;

		await user.click(checkbox);

		const expected = true;
		const actual = handleToggle.mock.calls[0][0].selected;

		expect(actual).toBe(expected);
	});

	test('should toggle selected prop to false when initiated as selected', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();
		render(<RadioItem onToggle={handleToggle} selected>Hello RadioItem</RadioItem>);
		const checkbox = screen.getByRole('checkbox').firstElementChild;

		await user.click(checkbox);

		const expected = false;
		const actual = handleToggle.mock.calls[0][0].selected;

		expect(actual).toBe(expected);
	});

	test('should not toggle selected prop when initiated as disabled', async () => {
		const handleToggle = jest.fn();
		const user = userEvent.setup();
		render(<RadioItem disabled onToggle={handleToggle}>Hello RadioItem</RadioItem>);
		const checkbox = screen.getByRole('checkbox').firstElementChild;

		await user.click(checkbox);

		expect(handleToggle).not.toHaveBeenCalled();
	});
});
