import React from 'react';
import {storiesOf} from '@storybook/react';

import TimePicker from '@enact/agate/TimePicker';

storiesOf('Agate', module)
	.add(
		'TimePicker',
		() => (
			<TimePicker />
		),
		{
			text: 'The basic TimePicker'
		}
	);
