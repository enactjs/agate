import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import TimePicker, {TimePickerBase} from '@enact/agate/TimePicker';

TimePicker.displayName = 'TimePicker';
const Config = mergeComponentMetadata('TimePicker', TimePicker, TimePickerBase);

export default {
	title: 'Agate/TimePicker',
	component: 'TimePicker'
};

export const _TimePicker = (args) => (
	<TimePicker
		disabled={args['disabled']}
		hourAriaLabel={args['hourAriaLabel']}
		meridiemAriaLabel={args['meridiemAriaLabel']}
		minuteAriaLabel={args['minuteAriaLabel']}
		onChange={action('onChange')}
		spotlightDisabled={args['spotlightDisabled']}
	/>
);
boolean('disabled', _TimePicker, Config);
text('hourAriaLabel', _TimePicker, Config, '');
text('meridiemAriaLabel', _TimePicker, Config, '');
text('minuteAriaLabel', _TimePicker, Config, '');
boolean('spotlightDisabled', _TimePicker, Config);
_TimePicker.storyName = 'TimePicker';
_TimePicker.parameters = {
	info: {
		text: 'The basic TimePicker'
	}
};
