import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import ProgressBar, {ProgressBarTooltip} from '../ProgressBar';

describe('ProgressBar Specs', () => {
	test('should only show tooltip when tooltip is true', () => {
		render(<ProgressBar tooltip />);

		const actual = screen.getByRole('progressbar').children.item(1);
		const expected = 'tooltip';

		expect(actual).toHaveClass(expected);
	});

	test('should have tooltip show progress as percentage', () => {
		render(<ProgressBar tooltip progress={0.6} />);

		const actual = screen.getByRole('progressbar').textContent;
		const expected = '60%';

		expect(actual).toBe(expected);
	});

	describe('ProgressBar with horizontal orientation', () => {
		test('should have default orientation of horizontal', () => {
			render(<ProgressBar />);

			const actual = screen.getByRole('progressbar');
			const expected = 'horizontal';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `above after`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `above before`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `above center`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above center" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above center';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `above left`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `above right`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `below after`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `below before`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `below center`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below center" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below center';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `below left`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `below right`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip in default position (above)', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above';

			expect(actual).toHaveClass(expected);
		});
	});

	describe('ProgressBar with vertical orientation', () => {
		test('should have vertical orientation', () => {
			render(<ProgressBar orientation="vertical" />);

			const actual = screen.getByRole('progressbar');
			const expected = 'vertical';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `after`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `before`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `left`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip `right`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip in default position (after)', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(actual).toHaveClass(expected);
		});
	});
});
