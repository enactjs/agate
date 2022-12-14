import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from '@testing-library/react';

import ArcSlider from '../ArcSlider';
import {angleToValue, valueToAngle} from '../utils';

const focus = (arcSlider) => fireEvent.focus(arcSlider);
const keyDown = (keyCode) => (arcSlider) => fireEvent.keyDown(arcSlider, {keyCode});

const downKeyDown = keyDown(40);
const upKeyDown = keyDown(38);

const getElementClientCenter = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	return {x: left + width / 2, y: top + height / 2};
};
const drag = (element, {delta, steps = 1}) => {
	const from = getElementClientCenter(element);
	const to = {x: from.x + delta.x, y: from.y + delta.y};
	const step = {x: (to.x - from.x) / steps, y: (to.y - from.y) / steps};
	const current = {clientX: from.x, clientY: from.y};

	fireEvent.mouseEnter(element, current);
	fireEvent.mouseOver(element, current);
	fireEvent.mouseMove(element, current);
	fireEvent.mouseDown(element, current);
	for (let i = 0; i < steps; i++) {
		current.clientX += step.x;
		current.clientY += step.y;
		act(() => jest.advanceTimersByTime(1000 / steps));
		fireEvent.mouseMove(element, current);
	}
};

describe('ArcSlider', () => {
	beforeEach(() => {
		Object.defineProperty(global.SVGSVGElement.prototype, 'createSVGPoint', {
			writable: true,
			value: jest.fn().mockImplementation(() => ({
				x: 0,
				y: 0,
				matrixTransform: jest.fn().mockImplementation(() => ({
					x: 0,
					y: 0
				}))
			}))
		});

		Object.defineProperty(global.SVGSVGElement.prototype, 'getScreenCTM', {
			writable: true,
			value: jest.fn().mockImplementation(() => ({
				angle: 0,
				matrix: {
					a: 0.6666666666666666,
					b: 0,
					c: 0,
					d: 0.6666666666666666,
					e: 28,
					f: 139,
					multiply: jest.fn()
				},
				inverse: jest.fn().mockImplementation(() => global.SVGSVGElement)
			}))
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	test('should have `aria-valuetext` equal to value', () => {
		render(<ArcSlider value={25} />);
		const arcSlider = screen.getByRole('slider');

		const expected = '25';

		expect(arcSlider).toHaveAttribute('aria-valuetext', expected);
	});

	test('should support custom background color', () => {
		render(<ArcSlider backgroundColor="#FF0000" />);
		const backgroundColor = screen.getByRole('slider').children.item(0).children.item(0);

		const expected = '#FF0000';

		expect(backgroundColor).toHaveAttribute('stroke', expected);
	});

	test('should support custom foreground color', () => {
		render(<ArcSlider foregroundColor="#00FF00" />);
		const foregroundColor = screen.getByRole('slider').children.item(1).children.item(0);

		const expected = '#00FF00';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	test('should reflect disabled state to `aria-disabled`', () => {
		render(<ArcSlider disabled />);
		const arcSlider = screen.getByRole('slider');

		const expected = 'true';

		expect(arcSlider).toHaveAttribute('aria-disabled', expected);
	});

	test('should display a node in the center', () => {
		const node = <span>Hello</span>;
		render(<ArcSlider slotCenter={node} />);
		const slotCenter = screen.getByRole('slider').children.item(2).children.item(0);

		const expected = 'SPAN';
		const actual = slotCenter.tagName;

		expect(expected).toBe(actual);
	});

	test('should set stroke width', () => {
		render(<ArcSlider strokeWidth={10} />);
		const svgPath = screen.getByRole('slider').children.item(0).children.item(0);

		const expected = '10';

		expect(svgPath).toHaveAttribute('stroke-width', expected);
	});

	test('should call `onChange` when value is changed', () => {
		const handleChange = jest.fn();
		render(<ArcSlider onChange={handleChange} />);
		const arcSlider = screen.getByRole('slider');

		focus(arcSlider);
		upKeyDown(arcSlider);

		const expected = {type: 'onChange', value: 1};
		const actual = handleChange.mock.calls.length && handleChange.mock.calls[0][0];

		expect(actual).toMatchObject(expected);
	});

	test('should increase value on pressing arrowUp', () => {
		render(<ArcSlider />);
		const arcSlider = screen.getByRole('slider');

		focus(arcSlider);
		upKeyDown(arcSlider);
		upKeyDown(arcSlider);
		upKeyDown(arcSlider);

		const expected = '3';

		expect(arcSlider).toHaveAttribute('aria-valuetext', expected);
	});

	test('should decrease value on pressing arrowDown', () => {
		render(<ArcSlider value={10} />);
		const arcSlider = screen.getByRole('slider');

		focus(arcSlider);
		downKeyDown(arcSlider);
		downKeyDown(arcSlider);
		downKeyDown(arcSlider);

		const expected = '7';

		expect(arcSlider).toHaveAttribute('aria-valuetext', expected);
	});

	test('should change `cx` and `cy` values of `circle` on pressing arrowUp', () => {
		render(<ArcSlider />);
		const arcSlider = screen.getByRole('slider');

		const circle = screen.getByRole('slider').children.item(1).children.item(2);
		const originalCx = circle.getAttribute('cx'); // 73.49999999999996
		const originalCy = circle.getAttribute('cy'); // 274.3057343563124

		focus(arcSlider);
		upKeyDown(arcSlider);
		upKeyDown(arcSlider);
		upKeyDown(arcSlider);

		const actualCx = circle.getAttribute('cx'); // 59.354943380054436
		const actualCy = circle.getAttribute('cy'); // 265.0141688530938

		expect(originalCx).not.toBe(actualCx);
		expect(originalCy).not.toBe(actualCy);
	});

	test('should change value on mouse down', () => {
		render(<ArcSlider />);
		const arcSlider = screen.getByRole('slider');

		focus(arcSlider);

		const initialExpected = '0';

		expect(arcSlider).toHaveAttribute('aria-valuetext', initialExpected);

		fireEvent.mouseDown(arcSlider, {clientX: 10, clientY: 10});
		const expected = '48';

		expect(arcSlider).toHaveAttribute('aria-valuetext', expected);
	});

	test('should call onDragStart when dragging', async () => {
		const handleDragStart = jest.fn();
		render(<ArcSlider onDragStart={handleDragStart} />);
		const arcSlider = screen.getByRole('slider');

		focus(arcSlider);
		await drag(arcSlider, {delta: {x: 0, y: 100}});

		expect(handleDragStart).toHaveBeenCalled();
	});

	test('should have `#343434` foreground color with `carbon` skin', () => {
		render(<ArcSlider skin="carbon" />);
		const foregroundColor = screen.getByRole('slider').children.item(1).children.item(0);

		const expected = '#343434';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	test('should have `#ffffff` foreground color with night mode', () => {
		render(<ArcSlider skinVariants={{night: true}} />);
		const foregroundColor = screen.getByRole('slider').children.item(1).children.item(0);

		const expected = '#ffffff';

		expect(foregroundColor).toHaveAttribute('stroke', expected);
	});

	describe('utils', () => {
		test('should convert a given value to a corresponding angle', () => {
			const value = 25;

			const expected = 85;
			const actual = valueToAngle(value, 0, 100, 30, 250);

			expect(actual).toBe(expected);
		});

		test('should convert a given angle to a corresponding value', () => {
			const angle = 85;

			const expected = 25;
			const actual = angleToValue(angle, 0, 100, 30, 250);

			expect(actual).toBe(expected);
		});

		test('should return min if `angle` is less than `startAngle`', () => {
			const angle = 20;
			const min = 0;
			const value = angleToValue(angle, min, 100, 30, 250);

			expect(value).toBe(min);
		});

		test('should return max if `angle` is greater than `endAngle`', () => {
			const angle = 260;
			const max = 100;
			const value = angleToValue(angle, 0, max, 30, 250);

			expect(value).toBe(max);
		});
	});
});
