import {Layout, Cell} from '@enact/ui/Layout';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Button from '../../Button';
import Droppable, {Draggable, ResponsiveBox} from '../DropManager';

describe('DropManager Specs', () => {
	const allSlotNames = ['bottom', 'center', 'top'];
	const DraggableCell = Draggable(Cell);
	const containerShapes = {
		bottom: {orientation: 'landscape', edges: {bottom: true}},
		center: {orientation: 'landscape', edges: {top: false, bottom: false}},
		top:    {orientation: 'landscape', edges: {top: true}}
	};

	const ResponsiveLayout = ResponsiveBox(({containerShape, ...rest}) => {
		const orientation = (containerShape.orientation === 'portrait') ? 'vertical' : 'horizontal';
		const {right, left} = containerShape.edges;
		let axisAlign = 'space-evenly';
		if (left) axisAlign = 'start';
		else if (right) axisAlign = 'end';

		return (
			<Layout align={'center ' + axisAlign} orientation={orientation} {...rest} />
		);
	});

	const CustomLayoutBase = () => {
		return (
			<Layout orientation="vertical">
				<DraggableCell containerShape={containerShapes.top} name="top">top</DraggableCell>
				<ResponsiveLayout>
					<DraggableCell containerShape={containerShapes.center} name="center">center</DraggableCell>
				</ResponsiveLayout>
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

	test('should have `responsive layout` with `align-items: center` and `justify-content: space-evenly` style', () => {
		render(
			<Component arrangeable arrangement={{bottom: "bottom", center: "center", top: "top"}}>
				<top />
				<center>
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
			</Component>
		);

		const responsiveLayout = screen.getByText('center').parentElement;

		expect(responsiveLayout).toHaveStyle({'align-items': 'center', 'justify-content': 'space-evenly'});
	});
});
