import React from 'react';
import {storiesOf} from '@storybook/react';

import DatePicker from '@enact/agate/DatePicker';

DatePicker.displayName = 'DatePicker';

storiesOf('Agate', module)
	.add(
		'DatePicker',
		() => (
			<DatePicker />
		),
		{
			text: 'The basic DatPicker'
		}
	);
