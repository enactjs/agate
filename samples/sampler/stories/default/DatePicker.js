import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/controls';
import DatePicker, {DatePickerBase} from '@enact/agate/DatePicker';

DatePicker.displayName = 'DatePicker';
const Config = mergeComponentMetadata('DatePicker', DatePickerBase, DatePicker);

export default {
	title: 'Agate/DatePicker',
	component: 'DatePicker'
};

export const _DatePicker = (args) => (
	<DatePicker
		dayAriaLabel={args['dayAriaLabel']}
		disabled={args['disabled']}
		monthAriaLabel={args['monthAriaLabel']}
		onChange={action('onChange')}
		spotlightDisabled={args['spotlightDisabled']}
		yearAriaLabel={args['yearAriaLabel']}
	/>
);

text('dayAriaLabel', _DatePicker, Config);
boolean('disabled', _DatePicker, Config);
text('monthAriaLabel', _DatePicker, Config);
boolean('spotlightDisabled', _DatePicker, Config);
text('yearAriaLabel', _DatePicker, Config);

_DatePicker.storyName = 'DatePicker';
_DatePicker.parameters = {
	info: {
		text: 'The basic DatePicker'
	}
};
