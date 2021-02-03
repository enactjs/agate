import DatePicker from '../../../../DatePicker';
import React from 'react';

const DatePickerTests = [
	<DatePicker value={new Date()} />,
	<DatePicker disabled value={new Date()} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DatePicker value={new Date()} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker disabled value={new Date()} />
	}
];

export default DatePickerTests;
