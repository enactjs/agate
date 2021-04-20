import Panels, {Panel, Header} from '../../../../Panels';

// Panel components to show in the Panels
const PanelComponents = [
	<Panel key="p1">Hello</Panel>,
	<Panel key="p2"><Header title="Hello" />The body</Panel>,
	<Panel key="p3">Panel 3</Panel>
];

const PanelsTests = [
	{
		title: 'standard panels',
		component: <Panels>{PanelComponents}</Panels>,
		wrapper: {full: true}
	},
	{
		title: 'no close button',
		component: <Panels noCloseButton>{PanelComponents}</Panels>,
		wrapper: {full: true}
	}
];

export default PanelsTests;
