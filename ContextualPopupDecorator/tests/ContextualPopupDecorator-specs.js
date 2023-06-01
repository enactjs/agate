import {getPointerMode} from '@enact/spotlight/src/pointer';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../../Button';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);

const keyDown = (keyCode) => (picker) => fireEvent.keyDown(picker, {keyCode});

const leftKeyDown = keyDown(37);

describe('ContextualPopupDecorator Specs', () => {
	beforeEach(() => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => {
			return {
				width: 1800,
				height: 1000,
				top: 500,
				left: 500,
				bottom: 0,
				right: 0
			};
		});
	});

	test('should emit onOpen event with type when opening', () => {
		const handleOpen = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onOpen={handleOpen} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = 1;
		const expectedType = {type: 'onOpen'};
		const actual = handleOpen.mock.calls.length && handleOpen.mock.calls[0][0];

		expect(handleOpen).toHaveBeenCalledTimes(expected);
		expect(actual).toMatchObject(expectedType);
	});

	test('should emit onClose event when clicking on contextual button', async () => {
		const handleClose = jest.fn();
		const user = userEvent.setup();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('button');

		await user.click(contextualButton);

		expect(handleClose).toHaveBeenCalled();
	});

	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = message;
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveTextContent(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);

		const popup = screen.queryByText(message);

		expect(popup).toBeNull();
	});

	test('should show close button if `showCloseButton` is set to true', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton open popupComponent={() => message} showCloseButton>
					Hello
				</ContextualButton>
			</Root>
		);

		const button = screen.getAllByRole('button')[1];
		const expected = 'closeButton';

		expect(button).toHaveClass(expected);
	});

	test('should not close popup when clicking outside if noAutoDismiss is true', async () => {
		const handleClose = jest.fn();
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		const user = userEvent.setup();
		render(
			<Root data-testid="outsideArea">
				<ContextualButton noAutoDismiss onClose={handleClose} open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const outsideArea = screen.getByTestId('outsideArea');

		await user.click(outsideArea);

		expect(handleClose).not.toHaveBeenCalled();
	});

	test('should have `below` className when direction is set to `below`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `below center` className when direction is set to `below center`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below center" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below center';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `below left` className when direction is set to `below left`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below left" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below left';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `below right` className when direction is set to `below right`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="below right" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'below right';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `right bottom` className when direction is set to `right bottom`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right bottom" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right bottom';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `right middle` className when direction is set to `right middle`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right middle" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right middle';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `right top` className when direction is set to `right top`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="right top" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'right top';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `above` className when direction is set to `above`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `above center` className when direction is set to `above center`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above center" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above center';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `above left` className when direction is set to `above left`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above left" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above left';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `above right` className when direction is set to `above right`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="above right" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'above right';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `left bottom` className when direction is set to `left bottom`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left bottom" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left bottom';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `left middle` className when direction is set to `left middle`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left middle" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left middle';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should have `left top` className when direction is set to `left top`', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';
		render(
			<Root>
				<ContextualButton direction="left top" open popupComponent={() => message}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualPopup = screen.getByRole('alert');

		const expected = 'left top';
		const actual = contextualPopup.children.item(0);

		expect(actual).toHaveClass(expected);
	});

	describe('with overflow', () => {
		beforeEach(() => {
			global.Element.prototype.getBoundingClientRect = jest.fn(() => {
				return {
					width: 501,
					height: 501,
					top: 0,
					left: 99,
					bottom: 0,
					right: 0
				};
			});
		});

		test('should have `below` className when direction is set to `above` but popup overflows', () => {
			const Root = FloatingLayerDecorator('div');
			const message = 'goodbye';
			render(
				<Root>
					<ContextualButton direction="above" open popupComponent={() => message}>
						Hello
					</ContextualButton>
				</Root>
			);
			const contextualPopup = screen.getByRole('alert');

			const expected = 'below';
			const actual = contextualPopup.children.item(0);

			expect(actual).toHaveClass(expected);
		});
	});

	describe('with rtl', () => {
		test('should have `right` style when `rtl` prop is true and direction is `above left`', () => {
			const Root = FloatingLayerDecorator('div');
			const message = 'goodbye';
			render(
				<Root>
					<ContextualButton direction="above left" open popupComponent={() => message} rtl>
						Hello
					</ContextualButton>
				</Root>
			);

			const expected = {'right': '480px'};
			const actual = screen.getByRole('alert').children[0];

			expect(actual).toHaveStyle(expected);
		});
	});

	test('should set pointerMode to be false when directional key is pressed', () => {
		const Root = FloatingLayerDecorator('div');
		render(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const contextualButton = screen.getByRole('alert');

		leftKeyDown(contextualButton);

		const expected = false;
		const pointerMode = getPointerMode();

		expect(pointerMode).toBe(expected);
	});

	test('should close popup if prop `open` is omitted on rerender', () => {
		const Root = FloatingLayerDecorator('div');
		const {rerender} = render(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const firstRender = screen.getAllByRole('button').length;
		const expectedFirst = 3;

		rerender(
			<Root>
				<ContextualButton popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const secondRender = screen.getAllByRole('button').length;
		const expectedSecond = 1;

		expect(firstRender).toBe(expectedFirst);
		expect(secondRender).toBe(expectedSecond);
	});

	test('should open popup if prop `open` is added on rerender', () => {
		const Root = FloatingLayerDecorator('div');
		const {rerender} = render(
			<Root>
				<ContextualButton popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const firstRender = screen.getAllByRole('button').length;
		const expectedFirst = 1;

		rerender(
			<Root>
				<ContextualButton open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);
		const secondRender = screen.getAllByRole('button').length;
		const expectedSecond = 3;

		expect(firstRender).toBe(expectedFirst);
		expect(secondRender).toBe(expectedSecond);
	});

	test('should capture `onKeyDown` event from outside of popup', () => {
		const handleOnKeyDown = jest.fn();
		const Root = FloatingLayerDecorator('div');
		render(
			<Root>
				<ContextualButton onKeyDown={handleOnKeyDown} open popupComponent={() => <div><Button>first</Button><Button>second</Button></div>}>
					Hello
				</ContextualButton>
			</Root>
		);

		const button = screen.getAllByRole('button')[0];
		leftKeyDown(button);

		expect(handleOnKeyDown).toHaveBeenCalled();
	});
});
