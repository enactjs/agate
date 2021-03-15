import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
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
				hourAriaLabel={text('hourAriaLabel', Config, '')}
				meridiemAriaLabel={text('meridiemAriaLabel', Config, '')}
				minuteAriaLabel={text('minuteAriaLabel', Config, '')}
				onChange={action('onChange')}
				spotlightDisabled={boolean('spotlightDisabled', Config)}
			/>
		),
		{
			text: 'The basic TimePicker'
		}
	);
