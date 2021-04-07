import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import SwitchItem from '@enact/agate/SwitchItem';

import {iconList} from './icons';

const Config = mergeComponentMetadata('SwitchItem', SwitchItem);
SwitchItem.displayName = 'SwitchItem';

export default {
	title: 'Agate/SwitchItem',
	component: 'SwitchItem'
};

export const _SwitchItem = () => (
	<div>
		<SwitchItem
			disabled={boolean('disabled', Config)}
			icon={select('icon', ['', ...iconList], Config, 'music')}
			switchOffLabel={text('switchOffLabel', Config)}
			switchOnLabel={text('switchOnLabel', Config)}
		>
			{text('children', Config, 'Sound')}
		</SwitchItem>
	</div>
);

_SwitchItem.storyName = 'SwitchItem';
_SwitchItem.parameters = {
	info: {
		text: 'The basic SwitchItem'
	}
};
