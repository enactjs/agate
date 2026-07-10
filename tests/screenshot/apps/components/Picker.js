import Picker from '../../../../Picker';

import {withConfig} from './utils';

const pickerList = {
	temperatures: [
		'LO',
		'16\xB0',
		'17\xB0',
		'18\xB0',
		'19\xB0',
		'HI'
	]
};

const PickerSmokeTests = [
	<Picker>{pickerList.temperatures}</Picker>,
	<Picker disabled>{pickerList.temperatures}</Picker>,
	<Picker value={1}>{pickerList.temperatures}</Picker>,
	<Picker orientation="horizontal">{pickerList.temperatures}</Picker>,
];

const PickerAdditionalTests = [
	// Wrap
	<Picker wrap>{pickerList.temperatures}</Picker>,
	<Picker disabled wrap>{pickerList.temperatures}</Picker>,
	<Picker value={0} wrap>{pickerList.temperatures}</Picker>,
	<Picker orientation="horizontal" wrap>{pickerList.temperatures}</Picker>
];

const PickerTests = [
	...PickerSmokeTests,
	...PickerAdditionalTests,
	...withConfig({locale: 'ar-SA'}, PickerSmokeTests)
];

export default PickerTests;
