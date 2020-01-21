import React from 'react';
import {storiesOf} from '@storybook/react';

import Heading from '../../../../Heading';
import Icon from '../../../../Icon';
import Item from '../../../../Item';
import Scroller from '../../../../Scroller';

Item.displayName = 'Item';

storiesOf('Agate QA.Item', module)
	.add(
		'Kitchen Sink',
		() => (
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
		),
		{
			text: 'Item Kitchen Sink'
		}
	);
