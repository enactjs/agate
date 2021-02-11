import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import React from 'react';

import Heading from '@enact/agate/Heading';
import Icon, {icons} from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

const iconList = [null, ...Object.keys(icons)];

export default {
	title: 'Agate/Item',
	component: 'Item'
};

export const withIconsAndSlotAfter = () => {
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
};

withIconsAndSlotAfter.storyName = 'with icons and a text in slotAfter';

export const kitchenSink = () => (
	<Scroller>
		<Heading showLine>Item variations</Heading>
		<Item>Default Item</Item>
		<Item label="label above" labelPosition="above">Item</Item>
		<Item label="label below" labelPosition="below">Item</Item>
		<Item label="label before" labelPosition="before">Item</Item>
		<Item label="label after" labelPosition="after">Item</Item>
		<Heading showLine>Item with labels and slot before</Heading>
		<Item label="label above" labelPosition="above" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label below" labelPosition="below" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label before" labelPosition="before" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label after" labelPosition="after" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Heading showLine>Item with labels and slot after</Heading>
		<Item label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Heading showLine>Item with labels, slot after, and slot before</Heading>
		<Item label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Heading showLine>All Items inlined</Heading>
		<Item inline>Default Item</Item>
		<Item inline label="label above" labelPosition="above">Item</Item>
		<Item inline label="label below" labelPosition="below">Item</Item>
		<Item inline label="label before" labelPosition="before">Item</Item>
		<Item inline label="label after" labelPosition="after">Item</Item>
		<Heading showLine>Item with labels and slot before</Heading>
		<Item inline label="label above" labelPosition="above" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label below" labelPosition="below" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label before" labelPosition="before" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label after" labelPosition="after" slotBefore={<Icon>home</Icon>}>Item</Item>
		<Heading showLine>Item with labels and slot after</Heading>
		<Item inline label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>}>Item</Item>
		<Heading showLine>Item with labels, slot after, and slot before</Heading>
		<Item inline label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
		<Item inline label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Item</Item>
	</Scroller>
);

kitchenSink.storyName = 'Item Kitchen Sink';
