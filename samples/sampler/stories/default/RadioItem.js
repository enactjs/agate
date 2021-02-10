import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import RadioItem from '@enact/agate/RadioItem';

import {iconList} from './icons';

const Config = mergeComponentMetadata('RadioItem', RadioItem);
RadioItem.displayName = 'RadioItem';

storiesOf('Agate', module)
	.add(
		'RadioItem',
		() => (
			<div>
				<RadioItem
					disabled={boolean('disabled', Config)}
					icon={select('icon', ['', ...iconNames], Config)}
					onToggle={action('onToggle')}
				>
					{text('children', Config, 'Hello RadioItem')}
				</RadioItem>
			</div>
		),
		{
			text: 'The basic RadioItem'
		}
	);
