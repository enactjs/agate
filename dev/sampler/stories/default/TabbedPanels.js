import Button from '@enact/agate/Button';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import {Panel, TabbedPanels} from '@enact/agate/Panels';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';

import {select} from '../../src/enact-knobs';

TabbedPanels.displayName = 'TabbedPanels';

storiesOf('Agate', module)
	.add(
		'TabbedPanels',
		() => (
			<TabbedPanels
				onClick={action('onClick')}
				index={Number(select('index', ['0', '1', '2', '3'], TabbedPanels, '0'))}
				onSelect={action('onSelect')}
				orientation={select('orientation', ['vertical', 'horizontal'], TabbedPanels, 'vertical')}
				tabPosition={select('tabPosition', ['before', 'after'], TabbedPanels, 'before')}
				tabs={[
					{title: 'Button', icon: 'netbook'},
					{title: 'Item', icon: 'aircirculation'},
					{title: 'LabeledIconButton', icon: 'temperature'}
				]}
			>
				<beforeTabs>
					<Button size="small" type="grid" icon="arrowlargeleft" />
				</beforeTabs>
				<afterTabs>
					<Button size="small" type="grid" icon="arrowlargeright" />
				</afterTabs>
				<Panel>
					<Button icon="netbook">Click me!</Button>
				</Panel>
				<Panel>
					<Item label="label" labelPosition="before" slotBefore={<Icon>aircirculation</Icon>}>Hello Item</Item>
				</Panel>
				<Panel className="enact-fit">
					<LabeledIconButton
						labelPosition="after"
						icon="temperature"
					>
						Hello LabeledIconButton
					</LabeledIconButton>
				</Panel>
				<Panel>
					<div>
						A simple view with no associated tab
					</div>
				</Panel>
			</TabbedPanels>
		),
		{
			text: 'The basic TabbedPanels'
		}
	);
