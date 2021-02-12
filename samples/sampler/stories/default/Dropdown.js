import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, text} from  '@enact/storybook-utils/addons/knobs';
import React from 'react';

import Dropdown, {DropdownBase} from '@enact/agate/Dropdown';

const Config = mergeComponentMetadata('Dropdown', Dropdown, DropdownBase);

export default {
	title: 'Agate/Dropdown',
	component: 'Dropdown'
};

export const _Dropdown = () => {
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
};

_Dropdown.storyName = 'Dropdown';
_Dropdown.parameters = {
	info: {
		text: 'The basic Dropdown'
	}
};
