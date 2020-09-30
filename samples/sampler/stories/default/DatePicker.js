import {boolean} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DatePicker, {DatePickerBase} from '@enact/agate/DatePicker';

const Config = mergeComponentMetadata('DatePicker', DatePicker, DatePickerBase);
DatePicker.displayName = 'DatePicker';

storiesOf('Agate', module)
	.add(
		'DatePicker',
		() => (
			<DatePicker
				disabled={boolean('disabled', Config)}
			/>
		),
		{
			text: 'The basic DatPicker'
		}
	);
