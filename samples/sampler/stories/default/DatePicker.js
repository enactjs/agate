import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import React from 'react';

import DatePicker, {DatePickerBase} from '@enact/agate/DatePicker';

const Config = mergeComponentMetadata('DatePicker', DatePicker, DatePickerBase);

export default {
	title: 'Agate/DatePicker',
	component: 'DatePicker'
};

export const _DatePicker = () => (
	<DatePicker
		dayAriaLabel={text('dayAriaLabel', Config)}
		disabled={boolean('disabled', Config)}
		monthAriaLabel={text('monthAriaLabel', Config)}
		onChange={action('onChange')}
		spotlightDisabled={boolean('spotlightDisabled', Config)}
		yearAriaLabel={text('yearAriaLabel', Config)}
	/>
);

_DatePicker.storyName = 'DatePicker';
_DatePicker.parameters = {
	infos: {
		text: 'The basic DatePicker'
	}
};
