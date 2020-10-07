import {boolean} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TimePicker, {TimePickerBase} from '@enact/agate/TimePicker';

const Config = mergeComponentMetadata('TimePicker', TimePicker, TimePickerBase);
TimePicker.displayName = 'TimePicker';

storiesOf('Agate', module)
	.add(
		'TimePicker',
		() => (
			<TimePicker
				disabled={boolean('disabled', Config)}
			/>
		),
		{
			text: 'The basic TimePicker'
		}
	);
