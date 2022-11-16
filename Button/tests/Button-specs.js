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

	test('should have \'joinedCenter\' class', () => {
		render(<ButtonBase joinedPosition="center" />);
		const button = screen.getByRole('button');

		const expected = 'joinedCenter';

		expect(button).toHaveClass(expected);
	});

	test('should have \'grid\' class', () => {
		render(<ButtonBase type="grid" />);
		const button = screen.getByRole('button');

		const expected = 'grid';

		expect(button).toHaveClass(expected);
	});

	describe('with no `minWidth`', () => {
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

	describe('with icon', () => {
		test('should have \'check\' icon when specified', () => {
			render(<Button icon="check">abc</Button>);
			const icon = screen.getByText('✓');

			expect(icon).toBeInTheDocument();
			expect(icon).toHaveClass('icon');
		});

		test('should have \'iconOnly\' class', () => {
			render(<Button icon="check" />);
			const button = screen.getByRole('button');

			expect(button).toHaveClass('iconOnly');
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

	describe('with badge', () => {
		test('should have \'badge\' with text="1"', () => {
			render(<Button badge="1" badgeColor="#986AAD">text</Button>);
			const badge = screen.getByRole('button').children[0].children[0];
			const badgeText = screen.getByText('1');

			const expected = 'badge';

			expect(badge).toHaveClass(expected);
			expect(badgeText).toBeInTheDocument();
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
