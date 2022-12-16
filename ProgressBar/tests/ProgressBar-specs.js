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
		render(<ProgressBar progress={0.6} tooltip />);

		const actual = screen.getByRole('progressbar').textContent;
		const expected = '60%';

		expect(actual).toBe(expected);
	});

	describe('ProgressBar with horizontal orientation', () => {
		test('should have default orientation of `horizontal`', () => {
			render(<ProgressBar />);

			const actual = screen.getByRole('progressbar');
			const expected = 'horizontal';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `above after` className when position is set to `above after`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `above before` className when position is set to `above before`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `above center` className when position is set to `above center`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above center" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above center';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `above left` className when position is set to `above left`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `above right` className when position is set to `above right`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="above right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'above right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `below after` className when position is set to `below after`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `below before` className when position is set to `below before`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `below center` className when position is set to `below center`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below center" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below center';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `below left` className when position is set to `below left`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `below right` className when position is set to `below right`', () => {
			render(
				<ProgressBar>
					<ProgressBarTooltip position="below right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'below right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with default `above` className when no position is set', () => {
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

		test('should have tooltip with `after` className when position is set to `after`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="after" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'after';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `before` className when position is set to `before`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="before" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'before';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `left` className when position is set to `left`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="left" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'left';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with `right` className when position is set to `right`', () => {
			render(
				<ProgressBar orientation="vertical">
					<ProgressBarTooltip position="right" />
				</ProgressBar>
			);

			const actual = screen.getByRole('progressbar').children.item(1);
			const expected = 'right';

			expect(actual).toHaveClass(expected);
		});

		test('should have tooltip with default `after` className when no position is set', () => {
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
