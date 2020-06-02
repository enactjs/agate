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
					max={number('max', Config, 20)}
					step={number('step', Config, 1)}
					defaultValue={number('defaultValue', Config, 5)}
				/>
			</div>
		),
		{
			text: 'Basic usage of RangePicker'
		}
	);
