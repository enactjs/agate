import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, text} from '@enact/storybook-utils/addons/knobs';
import Group from '@enact/ui/Group';
import ri from '@enact/ui/resolution';

import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';
import Scroller from '@enact/agate/Scroller';

const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);
Dropdown.displayName = 'Dropdown';

export default {
	title: 'Agate/Dropdown',
	component: 'Dropdown'
};

export const with4directions = () => {
	const itemCount = number('items', Config, {range: true, min: 0, max: 50}, 5);
	const items = (new Array(itemCount)).fill().map((i, index) => `Option ${index + 1}`);

	return (
		<>
			<Dropdown
				direction="left"
				onSelect={action('onSelect')}
				style={{position: 'absolute', top: 0, right: 0, width: '25%'}}
				title="Left dropdown"
			>
				{items}
			</Dropdown>
			<Dropdown
				direction="right"
				onSelect={action('onSelect')}
				style={{position: 'absolute', top: 0, left: 0, width: '25%'}}
				title="Right dropdown"
			>
				{items}
			</Dropdown>
			<Dropdown
				direction="down"
				onSelect={action('onSelect')}
				style={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '25%'}}
				title="Down dropdown"
			>
				{items}
			</Dropdown>
			<Dropdown
				direction="up"
				onSelect={action('onSelect')}
				style={{position: 'absolute', top: ri.scaleToRem(440), width: '25%'}}
				title="Up dropdown"
			>
				{items}
			</Dropdown>
		</>
	);
};

with4directions.storyName = 'With 4 directions';
with4directions.parameters = {
	info: {
		text: 'The basic Dropdown'
	}
};

export const groupInScroller = () => {
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
};

groupInScroller.storyName = 'Group in Scroller';
groupInScroller.parameters = {
	info: {
		text: 'The basic Dropdown'
	}
};
