import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';

import DateTimePicker from '@enact/agate/DateTimePicker';

DateTimePicker.displayName = 'DateTimePicker';
const Config = mergeComponentMetadata('DateTimePicker', DateTimePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onDateChange onMonthChange onYearChange order');

DateTimePicker.displayName = 'DateTimePicker';

export default {
	title: 'Agate/DateTimePicker',
	component: 'DateTimePicker'
};

export const _DateTimePicker = () => (
	<DateTimePicker
		disabled={boolean('disabled', Config)}
		onChange={action('onChange')}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
	/>
);

_DateTimePicker.storyName = 'DateTimePicker';
_DateTimePicker.parameters = {
	info: {
		text: 'The basic DateTimePicker'
	}
};
