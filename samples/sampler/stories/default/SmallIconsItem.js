import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon, {icons} from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

const iconList = [null, ...Object.keys(icons)];

storiesOf('Agate', module)
	.add(
		'SmallIconsItem',
		() => {
			const slotAfterIcon1 = select('slotAfter Icon 1', iconList, Config, 'bluetooth');
			const slotAfterIcon2 = select('slotAfter Icon 2', iconList, Config, 'music');
			return (
				<Item
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					label={text('label', Config)}
					labelPosition={select('labelPosition', ['above', 'after', 'before', 'below'], Config, 'below')}
					selected={boolean('selected', Config)}
				>
					{text('children', Config, 'Hello Item')}
					<slotAfter>
						<Icon size="small">{slotAfterIcon1}</Icon>
						<Icon size="small">{slotAfterIcon2}</Icon>
					</slotAfter>
				</Item>
			);
		},
		{
			text: 'Basic usage of SmallIconsItem'
		}
	);
