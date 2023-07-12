import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import Droppable, {Draggable, DropManager, ResponsiveBox} from '@enact/agate/DropManager';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import {Cell, Layout} from '@enact/ui/Layout';

DropManager.displayName = 'DropManager';
const Config = mergeComponentMetadata('DropManager', Draggable, DropManager, Droppable, ResponsiveBox);

const prop = {
	orientation: {
		'landscape': 'horizontal',
		'portrait': 'vertical'
	}
};

const DraggableCell = Draggable(Cell);

const styles = {
	top: {backgroundColor: 'pink', borderRadius: '6px', marginBottom: '9px', padding: '9px'},
	center: {backgroundColor: 'wheat', borderRadius: '6px', marginBottom: '9px', padding: '9px'},
	bottom: {backgroundColor: 'lightblue', borderRadius: '6px', marginBottom: '9px', padding: '9px'},
	text: {fontWeight: 'bold', marginBottom: 0}
};

const CustomLayoutBase = ({bottom, center, top, ...rest}) => (
	<Layout {...rest} orientation="vertical">
		<DraggableCell name="top" shrink style={styles.top}>{top}</DraggableCell>
		<DraggableCell name="center" style={styles.center}>{center}</DraggableCell>
		<DraggableCell name="bottom" shrink style={styles.bottom}>{bottom}</DraggableCell>
	</Layout>
);

const CustomLayout = Droppable({slots: ['bottom', 'center', 'top']}, CustomLayoutBase);

const ResponsiveLayout = ResponsiveBox(({containerShape, ...rest}) => {
	return (
		<Layout {...rest} />
	);
});

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
			<ResponsiveLayout orientation={args['orientation']}>
				<BodyText size="small" style={styles.text}>Top container with responsive layout</BodyText>
				<BodyText size="small">Use "arrangeable" control to drag and drop containers.</BodyText>
			</ResponsiveLayout>
		</top>
		<center>
			<ResponsiveLayout orientation={args['orientation']}>
				<BodyText size="small" style={styles.text}>Center container with {args['orientation']} layout</BodyText>
				<BodyText size="small">Use "orientation" control to change layout.</BodyText>
				<Button size="small" style={{width: 'fit-content'}}>Button</Button>
			</ResponsiveLayout>
		</center>
		<bottom>
			<BodyText size="small" style={styles.text}>Bottom container with unresponsive layout</BodyText>
			<BodyText size="small">Bottom content remains vertically aligned no matter the slot's position.</BodyText>
		</bottom>
	</CustomLayout>
);

boolean('arrangeable', _DropManager, Config);
select('orientation', _DropManager, prop.orientation, Config, 'vertical');

_DropManager.storyName = 'DropManager';
_DropManager.parameters = {
	info: {
		text: 'Basic usage of DropManager'
	}
};
