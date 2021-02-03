import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

storiesOf('Agate', module)
	.add(
		'Item',
		() => {
			return (
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
		},
		{
			text: 'Basic usage of Item'
		}
	);
