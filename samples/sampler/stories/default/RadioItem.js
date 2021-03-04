import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';

import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';
import RadioItem, {RadioItemBase} from '@enact/agate/RadioItem';

import {iconList} from './icons';

const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);
RadioItem.displayName = 'RadioItem';

export default {
	title: 'Agate/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = () => {
	const slotBeforeSelection = select('slotBefore', ['', ...iconList], Config);
	const slotBefore = slotBeforeSelection ? (<Icon size="small" slot="slotBefore">{slotBeforeSelection}</Icon>) : null;

	return (
		<RadioItem
			disabled={boolean('disabled', Config)}
			icon={select('icon', ['', ...iconList], Config)}
			onToggle={action('onToggle')}
		>
			{slotBefore}
			{text('children', Config, 'Hello RadioItem')}
		</RadioItem>
	);
};

_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'The basic RadioItem'
	}
};
