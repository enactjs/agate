import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiItem, {ItemBase as UiItemBase} from '@enact/ui/Item';
import {storiesOf} from '@storybook/react';

import Heading from '@enact/agate/Heading';
import Icon, {icons} from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';

const Config = mergeComponentMetadata('Item', UiItemBase, UiItem, ItemBase, Item);
Item.displayName = 'Item';

const iconList = [null, ...Object.keys(icons)];

storiesOf('Item', module)
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

storiesOf('Item', module)
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
				<Heading showLine>Item with sizes, labels, slot after, slot before</Heading>
				<Item size="large">Large Default Item</Item>
				<Item size="small">Small Default Item</Item>
				<Item inline size="large" label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item inline size="large" label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item inline size="large" label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item inline size="large" label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item inline size="small" label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item inline size="small" label="label above" labelPosition="above" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item inline size="small" label="label before" labelPosition="before" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item inline size="small" label="label after" labelPosition="after" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Heading showLine>Item centered, with labels, slot before, slot after, and sizes</Heading>
				<Item centered size="large">Large Item</Item>
				<Item centered size="large" label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item centered size="small">Small Item</Item>
				<Item centered size="small" label="label below" labelPosition="below" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item centered inline label="label below" labelPosition="below" size="large">Large Item</Item>
				<Item centered inline label="label above" labelPosition="above" size="large">Large Item</Item>
				<Item centered inline label="label before" labelPosition="before" size="large">Large Item</Item>
				<Item centered inline label="label after" labelPosition="after" size="large">Large Item</Item>
				<Item centered inline label="label below" labelPosition="below" size="large" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item centered inline label="label above" labelPosition="above" size="large" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item centered inline label="label before" labelPosition="before" size="large" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item centered inline label="label after" labelPosition="after" size="large" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Large Item</Item>
				<Item centered inline label="label below" labelPosition="below" size="small">Small Item</Item>
				<Item centered inline label="label above" labelPosition="above" size="small">Small Item</Item>
				<Item centered inline label="label before" labelPosition="before" size="small">Small Item</Item>
				<Item centered inline label="label after" labelPosition="after" size="small">Small Item</Item>
				<Item centered inline label="label below" labelPosition="below" size="small" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item centered inline label="label above" labelPosition="above" size="small" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item centered inline label="label before" labelPosition="before" size="small" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Item centered inline label="label after" labelPosition="after" size="small" slotAfter={<Icon>home</Icon>} slotBefore={<Icon>home</Icon>}>Small Item</Item>
				<Heading showLine>Item selected with labels and sizes</Heading>
				<Item selected size="large">Large Item</Item>
				<Item selected size="small">Small Item</Item>
				<Item selected inline label="label below" labelPosition="below" size="large">Large Item</Item>
				<Item selected inline label="label above" labelPosition="above" size="large">Large Item</Item>
				<Item selected inline label="label before" labelPosition="before" size="large">Large Item</Item>
				<Item selected inline label="label after" labelPosition="after" size="large">Large Item</Item>
				<Item selected inline label="label below" labelPosition="below" size="small">Small Item</Item>
				<Item selected inline label="label above" labelPosition="above" size="small">Small Item</Item>
				<Item selected inline label="label before" labelPosition="before" size="small">Small Item</Item>
				<Item selected inline label="label after" labelPosition="after" size="small">Small Item</Item>
				<Heading showLine>Item disabled with labels</Heading>
				<Item disabled>Default Item</Item>
				<Item disabled selected>Default Selected Item</Item>
				<Item disabled selected inline label="label below" labelPosition="below">Item</Item>
				<Item disabled selected inline label="label above" labelPosition="above">Item</Item>
				<Item disabled selected inline label="label before" labelPosition="before">Item</Item>
				<Item disabled selected inline label="label after" labelPosition="after">Item</Item>
			</Scroller>
		),
		{
			text: 'Item Kitchen Sink'
		}
	);
