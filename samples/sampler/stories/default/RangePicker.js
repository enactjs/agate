import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {PickerBase} from '@enact/agate/internal/Picker';
import RangePicker from '@enact/agate/RangePicker';

const Config = mergeComponentMetadata('RangePicker', RangePicker, PickerBase);

storiesOf('Agate', module)
	.add(
		'RangePicker',
		() => (
			<div style={{padding: '0 20%'}}>
				<RangePicker
					disabled={boolean('disabled', Config)}
					max={number('max', Config, 20)}
					min={number('min', Config, 0)}
					onChange={action('onChange')}
					orientation={select('orientation', ['vertical', 'horizontal'], Config)}
					step={number('step', Config)}
				/>
			</div>
		),
		{
			text: 'Basic usage of RangePicker'
		}
	);
