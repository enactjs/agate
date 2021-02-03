import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
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
				dayAriaLabel={text('dayAriaLabel', Config)}
				disabled={boolean('disabled', Config)}
				monthAriaLabel={text('monthAriaLabel', Config)}
				onChange={action('onChange')}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
				yearAriaLabel={text('yearAriaLabel', Config)}
			/>
		),
		{
			text: 'The basic DatePicker'
		}
	);
