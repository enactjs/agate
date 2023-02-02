import Droppable, {Draggable} from '@enact/agate/DropManager';
import kind from '@enact/core/kind';
import {Layout, Cell} from '@enact/ui/Layout';
import PropTypes from 'prop-types';

import css from './CustomLayout.module.less';

const allSlotNames = ['bottom', 'center', 'top'];

const DraggableCell = Draggable(Cell);

const containerShapes = {
	bottom: {orientation: 'landscape', edges: {bottom: true}},
	center: {orientation: 'portrait', edges: {top: false, bottom: false}},
	top:    {orientation: 'landscape', edges: {top: true}}
};

const CustomLayoutBase = kind({
	name: 'CustomLayout',

	propTypes: {
		arranging: PropTypes.bool,
		bottom: PropTypes.node,
		center: PropTypes.node,
		children: PropTypes.node,
		top: PropTypes.node
	},

	styles: {
		css,
		className: 'customLayout'
	},

	render: ({arranging, bottom, center, top, ...rest}) => {
		return (
			<Layout {...rest} orientation="vertical">
				<Cell shrink>
					<Layout>
						{top || arranging ? <DraggableCell containerShape={containerShapes.top} name="top">{top}</DraggableCell> : null}
					</Layout>
				</Cell>
				<Cell shrink>
					<Layout>
						{center || arranging ? <DraggableCell containerShape={containerShapes.center} name="center">{center}</DraggableCell> : null}
					</Layout>
				</Cell>
				<Cell shrink>
					<Layout>
						{bottom || arranging ? <DraggableCell containerShape={containerShapes.bottom} name="bottom">{bottom}</DraggableCell> : null}
					</Layout>
				</Cell>
			</Layout>
		);
	}
});

const CustomLayout = Droppable({arrangingProp: 'arranging', slots: allSlotNames},
	CustomLayoutBase
);

export default CustomLayout;
export {
	CustomLayout
};
