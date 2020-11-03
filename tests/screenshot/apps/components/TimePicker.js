import TimePicker from '../../../../TimePicker';
import React from 'react';

const TimePickerTests = [
	<TimePicker />,
	<TimePicker disabled />,
	<TimePicker value={new Date()} />
];

export default TimePickerTests;
