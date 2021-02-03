import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DateTimePicker from '@enact/agate/DateTimePicker';

const Config = mergeComponentMetadata('DateTimePicker', DateTimePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onDateChange onMonthChange onYearChange order');

DateTimePicker.displayName = 'DateTimePicker';

storiesOf('Agate', module)
	.add(
		'DateTimePicker',
		() => (
			<DateTimePicker
				disabled={boolean('disabled', Config)}
				onChange={action('onChange')}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
			/>
		),
		{
			text: 'The basic DateTimePicker'
		}
	);
