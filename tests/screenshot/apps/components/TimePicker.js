import TimePicker from '../../../../TimePicker';
import React from 'react';

const TimePickerTests = [
	<TimePicker value={new Date()} />,
	<TimePicker disabled value={new Date()} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <TimePicker value={new Date()} />
	},
	{
		locale: 'ar-SA',
		component: <TimePicker disabled value={new Date()} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <TimePicker disabled value={new Date()} />
	}
];

export default TimePickerTests;
