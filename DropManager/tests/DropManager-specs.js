import {Layout, Cell} from '@enact/ui/Layout';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Droppable, {Draggable} from '../DropManager';

describe('DropManager Specs', () => {
	const allSlotNames = ['bottom', 'center', 'top'];
	const DraggableCell = Draggable(Cell);
	const containerShapes = {
		bottom: {orientation: 'landscape', edges: {bottom: true}},
		center: {orientation: 'landscape', edges: {top: false, bottom: false}},
		top:    {orientation: 'landscape', edges: {top: true}}
	};

	const CustomLayoutBase = () => {
		return (
			<Layout orientation="vertical">
				<DraggableCell containerShape={containerShapes.top} name="top">top</DraggableCell>
				<DraggableCell containerShape={containerShapes.center} name="center">center</DraggableCell>
				<DraggableCell containerShape={containerShapes.bottom} name="bottom">bottom</DraggableCell>
			</Layout>
		);
	};

	const Component = Droppable({arrangingProp: 'arranging', slots: allSlotNames},
		CustomLayoutBase
	);

	test('should render `top`, `center` and `bottom` slots', () => {
		render(
			<Component arrangeable>
				<top />
				<center />
				<bottom />
			</Component>
		);

		const topSlot = screen.getByText('top');
		const centerSlot = screen.getByText('center');
		const bottomSlot = screen.getByText('bottom');

		expect(topSlot).toBeInTheDocument();
		expect(centerSlot).toBeInTheDocument();
		expect(bottomSlot).toBeInTheDocument();
	});

	test('should change `data-slot` value when changing `arrangement`', () => {
		const {rerender} = render(
			<Component arrangeable arrangement={{bottom: "bottom", center: "center", top: "top"}}>
				<top />
				<center />
				<bottom />
			</Component>
		);

		rerender(
			<Component arrangeable arrangement={{bottom: "center", center: "top", top: "bottom"}}>
				<top />
				<center />
				<bottom />
			</Component>
		);

		const topSlot = screen.getByText('top');

		expect(topSlot).toHaveAttribute('data-slot', 'bottom');
	});
});
