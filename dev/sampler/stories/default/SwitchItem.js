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
					defaultSelected={boolean('defaultSelected', Config, true)}
					icon={select('icon', ['', ...iconNames], Config, 'music')}
				>
					{text('children', Config, 'Sound')}
				</SwitchItem>
			</div>
		),
		{
			text: 'The basic SwitchItem'
		}
	);
