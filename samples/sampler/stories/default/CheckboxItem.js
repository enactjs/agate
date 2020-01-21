import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import CheckboxItem from '../../../../CheckboxItem';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata('CheckboxItem', CheckboxItem);

storiesOf('Agate', module)
	.add(
		'CheckboxItem',
		() => (
			<CheckboxItem
				disabled={boolean('disabled', Config)}
				inline={boolean('inline', Config)}
				label={text('label', Config, '')}
				labelPosition={select('labelPosition', ['', 'above', 'after', 'before', 'below'], Config, '')}
				onToggle={action('onToggle')}
			>
				{text('children', Config, 'Hello CheckboxItem')}
			</CheckboxItem>
		),
		{
			info: {
				text: 'Basic usage of CheckboxItem'
			}
		}
	);
