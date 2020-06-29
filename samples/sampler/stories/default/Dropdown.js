import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from  '@enact/storybook-utils/addons/knobs';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import React from 'react';

import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';

const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);
Dropdown.displayName = 'Dropdown';

storiesOf('Agate', module)
	.add(
		'Dropdown',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

			return (
				<div>
					<Dropdown
						direction={select('direction', ['left', 'right', 'up', 'down'], Config)}
						disabled={boolean('disabled', Config)}
						onSelect={action('onSelect')}
						title={text('title', Config, 'Please select')}
					>
						{items}
					</Dropdown>
				</div>
			);
		},
		{
			info: {
				text: 'Basic usage of Dropdown'
			}
		}
	);
