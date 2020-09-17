import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, text} from  '@enact/storybook-utils/addons/knobs';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import React from 'react';

import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';
import Scroller from '@enact/agate/Scroller';
import Group from '@enact/ui/Group';
import ri from '@enact/ui/resolution';

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
		'with 4 directions',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

			return (
				<>
					<Dropdown
						direction="left"
						onSelect={action('onSelect')}
						style={{position: 'absolute', top: 0, right: 0, width:'25%'}}
						title="Left dropdown"
					>
						{items}
					</Dropdown>
					<Dropdown
						direction="right"
						onSelect={action('onSelect')}
						style={{position: 'absolute', top: 0, left: 0, width:'25%'}}
						title="Right dropdown"
					>
						{items}
					</Dropdown>
					<Dropdown
						direction="down"
						onSelect={action('onSelect')}
						style={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width:'25%'}}
						title="Down dropdown"
					>
						{items}
					</Dropdown>
					<Dropdown
						direction="up"
						onSelect={action('onSelect')}
						style={{position: 'absolute', top: ri.scaleToRem(440),  width:'25%'}}
						title="Up dropdown"
					>
						{items}
					</Dropdown>
				</>
			);
		},
		{
			text: 'The basic Dropdown'
		}
	).add(
		'group in Scroller',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
			const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);
			const dropdowns = [];

			for (let i = 0; i < 30; i++) {
				dropdowns.push({children: items, title: text('title', Config, 'Please select'), key: i});
			}

			return (
				<Scroller>
					<Group
						childComponent={Dropdown}
						style={{position: 'absolute', top: 0, width:'50%'}}
						onSelect={action('onSelect')}
					>
						{dropdowns}
					</Group>
				</Scroller>
			);
		},
		{
			text: 'The basic Dropdown'
		}
	);
