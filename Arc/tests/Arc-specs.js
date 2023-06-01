import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Arc from '../Arc';
import {positionToAngle} from '../utils';

describe('Arc', () => {
	test('should return a svg node reference for `componentRef`', () => {
		const ref = jest.fn();
		render(<Arc componentRef={ref} />);

		const expected = 'svg';
		const actual = ref.mock.calls[0][0].nodeName;

		expect(actual).toBe(expected);
	});

	test('should have black path color by default', () => {
		render(<Arc data-testid="arc" />);
		const svgPath = screen.getByTestId('arc').children.item(0);

		const expected = '#000000';

		expect(svgPath).toHaveAttribute('stroke', expected);
	});

	test('should change path color when `color` prop is defined', () => {
		render(<Arc color="#00FF00" data-testid="arc" />);
		const svgPath = screen.getByTestId('arc').children.item(0);

		const expected = '#00FF00';

		expect(svgPath).toHaveAttribute('stroke', expected);
	});

	test('should call `onClick` when path is clicked', async () => {
		const handleClick = jest.fn();
		const user = userEvent.setup();
		render(<Arc data-testid="arc" onClick={handleClick} />);
		const clickablePath = screen.getByTestId('arc').children.item(1);

		await user.click(clickablePath);

		const expected = {type: 'click'};
		const actual = handleClick.mock.calls.length && handleClick.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should have a `stroke-width=9` by default', () => {
		render(<Arc data-testid="arc" />);
		const svgPath = screen.getByTestId('arc').children.item(0);

		const expected = '9';

		expect(svgPath).toHaveAttribute('stroke-width', expected);
	});

	test('should have a custom `stroke-width`', () => {
		render(<Arc data-testid="arc" strokeWidth={20} />);
		const svgPath = screen.getByTestId('arc').children.item(0);

		const expected = '20';

		expect(svgPath).toHaveAttribute('stroke-width', expected);
	});

	describe('utils', () => {
		test('positionToAngle should return a positive number if `x>0` and `y>0`', () => {
			const angle = positionToAngle({x: 75, y: 200}, 294);

			expect(angle).toBeGreaterThan(0);
		});

		test('positionToAngle should return a positive number if `x<0` and `y<0`', () => {
			const angle = positionToAngle({x: -75, y: -200}, 294);

			expect(angle).toBeGreaterThan(0);
		});
	});
});
