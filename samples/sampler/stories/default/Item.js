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
		'Item',
		() => {
			const slotBeforeIcon = select('slotBefore Icon', iconList, Config);
			const slotAfterIcon = select('slotAfter Icon', iconList, Config);
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
					{slotAfterIcon ? <slotAfter>
						<Icon>{slotAfterIcon}</Icon>
					</slotAfter> : null}
				</Item>
			);
		},
		{
			text: 'Basic usage of Item'
		}
	);

storiesOf('Agate QA.Item', module)
	.add(
		'with icons and a text in slotAfter',
		() => {
			const slotBeforeIcon = select('slotBefore Icon', iconList, Config);
			const slotAfter = [
				select('slotAfter Icon 1', iconList, Config),
				select('slotAfter Icon 2', iconList, Config),
				text('slotAfter Text', Config, 'Sub Text')
			].filter(subText => !!subText).map(subText => (iconList.indexOf(subText) > 0 ? <Icon key={subText}>{subText}</Icon> : subText));

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
					{slotAfter.length > 0 ? <slotAfter>
						{slotAfter}
					</slotAfter> : null}
				</Item>
			);
		}
	);
