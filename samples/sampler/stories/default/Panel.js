import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';

Panel.displayName = 'Panel';
const HeaderConfig = mergeComponentMetadata('Header', Header);

export default {
	title: 'Agate/Panel',
	component: 'Panel'
};

export const _Panel = () => (
	<Panel>
		<Header
			subtitle={text('subtitle', HeaderConfig, 'Header Subtitle')}
			title={text('title', HeaderConfig, 'Header Title')}
		/>
		<Button>Click me</Button>
	</Panel>
);

_Panel.storyName = 'Panel';
_Panel.parameters = {
	props: {
		noScroller: true,
		noPanel: true
	},
	info: {
		text: 'The basic Panel'
	}
};
