import SwitchItem from '@enact/agate/SwitchItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {boolean, select, text} from '../../src/enact-knobs';
import iconNames from './icons';
import {mergeComponentMetadata} from '../../src/utils';

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
			text: 'The basic SwitchItem'
		}
	);
