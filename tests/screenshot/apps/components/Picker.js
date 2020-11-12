import Picker from '../../../../Picker';
import React from 'react';

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

const PickerTests = [
	<Picker>{pickerList.temperatures}</Picker>,
	<Picker disabled>{pickerList.temperatures}</Picker>,
	<Picker value={1}>{pickerList.temperatures}</Picker>,
	<Picker orientation="horizontal">{pickerList.temperatures}</Picker>,
	// RTL
	{
		locale: 'ar-SA',
		component: 	<Picker>{pickerList.temperatures}</Picker>
	},
	{
		locale: 'ar-SA',
		component: 	<Picker disabled>{pickerList.temperatures}</Picker>
	},
	{
		locale: 'ar-SA',
		component: 	<Picker orientation="horizontal">{pickerList.temperatures}</Picker>
	},

	// Wrap
	<Picker wrap>{pickerList.temperatures}</Picker>,
	<Picker disabled wrap>{pickerList.temperatures}</Picker>,
	<Picker value={0} wrap>{pickerList.temperatures}</Picker>,
	<Picker orientation="horizontal" wrap>{pickerList.temperatures}</Picker>
];

export default PickerTests;
