import DateTimePicker from '../../../../DateTimePicker';

import {withConfig} from './utils';

const DateTimePickerSmokeTests = [
	<DateTimePicker value={new Date(2022, 6, 30, 1, 12, 30)} />,
	<DateTimePicker disabled value={new Date(2022, 6, 30, 1, 12, 30)} />
];

const DateTimePickerTests = [
	...DateTimePickerSmokeTests,
	...withConfig({locale: 'ar-SA'}, DateTimePickerSmokeTests), // RTL
	...withConfig({locale: 'ta-IN'}, DateTimePickerSmokeTests) // long meridiem characters
];

export default DateTimePickerTests;
