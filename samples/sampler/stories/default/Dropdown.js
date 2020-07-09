import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, text} from  '@enact/storybook-utils/addons/knobs';
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
			text: 'The basic Dropdown'
		}
	);

storiesOf('Agate QA.Dropdown', module)
	.add(
		'Dropdown directions',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

			return (
				<div>
					<div style={{height: '300px'}}>
						<Dropdown
							direction="down"
							onSelect={action('onSelect')}
							title="Down dropdown"
						>
							{items}
						</Dropdown>
					</div>
					<div style={{height: '300px'}}>
						<Dropdown
							direction="left"
							onSelect={action('onSelect')}
							title="Left dropdown"
						>
							{items}
						</Dropdown>
					</div>
					<div style={{height: '300px'}}>
						<Dropdown
							direction="right"
							onSelect={action('onSelect')}
							title="Right dropdown"
						>
							{items}
						</Dropdown>
					</div>
					<div>
						<Dropdown
							direction="up"
							onSelect={action('onSelect')}
							title="Up dropdown"
						>
							{items}
						</Dropdown>
					</div>
				</div>
			);
		},
		{
			text: 'The basic Dropdown'
		}
	);
