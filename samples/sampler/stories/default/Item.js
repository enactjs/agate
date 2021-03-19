import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';

import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';

Item.displayName = 'Item';
const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);

export default {
	title: 'Agate/Item',
	component: 'Item'
};

export const _Item = () => (
	<Item
		centered={boolean('centered', Config)}
		disabled={boolean('disabled', Config)}
		inline={boolean('inline', Config)}
		label={text('label', Config)}
		labelPosition={select('labelPosition', ['above', 'after', 'before', 'below'], Config, 'below')}
		selected={boolean('selected', Config)}
		size={select('size', ['small', 'large'], Config)}
		slotBefore={select('slotBefore', {'': '', '<Icon />' : 'icon'}, Config) ? <Icon size="small">speaker</Icon> : null}
		slotAfter={select('slotAfter', {'': '', '<Icon />' : 'icon'}, Config) ? <Icon size="small">arrowlargeright</Icon> : null}
	>
		{text('children', Config, 'Hello Item')}
	</Item>
);

_Item.storyName = 'Item';
_Item.parameters = {
	info: {
		text: 'Basic usage of Item'
	}
};
