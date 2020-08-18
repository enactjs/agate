import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TabGroup from '@enact/agate/TabGroup';

// const Config = mergeComponentMetadata('TabGroup', TabGroup);
TabGroup.displayName = 'TabGroup';

storiesOf('Agate', module)
	.add(
		'TabGroup',
		() => (
			<TabGroup
				tabPosition="above"
				tabs={[
					{title: 'Button', icon: 'netbook'},
					{title: 'Item', icon: 'aircirculation'},
					{title: 'LabeledIconButton', icon: 'temperature'}
				]}
				orientation="horizontal"
			/>
		),
		{
			text: 'The basic TabGroup'
		}
	);
