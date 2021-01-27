import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';

Panel.displayName = 'Panel';
const HeaderConfig = mergeComponentMetadata('Header', Header);

storiesOf('Agate', module)
	.add(
		'Panel',
		() => (
			<Panel>
				<Header
					subtitle={text('subtitle', HeaderConfig, 'Header Subtitle')}
					title={text('title', HeaderConfig, 'Header Title')}
				/>
				<Button onClick={action('onClick')}>Click me</Button>
			</Panel>
		),
		{
			props: {
				noScroller: true,
				noPanel: true
			},
			text: 'The basic Panel'
		}
	);
