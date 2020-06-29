import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import RadioItem from '@enact/agate/RadioItem';

import iconNames from './icons';

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
				>
					{text('children', Config, 'Sound')}
				</RadioItem>
			</div>
		),
		{
			info: {
				text: 'Basic usage of RadioItem'
			}
		}
	);
