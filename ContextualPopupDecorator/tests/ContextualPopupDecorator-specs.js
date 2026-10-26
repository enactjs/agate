import {getPointerMode} from '@enact/spotlight/src/pointer';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import ri from '@enact/ui/resolution';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createRef, Fragment} from 'react';

import Button from '../../Button';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);

const keyDown = (keyCode) => (picker) => fireEvent.keyDown(picker, {keyCode});

const leftKeyDown = keyDown(37);

describe('ContextualPopupDecorator Specs', () => {
	beforeEach(() => {
		const rect = {
			width: 1800,
			height: 1000,
			top: 500,
			left: 500,
			bottom: 1500,
			right: 2300
		};
		global.Element.prototype.getBoundingClientRect = jest.fn(() => rect);
		global.Element.prototype.getClientRects = jest.fn(() => [rect]);
	});

	const smallContainer = {
		bottom: 10,
		height: 10,
		left: 0,
		right: 10,
		top: 0,
		width: 10
	};

	test('should position from a zero box when every client rect is empty', () => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => smallContainer);
		global.Element.prototype.getClientRects = jest.fn(() => [{
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0
		}]);
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton open popupComponent={() => 'goodbye'}>
					Hello
				</ContextualButton>
			</Root>
		);

		const top = ri.scale(18) + ri.scale(9);

		expect(screen.getByRole('alert').children[0]).toHaveStyle({top: `${top}px`});
	});

	test('should leave the popup unpositioned when the activator fragment cannot be measured', () => {
		const probe = createRef();
		const view = render(<Fragment ref={probe}><div /></Fragment>);
		const fragmentPrototype = Object.getPrototypeOf(probe.current);
		const originalGetClientRects = fragmentPrototype.getClientRects;
		delete fragmentPrototype.getClientRects;
		view.unmount();

		const Root = FloatingLayerDecorator('div');

		try {
			render(
				<Root>
					<ContextualButton open popupComponent={() => 'goodbye'}>
						Hello
					</ContextualButton>
				</Root>
			);

			expect(screen.getByRole('alert').children[0]).toHaveStyle({top: '0px'});
		} finally {
			fragmentPrototype.getClientRects = originalGetClientRects;
		}
	});

	test('should position from the union of different activator rects', () => {
		global.Element.prototype.getBoundingClientRect = jest.fn(() => smallContainer);
		global.Element.prototype.getClientRects = jest.fn(() => [
			{bottom: 10, height: 10, left: 0, right: 20, top: 0, width: 20},
			{bottom: 40, height: 10, left: 40, right: 60, top: 30, width: 20}
		]);
		const Root = FloatingLayerDecorator('div');

		render(
			<Root>
				<ContextualButton open popupComponent={() => 'goodbye'}>
					Hello
				</ContextualButton>
			</Root>
		);

		const top = 40 + ri.scale(18) + ri.scale(9);

		expect(screen.getByRole('alert').children[0]).toHaveStyle({top: `${top}px`});
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
			global.Element.prototype.getBoundingClientRect = jest.fn(() => ({
				bottom: 400,
				height: 400,
				left: 0,
				right: 100,
				top: 0,
				width: 100
			}));
			global.Element.prototype.getClientRects = jest.fn(() => [{
				bottom: 40,
				height: 40,
				left: 99,
				right: 139,
				top: 0,
				width: 40
			}]);
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

			const expected = {'right': '12px'};
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
