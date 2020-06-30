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
		'IconSubTextItem',
		() => {
			const slotBeforeIcon = select('slotBefore Icon', iconList, Config, 'phone');
			const slotAfterSubText = text('slotAfter SubText', Config, 'Sub Text');
			return (
				<Item
					disabled={boolean('disabled', Config)}
					inline={boolean('inline', Config)}
					label={text('label', Config)}
					labelPosition={select('labelPosition', ['above', 'after', 'before', 'below'], Config, 'below')}
					selected={boolean('selected', Config)}
				>
					{slotBeforeIcon ? <slotBefore>
						<Icon>{slotBeforeIcon}</Icon>
					</slotBefore> : null}
					{text('children', Config, 'Hello Item')}
					{slotAfterSubText ? <slotAfter>
						{slotAfterSubText}
					</slotAfter> : null}
				</Item>
			);
		},
		{
			text: 'Basic usage of IconSubTextItem'
		}
	);
