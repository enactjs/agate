import DatePicker from '../../../../DatePicker';

import {withConfig} from './utils';

const DatePickerSmokeTests = [
	<DatePicker value={new Date(2022, 6, 30)} />,
	<DatePicker disabled value={new Date(2022, 6, 30)} />
];

const DatePickerTests = [
	...DatePickerSmokeTests,
	withConfig({locale: 'ar-SA'}, DatePickerSmokeTests) // RTL
];

export default DatePickerTests;
