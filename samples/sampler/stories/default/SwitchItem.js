import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import SwitchItem from '@enact/agate/SwitchItem';

import iconNames from './icons';

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
					offText={text('offText', Config)}
					onText={text('onText', Config)}
				>
					{text('children', Config, 'Sound')}
				</SwitchItem>
			</div>
		),
		{
			info: {
				text: 'Basic usage of SwitchItem'
			}
		}
	);
