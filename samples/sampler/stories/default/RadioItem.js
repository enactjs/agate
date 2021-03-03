import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';
import RadioItem, {RadioItemBase} from '@enact/agate/RadioItem';

import iconNames from './icons';

const Config = mergeComponentMetadata('RadioItem', ItemBase, Item, RadioItemBase, RadioItem);
RadioItem.displayName = 'RadioItem';

storiesOf('Agate', module)
	.add(
		'RadioItem',
		() => {
			const slotBeforeSelection = select('slotBefore', ['', ...iconNames], Config);
			const slotBefore = slotBeforeSelection ? (<Icon size="small" slot="slotBefore">{slotBeforeSelection}</Icon>) : null;

			return (
				<RadioItem
					disabled={boolean('disabled', Config)}
					icon={select('icon', ['', ...iconNames], Config)}
					inline={boolean('inline', Config)}
					onToggle={action('onToggle')}
				>
					{slotBefore}
					{text('children', Config, 'Hello RadioItem')}
				</RadioItem>
			);
		},
		{
			text: 'The basic RadioItem'
		}
	);
