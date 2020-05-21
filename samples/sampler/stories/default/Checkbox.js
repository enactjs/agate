import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Checkbox from '@enact/agate/Checkbox';

Checkbox.displayName = 'Checkbox';
const Config = mergeComponentMetadata('Checkbox', Checkbox);

storiesOf('Agate', module)
	.add(
		'Checkbox',
		() => (
			<Checkbox
				disabled={boolean('disabled', Config)}
				label={text('label', Config, '')}
				labelPosition={select('labelPosition', ['', 'above', 'after', 'before', 'below'], Config, '')}
				onToggle={action('onToggle')}
			>
			</Checkbox>
		),
		{
			info: {
				text: 'Basic usage of Checkbox'
			}
		}
	);
