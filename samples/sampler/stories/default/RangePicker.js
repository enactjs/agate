import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import RangePicker from '@enact/agate/RangePicker';

const Config = mergeComponentMetadata('RangePicker', RangePicker);

storiesOf('Agate', module)
	.add(
		'RangePicker',
		() => (
			<div style={{padding: '0 20%'}}>
				<RangePicker
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
					min={number('min', Config, 0)}
					max={number('max', Config, 100)}
					step={number('step', Config, 1)}
					defaultValue={number('defaultValue', Config, 1)}
				>
					{['LO', '16\xB0', '17\xB0', '18\xB0', '19\xB0', 'HI']}
				</RangePicker>

			</div>
		),
		{
			text: 'Basic usage of RangePicker'
		}
	);
