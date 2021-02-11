import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';

const HeaderConfig = mergeComponentMetadata('Header', Header);

export default {
	title: 'Agate/Panel',
	component: 'Panel'
}

export const _Panel = () => (
	<Panel>
		<Header
			subtitle={text('subtitle', HeaderConfig, 'Header Subtitle')}
			title={text('title', HeaderConfig, 'Header Title')}
		/>
		<Button onClick={action('onClick')}>Click me</Button>
	</Panel>
);

_Panel.storyName = 'Panel';
_Panel.parameters = {
	props: {
		noScroller: true,
		noPanel: true
	},
	text: 'The basic Panel'
};
