import TimePicker from '../../../../TimePicker';

import {withConfig} from './utils';

const TimePickerSmokeTests = [
	<TimePicker value={new Date(2022, 6, 30, 1, 12, 30)} />,
	<TimePicker disabled value={new Date(2022, 6, 30, 1, 12, 30)} />
];

const TimePickerTests = [
	...TimePickerSmokeTests,
	...withConfig({locale: 'ar-SA'}, TimePickerSmokeTests), // RTL
	...withConfig({locale: 'ta-IN'}, TimePickerSmokeTests) // long meridiem characters
];

export default TimePickerTests;
