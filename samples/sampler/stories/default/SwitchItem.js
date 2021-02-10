import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import SwitchItem from '@enact/agate/SwitchItem';

import {iconList} from './icons';

const Config = mergeComponentMetadata('SwitchItem', SwitchItem);
SwitchItem.displayName = 'SwitchItem';


storiesOf('Agate', module)
	.add(
		'SwitchItem',
		() => (
			<div>
				<SwitchItem
					disabled={boolean('disabled', Config)}
					icon={select('icon', ['', ...iconNames], Config, 'music')}
					switchOffLabel={text('switchOffLabel', Config)}
					switchOnLabel={text('switchOnLabel', Config)}
				>
					{text('children', Config, 'Sound')}
				</SwitchItem>
			</div>
		),
		{
			text: 'The basic SwitchItem'
		}
	);
