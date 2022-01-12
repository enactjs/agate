import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';
import RadioItem, {RadioItemBase} from '@enact/agate/RadioItem';

import {iconList} from './util/icons';

const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);
RadioItem.displayName = 'RadioItem';

export default {
	title: 'Agate/RadioItem',
	component: 'RadioItem'
};

export const _RadioItem = (args) => {
	const slotBeforeSelection = args['slotBefore'];
	const slotBefore = slotBeforeSelection ? (<Icon size="small" slot="slotBefore">{slotBeforeSelection}</Icon>) : null;

	return (
		<RadioItem
			disabled={args['disabled']}
			icon={args['icon']}
			inline={args['inline']}
			onToggle={action('onToggle')}
		>
			{slotBefore}
			{args['children']}
		</RadioItem>
	);
};
select('slotBefore', _RadioItem, ['', ...iconList], Config);
boolean('disabled', _RadioItem, Config);
select('icon', _RadioItem, ['', ...iconList], Config);
boolean('inline', _RadioItem, Config);
text('children', _RadioItem, Config, 'Hello RadioItem');
_RadioItem.storyName = 'RadioItem';
_RadioItem.parameters = {
	info: {
		text: 'The basic RadioItem'
	}
};
