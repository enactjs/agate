import BodyText from '@enact/agate/BodyText';
import Droppable, {Draggable, DropManager} from '@enact/agate/DropManager';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import {Cell, Layout} from '@enact/ui/Layout';

DropManager.displayName = 'DropManager';
const Config = mergeComponentMetadata('DropManager', Draggable, DropManager, Droppable);

const DraggableCell = Draggable(Cell);

const CustomLayoutBase = ({bottom, center, top, ...rest}) => (
	<Layout {...rest} orientation="vertical">
		<DraggableCell name="top" style={{backgroundColor: 'pink', borderRadius: '6px', marginBottom: '9px'}}>
			{top}
		</DraggableCell>
		<DraggableCell name="center" style={{backgroundColor: 'wheat', borderRadius: '6px', marginBottom: '9px'}}>
			{center}
		</DraggableCell>
		<DraggableCell name="bottom" style={{backgroundColor: 'lightblue', borderRadius: '6px'}}>
			{bottom}
		</DraggableCell>
	</Layout>
);

const CustomLayout = Droppable({slots: ['bottom', 'center', 'top']}, CustomLayoutBase);

export default {
	title: 'Agate/DropManager',
	component: 'DropManager'
};

export const _DropManager = (args) => (
	<CustomLayout
		arrangeable={args['arrangeable']}
		arrangement={{bottom: "bottom", center: "center", top: "top"}}
		onArrange={action('onArrange')}
	>
		<top>
			<BodyText>Top content</BodyText>
		</top>
		<center>
			<BodyText>Center content</BodyText>
		</center>
		<bottom>
			<BodyText>Bottom content</BodyText>
		</bottom>
	</CustomLayout>
);

boolean('arrangeable', _DropManager, Config);

_DropManager.storyName = 'DropManager';
_DropManager.parameters = {
	info: {
		text: 'Basic usage of DropManager'
	}
};
