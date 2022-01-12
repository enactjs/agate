import {mergeComponentMetadata, removeProps} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import DateTimePicker from '@enact/agate/DateTimePicker';

DateTimePicker.displayName = 'DateTimePicker';
const Config = mergeComponentMetadata('DateTimePicker', DateTimePicker);
removeProps(Config, 'year defaultOpen day maxDays maxMonths month onDateChange onMonthChange onYearChange order');

export default {
	title: 'Agate/DateTimePicker',
	component: 'DateTimePicker'
};

export const _DateTimePicker = (args) => {
	return  (
		<DateTimePicker
			disabled={args['disabled']}
			onChange={action('onChange')}
			spotlightDisabled={args['spotlightDisabled']}
		/>
	);
};
boolean('disabled', _DateTimePicker, Config);
boolean('spotlightDisabled', _DateTimePicker, Config);
_DateTimePicker.storyName = 'DateTimePicker';
_DateTimePicker.parameters = {
	info: {
		text: 'The basic DateTimePicker'
	}
};
