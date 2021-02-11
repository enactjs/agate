import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';

import TimePicker, {TimePickerBase} from '@enact/agate/TimePicker';

const Config = mergeComponentMetadata('TimePicker', TimePicker, TimePickerBase);
TimePicker.displayName = 'TimePicker';

export default {
	title: 'Agate/TimePicker',
	component: 'TimePicker'
};

export const _TimePicker = () => (
	<TimePicker
		disabled={boolean('disabled', Config)}
		hourAriaLabel={text('hourAriaLabel', Config, '')}
		meridiemAriaLabel={text('meridiemAriaLabel', Config, '')}
		minuteAriaLabel={text('minuteAriaLabel', Config, '')}
		onChange={action('onChange')}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
	/>
);

_TimePicker.storyName = 'TimePicker';
_TimePicker.parameters = {
	info: {
		text: 'The basic TimePicker'
	}
};
