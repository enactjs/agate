import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/controls';
import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import ri from '@enact/ui/resolution';

Panel.displayName = 'Panel';
const HeaderConfig = mergeComponentMetadata('Header', Header);

export default {
	title: 'Agate/Panel',
	component: 'Panel'
};

export const _Panel = (args) => (
	<div style={{minHeight: ri.scaleToRem(399)}}>
		<Panel>
			<Header
				subtitle={args['subtitle']}
				title={args['title']}
			/>
			<Button>Click me</Button>
		</Panel>
	</div>
);

text('subtitle', _Panel, HeaderConfig, 'Header Subtitle');
text('title', _Panel, HeaderConfig, 'Header Title');

_Panel.storyName = 'Panel';
_Panel.parameters = {
	props: {
		noScroller: true,
		noPanel: true,
		noPanels: true
	},
	info: {
		text: 'The basic Panel'
	}
};
