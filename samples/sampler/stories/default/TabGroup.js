import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import TabGroup from '@enact/agate/TabGroup';

const Config = mergeComponentMetadata('TabGroup', TabGroup);
TabGroup.displayName = 'TabGroup';

storiesOf('Agate', module)
	.add(
		'TabGroup',
		() => (
			<TabGroup
				orientation={select('orientation', ['vertical', 'horizontal'], Config, 'horizontal')}
				tabPosition={select('tabPosition', ['before', 'after'], Config, 'before')}
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			>
				<beforeTabs>
					<Button
						icon="arrowlargeleft"
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						icon="arrowlargeright"
						size="small"
						type="grid"
					/>
				</afterTabs>
			</TabGroup>
		),
		{
			text: 'The basic TabGroup'
		}
	);
