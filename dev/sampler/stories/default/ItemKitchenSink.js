import Heading from '@enact/agate/Heading';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import LabeledItem from '@enact/agate/LabeledItem';
import Scroller from '@enact/agate/Scroller';
import SlotItem from '@enact/agate/SlotItem';
import React from 'react';
import {storiesOf} from '@storybook/react';

Item.displayName = 'Item';

storiesOf('Agate QA.Item', module)
	.add(
		'Kitchen Sink',
		() => (
			<Scroller>
				<LabeledItem label="label" titleIcon="home">LabeledItem</LabeledItem>
				<SlotItem slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>SlotItem</SlotItem>
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
		),
		{
			text: 'Item Kitchen Sink'
		}
	);
