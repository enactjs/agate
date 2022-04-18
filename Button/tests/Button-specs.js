import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, {ButtonBase} from '../Button';

describe('Button Specs', () => {
	test('should have \'disabled\' HTML attribute when \'disabled\' prop is provided', () => {
		render(<Button disabled>I am a disabled Button</Button>);
		const button = screen.getByRole('button');

		expect(button).toHaveAttribute('disabled');
	});

	test('should have default `minWidth`', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = 'minWidth';

		expect(button).toHaveClass(expected);
	});

	test('should have default `size` \'large\'', () => {
		render(<ButtonBase />);
		const button = screen.getByRole('button');

		const expected = 'large';

		expect(button).toHaveClass(expected);
	});

	describe('with no `minWidth`', function () {
		test('should not have \'minWidth\' class', () => {
			render(<ButtonBase minWidth={false} />);
			const button = screen.getByRole('button');

			const expected = 'minWidth';

			expect(button).not.toHaveClass(expected);
		});
	});

	describe('with \'transparent\' `backgroundOpacity`', () => {
		test('should have \'transparent\' class', () => {
			render(<ButtonBase backgroundOpacity="transparent" />);
			const button = screen.getByRole('button');

			const expected = 'transparent';

			expect(button).toHaveClass(expected);
		});
	});

	describe('with icon', function () {
		test('should have \'check\' icon when specified', () => {
			render(<Button icon="check">abc</Button>);
			const icon = screen.getByText('✓');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('icon');
		});

		test('should have \'iconAfter\' class with text and icon', () => {
			render(<Button icon="check" iconPosition="after">text</Button>);
			const button = screen.getByRole('button');

			const expected = 'iconAfter';

			expect(button).toHaveClass(expected);
		});

		test('should have \'iconBefore\' class with text and icon', () => {
			render(<Button icon="check" iconPosition="before">text</Button>);
			const button = screen.getByRole('button');

			const expected = 'iconBefore';

			expect(button).toHaveClass(expected);
		});
	});

	describe('events', () => {
		test('should call onClick when not disabled', () => {
			const handleClick = jest.fn();
			render(<Button onClick={handleClick}>I am not a disabled Button</Button>);
			const button = screen.getByText('I am not a disabled Button');

			userEvent.click(button);

			expect(handleClick).toBeCalled();
		});

		test('should not call onClick when disabled', () => {
			const handleClick = jest.fn();
			render(<Button disabled onClick={handleClick}>I am a disabled Button</Button>);
			const button = screen.getByText('I am a disabled Button');

			userEvent.click(button);

			expect(handleClick).not.toBeCalled();
		});
	});
});
