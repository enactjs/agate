import {Layout, Cell} from '@enact/ui/Layout';
import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import Button from '../../Button';
import Droppable, {Draggable, ResponsiveBox} from '../DropManager';

const getElementClientCenter = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	return {x: left + width / 2, y: top + height / 2};
};

describe('DropManager Specs', () => {
	const allSlotNames = ['bottom', 'center', 'top'];
	const DraggableCell = Draggable(Cell);
	const containerShapes = {
		bottom: {orientation: 'landscape', edges: {bottom: true}},
		center: {orientation: 'portrait',  edges: {top: false, bottom: false}},
		top:    {orientation: 'landscape', edges: {top: true}}
	};

	const ResponsiveLayout = ResponsiveBox(({containerShape, ...rest}) => {
		const orientation = (containerShape.orientation === 'portrait') ? 'vertical' : 'horizontal';
		let axisAlign = 'space-evenly';

		return (
			<Layout align={'center ' + axisAlign} orientation={orientation} {...rest} />
		);
	});

	const CustomResponsiveLayoutBase = ({bottom, center, top, ...rest}) => {
		return (
			<Layout {...rest} orientation="vertical">
				<DraggableCell containerShape={containerShapes.top} name="top">{top}</DraggableCell>
				<ResponsiveLayout>
					<DraggableCell containerShape={containerShapes.center} name="center">{center}</DraggableCell>
				</ResponsiveLayout>
				<DraggableCell containerShape={containerShapes.bottom} name="bottom">{bottom}</DraggableCell>
			</Layout>
		);
	};

	const CustomLayoutBase = ({bottom, center, top, ...rest}) => {
		return (
			<Layout {...rest} orientation="vertical">
				<DraggableCell containerShape={containerShapes.top} name="top">{top}</DraggableCell>
				<DraggableCell containerShape={containerShapes.center} name="center">{center}</DraggableCell>
				<DraggableCell containerShape={containerShapes.bottom} name="bottom">{bottom}</DraggableCell>
			</Layout>
		);
	};

	const ResponsiveComponent = Droppable({slots: allSlotNames}, CustomResponsiveLayoutBase);
	const Component = Droppable({slots: allSlotNames}, CustomLayoutBase);

	test('should render `top`, `center` and `bottom` slots', () => {
		console.error = jest.fn(); // eslint-disable-line no-console
		render(
			<ResponsiveComponent arrangeable>
				<top data-testid="top" />
				<center data-testid="center" />
				<bottom data-testid="bottom" />
			</ResponsiveComponent>
		);

		const topSlot = screen.getByTestId('top').parentElement;
		const centerSlot = screen.getByTestId('center').parentElement;
		const bottomSlot = screen.getByTestId('bottom').parentElement;

		expect(topSlot).toBeInTheDocument();
		expect(centerSlot).toBeInTheDocument();
		expect(bottomSlot).toBeInTheDocument();
	});

	test('should change `data-slot` value when changing `arrangement`', () => {
		const {rerender} = render(
			<ResponsiveComponent arrangeable arrangement={{bottom: 'bottom', center: 'center', top: 'top'}} data-testid="dropManager">
				<top />
				<center />
				<bottom />
			</ResponsiveComponent>
		);

		let topSlot = screen.getByTestId('dropManager').children[0];

		expect(topSlot).toHaveAttribute('data-slot', 'top');

		rerender(
			<ResponsiveComponent arrangeable arrangement={{bottom: 'center', center: 'top', top: 'bottom'}} data-testid="dropManager">
				<top />
				<center />
				<bottom />
			</ResponsiveComponent>
		);

		topSlot = screen.getByTestId('dropManager').children[0];

		expect(topSlot).toHaveAttribute('data-slot', 'bottom');
	});

	test('should have `responsive layout` with `align-items: center` and `justify-content: space-evenly` style', () => {
		render(
			<ResponsiveComponent arrangeable>
				<top />
				<center data-testid="center">
					<ResponsiveLayout>
						<Cell shrink>
							<Button>1</Button>
						</Cell>
						<Cell shrink>
							<Button>2</Button>
						</Cell>
					</ResponsiveLayout>
				</center>
				<bottom />
			</ResponsiveComponent>
		);

		const responsiveLayout = screen.getByTestId('center').parentElement.parentElement;

		expect(responsiveLayout).toHaveStyle({alignItems: 'center', justifyContent: 'space-evenly'});
	});

	test('should rearrange items on touch', () => {
		const arrangement = {bottom: 'bottom', center: 'center', top: 'top'};

		render(
			<Component arrangeable arrangement={arrangement} data-testid="dropManager">
				<top>
					<div>Drag me top</div>
				</top>
				<center>
					<div>Drag me center</div>
				</center>
				<bottom>
					<div>Drag me bottom</div>
				</bottom>
			</Component>
		);

		const topSlot = screen.getByTestId('dropManager').children[0];
		const centerSlot = screen.getByTestId('dropManager').children[1];
		const bottomSlot = screen.getByTestId('dropManager').children[2];

		topSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		centerSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 101,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		bottomSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 202,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		const delta = {x: 0, y: 160};
		const from = getElementClientCenter(topSlot);
		const to = {x: from.x + delta.x, y: from.y + delta.y};
		const step = {x: (to.x - from.x), y: (to.y - from.y)};
		const current = {clientX: from.x, clientY: from.y};

		fireEvent.touchStart(topSlot, {touches: [current]});

		document.elementFromPoint = jest.fn(() => {
			return centerSlot;
		});
		current.clientX += step.x;
		current.clientY += step.y;
		fireEvent.touchMove(topSlot, {changedTouches: [current]});

		document.elementFromPoint = jest.fn(() => {
			return bottomSlot;
		});
		current.clientX += step.x;
		current.clientY += step.y;
		fireEvent.touchMove(topSlot, {changedTouches: [current]});

		fireEvent.touchEnd(topSlot, {changedTouches: [current]});

		const firstChild = screen.getByTestId('dropManager').children.item(0);
		const thirdChild = screen.getByTestId('dropManager').children.item(2);

		expect(firstChild).toHaveAttribute('data-slot', 'bottom');
		expect(thirdChild).toHaveAttribute('data-slot', 'top');
	});

	test('should not rearrange items on touch when drop node is the same as the drag node', () => {
		const arrangement = {bottom: 'bottom', center: 'center', top: 'top'};

		render(
			<Component arrangeable arrangement={arrangement} data-testid="dropManager">
				<top>
					<div>Drag me top</div>
				</top>
				<center>
					<div>Drag me center</div>
				</center>
				<bottom>
					<div>Drag me bottom</div>
				</bottom>
			</Component>
		);

		const topSlot = screen.getByTestId('dropManager').children[0];
		const centerSlot = screen.getByTestId('dropManager').children[1];
		const bottomSlot = screen.getByTestId('dropManager').children[2];

		topSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		centerSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 101,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		bottomSlot.getBoundingClientRect = jest.fn(() => {
			return {
				width: 501,
				height: 100,
				top: 202,
				left: 0,
				bottom: 0,
				right: 0
			};
		});

		const delta = {x: 0, y: 20};
		const from = getElementClientCenter(topSlot);
		const to = {x: from.x + delta.x, y: from.y + delta.y};
		const step = {x: (to.x - from.x), y: (to.y - from.y)};
		const current = {clientX: from.x, clientY: from.y};

		fireEvent.touchStart(topSlot, {touches: [current]});

		document.elementFromPoint = jest.fn(() => {
			// returning child of slotted element for code coverage purposes
			return topSlot.children[0];
		});
		current.clientX += step.x;
		current.clientY += step.y;
		fireEvent.touchMove(topSlot, {changedTouches: [current]});

		fireEvent.touchEnd(topSlot, {changedTouches: [current]});

		const firstChild = screen.getByTestId('dropManager').children.item(0);
		const secondChild = screen.getByTestId('dropManager').children.item(1);

		expect(firstChild).toHaveAttribute('data-slot', 'top');
		expect(secondChild).toHaveAttribute('data-slot', 'center');
	});
});
