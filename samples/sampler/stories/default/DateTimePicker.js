import DateTimePicker from '@enact/agate/DateTimePicker';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {mergeComponentMetadata, removeProps} from '../../src/utils';

const Config = mergeComponentMetadata('DateTimePicker', DateTimePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order');

DateTimePicker.displayName = 'DateTimePicker';

storiesOf('Agate', module)
	.add(
		'DateTimePicker',
		() => (
			<DateTimePicker
				onChange={action('onChange')}
				onClose={action('onClose')}
				onSave={action('onSave')}
			/>
		),
		{
			text: 'The basic DateTimePicker'
		}
	);
