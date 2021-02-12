import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import RadioItem from '@enact/agate/RadioItem';

import {iconList} from './icons';

const Config = mergeComponentMetadata('RadioItem', RadioItem);

export default {
	title: 'Agate/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = () => (
	<div>
		<RadioItem
			disabled={boolean('disabled', Config)}
			icon={select('icon', ['', ...iconList], Config)}
			onToggle={action('onToggle')}
		>
			{text('children', Config, 'Hello RadioItem')}
		</RadioItem>
	</div>
);

_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'The basic RadioItem'
	}
};
