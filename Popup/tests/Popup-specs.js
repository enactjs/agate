import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import {Popup} from '../Popup';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Popup specs', () => {
	test('should set role to alert by default', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('alert');

		expect(popup).toBeInTheDocument();
	});

	test('should be rendered opened if open is set to true', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByText('popup');

		expect(popup).toBeInTheDocument();
	});

	test('should not be rendered if open is set to false', () => {
		render(
			<FloatingLayerController>
				<Popup><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.queryByText('popup');

		expect(popup).toBeNull();
	});

	describe('with centered content', function () {
		test('should be rendered with centered content if centered is set to true', () => {
			render(
				<FloatingLayerController>
					<Popup centered open />
				</FloatingLayerController>
			);

			const expected = 'centered';
			const popup = screen.getByRole('alert');

			expect(popup).toHaveClass(expected);
		});

		test('should not be rendered with centered content if centered is set to false', () => {
			render(
				<FloatingLayerController>
					<Popup open />
				</FloatingLayerController>
			);

			const expected = 'centered';
			const popup = screen.getByRole('alert');

			expect(popup).not.toHaveClass(expected);
		});
	});

	describe('with position center', function () {
		test('should have position=center when no position is specified', () => {
			render(
				<FloatingLayerController>
					<Popup open />
				</FloatingLayerController>
			);

			const expected = 'center';
			const popup = screen.getByRole('alert');

			expect(popup).toHaveClass(expected);
		});
	});

	describe('with position top', function () {
		test('should have top class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="top"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const expected = 'top';
			const popup = screen.getByRole('alert');

			expect(popup).toHaveClass(expected);
		});
	});

	describe('with position changes dynamically', function () {
		test('should not have top class when position change from top to any other position', () => {
			const {rerender} = render(
				<FloatingLayerController>
					<Popup open position="top"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const firstExpected = 'top';
			const initialPopup = screen.getByRole('alert');

			expect(initialPopup).toHaveClass(firstExpected);

			rerender(
				<FloatingLayerController>
					<Popup open position="center"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const secondExpected = 'center';
			const popup = screen.getByRole('alert');

			expect(popup).toHaveClass(secondExpected);
		});
	});

	test('should have `bottom` class when position prop is set to `bottom`', () => {
		render(
			<FloatingLayerController>
				<Popup open position="bottom" />
			</FloatingLayerController>
		);

		const expected = 'bottom';
		const popup = screen.getByRole('alert');

		expect(popup).toHaveClass(expected);
	});

	test('should have `left` class when position prop is set to `left`', () => {
		render(
			<FloatingLayerController>
				<Popup open position="left" />
			</FloatingLayerController>
		);

		const expected = 'left';
		const popup = screen.getByRole('alert');

		expect(popup).toHaveClass(expected);
	});

	test('should have `right` class when position prop is set to `right`', () => {
		render(
			<FloatingLayerController>
				<Popup open position="right" />
			</FloatingLayerController>
		);

		const expected = 'right';
		const popup = screen.getByRole('alert');

		expect(popup).toHaveClass(expected);
	});

	test('should have `fullscreen` class when position prop is set to `fullscreen`', () => {
		render(
			<FloatingLayerController>
				<Popup open position="fullscreen" />
			</FloatingLayerController>
		);

		const expected = 'fullscreen';
		const popup = screen.getByRole('alert');

		expect(popup).toHaveClass(expected);
	});
});
