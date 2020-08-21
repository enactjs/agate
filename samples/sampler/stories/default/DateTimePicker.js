import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import React from 'react';
import {storiesOf} from '@storybook/react';

import DateTimePicker from '@enact/agate/DateTimePicker';

const Config = mergeComponentMetadata('DateTimePicker', DateTimePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order');

DateTimePicker.displayName = 'DateTimePicker';

storiesOf('Agate', module)
	.add(
		'DateTimePicker',
		() => (
			<DateTimePicker
				onChange={action('onChange')}
			/>
		),
		{
			text: 'The basic DateTimePicker'
		}
	);
