import DateTimePicker from '../../../../DateTimePicker';
import {withConfig} from "./utils";

const DateTimePicketSmokeTests = [
	<DateTimePicker value={new Date(2022, 6, 30, 1, 12, 30)} />,
	<DateTimePicker disabled value={new Date(2022, 6, 30, 1, 12, 30)} />
];

const DateTimePickerTests = [
	...DateTimePicketSmokeTests,
	...withConfig({locale: 'ar-SA'}, DateTimePicketSmokeTests), // RTL
	...withConfig({locale: 'ta-IN'}, DateTimePicketSmokeTests) // long meridiem characters
];

export default DateTimePickerTests;
