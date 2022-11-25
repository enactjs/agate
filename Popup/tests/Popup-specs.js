import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';

import Button from '../../Button';
import {Popup} from '../Popup';

const FloatingLayerController = FloatingLayerDecorator('div');

const keyUp = (keyCode) => (elm) => fireEvent.keyUp(elm, {keyCode});

const escapeKeyUp = keyUp(27);

describe('Popup specs', () => {
	test('should set role to \'alert\' by default', () => {
		render(
			<FloatingLayerController>
				<Popup open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByRole('alert');

		expect(popup).toBeInTheDocument();
	});

	test('should allow role to be overridden', () => {
		render(
			<FloatingLayerController>
				<Popup open role="dialog" />
			</FloatingLayerController>
		);

		const popup = screen.getByRole('dialog');

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
		test('should be rendered with centered content if \'centered\' is set to true', () => {
			render(
				<FloatingLayerController>
					<Popup centered open />
				</FloatingLayerController>
			);

			const expected = 'centered';
			const popup = screen.getByRole('alert');

			expect(popup).toHaveClass(expected);
		});

		test('should not be rendered with centered content if \'centered\' is set to false', () => {
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
		test('should have \'center\' class when no position is specified', () => {
			render(
				<FloatingLayerController>
					<Popup open />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'center';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'center\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="center" />
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'center';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position top', function () {
		test('should have \'top\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="top" />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'top';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'top\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="top" />
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'top';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position bottom', function () {
		test('should have \'bottom\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="bottom" />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'bottom';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'bottom\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="bottom" />
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'bottom';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position left', function () {
		test('should have \'left\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="left" />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'left';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'left\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="left" />
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'left';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position right', function () {
		test('should have \'right\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="right"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'right';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'right\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="right"><div>popup</div></Popup>
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'right';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position fullscreen', function () {
		test('should have \'fullscreen\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="fullscreen" />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');
			const expected = 'fullscreen';

			expect(popup).toHaveClass(expected);
		});

		test('should have popup transition container with \'fullscreen\' class', () => {
			render(
				<FloatingLayerController>
					<Popup open position="fullscreen" />
				</FloatingLayerController>
			);

			const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
			const expected = 'fullscreen';

			expect(transitionContainer).toHaveClass(expected);
		});
	});

	describe('with position changes dynamically', function () {
		test('should not have \'top\' class when position change from top to any other position', () => {
			const {rerender} = render(
				<FloatingLayerController>
					<Popup open position="top" />
				</FloatingLayerController>
			);

			const initialPopup = screen.getByRole('alert');
			const expected = 'top';

			expect(initialPopup).toHaveClass(expected);

			rerender(
				<FloatingLayerController>
					<Popup open position="center" />
				</FloatingLayerController>
			);

			const popup = screen.getByRole('alert');

			expect(popup).not.toHaveClass(expected);
		});
	});

	test('should close popup on escape', async () => {
		const handleClose = jest.fn();
		render(
			<FloatingLayerController>
				<Popup onClose={handleClose} open />
			</FloatingLayerController>
		);

		userEvent.keyboard('{esc}');

		await waitFor(() => {
			expect(handleClose).toHaveBeenCalled();
		});
	});

	test('should apply \'ease-in-out\' class to transition container when noAnimation is false', () => {
		render(
			<FloatingLayerController>
				<Popup open />
			</FloatingLayerController>
		);

		const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
		const expected = 'ease-in-out';

		expect(transitionContainer).toHaveClass(expected);
	});

	test('should apply \'shown\' class when visible with noAnimation', () => {
		render(
			<FloatingLayerController>
				<Popup noAnimation open />
			</FloatingLayerController>
		);

		const actual = screen.getByRole('alert').parentElement.parentElement;
		const expected = 'shown';

		expect(actual).toHaveClass(expected);
	});

	test('should show close button if \'closeButton\' is set to true', () => {
		render(
			<FloatingLayerController>
				<Popup closeButton noAnimation open />
			</FloatingLayerController>
		);

		const button = screen.getByRole('button');
		const expected = 'closeButton';

		expect(button).toHaveClass(expected);
	});

	test('should call onShow after popup with noAnimation is opened', () => {
		const handleShow = jest.fn();
		const {rerender} = render(
			<FloatingLayerController>
				<Popup noAnimation onShow={handleShow} />
			</FloatingLayerController>
		);

		rerender(
			<FloatingLayerController>
				<Popup noAnimation onShow={handleShow} open />
			</FloatingLayerController>
		);

		expect(handleShow).toHaveBeenCalled();
	});

	test('should handle onShow', () => {
		const handleShow = jest.fn();
		const PopupView = () => {
			const [openState, handleOpen] = useState(false);
			return (
				<>
					<Button alt="Normal" onClick={() => handleOpen(true)}>Open 0</Button>
					<FloatingLayerController>
						<Popup
							noAnimation
							onShow={handleShow}
							open={openState}
						>
							<span>Content</span>
						</Popup>
					</FloatingLayerController>
				</>
			);
		};

		render(<PopupView />);
		const button = screen.getByRole('button');

		userEvent.click(button);

		expect(handleShow).toHaveBeenCalled();
	});

	test('should call onHide after popup with noAnimation is closed', () => {
		const handleHide = jest.fn();
		const {rerender} = render(
			<FloatingLayerController>
				<Popup noAnimation onHide={handleHide} open />
			</FloatingLayerController>
		);

		rerender(
			<FloatingLayerController>
				<Popup noAnimation onHide={handleHide} />
			</FloatingLayerController>
		);

		expect(handleHide).toHaveBeenCalled();
	});

	test('should apply \'hidden\' class when popup closes', () => {
		const {rerender} = render(
			<FloatingLayerController>
				<Popup open />
			</FloatingLayerController>
		);

		rerender(
			<FloatingLayerController>
				<Popup />
			</FloatingLayerController>
		);

		const transitionContainer = screen.getByRole('alert').parentElement.parentElement;
		const expected = 'hidden';

		expect(transitionContainer).toHaveClass(expected);
	});

	test('should fire onClose event with type and detail info when Popup is closed', () => {
		const handleClose = jest.fn();
		render(
			<FloatingLayerController>
				<Popup onClose={handleClose} open><div>popup</div></Popup>
			</FloatingLayerController>
		);

		const popup = screen.getByText('popup');

		escapeKeyUp(popup);

		const actual = handleClose.mock.calls.length && handleClose.mock.calls[0][0];
		const expectedType = {type: 'onDismiss', detail: {inputType: 'key'}};

		expect(actual).toMatchObject(expectedType);
	});

	test('should call onClose on \'closeButton\' click', () => {
		const handleClose = jest.fn();
		render(
			<FloatingLayerController>
				<Popup closeButton noAnimation onClose={handleClose} open />
			</FloatingLayerController>
		);

		const button = screen.getByRole('button');

		userEvent.click(button);

		expect(handleClose).toHaveBeenCalled();
	});
});
