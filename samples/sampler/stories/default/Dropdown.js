import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, text, select} from  '@enact/storybook-utils/addons/knobs';
import {action} from '@enact/storybook-utils/addons/actions';
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
						direction={select('direction', ['above', 'below'], Config)}
						disabled={boolean('disabled', Config)}
						onClose={action('onClose')}
						onOpen={action('onOpen')}
						onSelect={action('onSelect')}
						title={text('title', Config, 'Please select')}
						width={select('width', ['tiny', 'small', 'medium', 'large', 'x-large', 'huge'], Config)}
					>
						{items}
					</Dropdown>
				</div>
			);
		},
		{
			text: 'The basic Dropdown'
		}
	);
