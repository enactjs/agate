import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledItem from '@enact/agate/LabeledItem';

import iconNames from './icons';

LabeledItem.displayName = 'LabeledItem';

const Config = mergeComponentMetadata('LabeledItem', LabeledItem);
storiesOf('Agate', module)
	.add(
		'LabeledItem',
		() => (
			<LabeledItem
				disabled={boolean('disabled', Config)}
				titleIcon={select('icon', ['', ...iconNames], Config, 'temperature')}
			>
				{text('children', Config, 'Hello LabeledItem')}
			</LabeledItem>
		),
		{
			text: 'Basic usage of LabeledItem'
		}
	);
