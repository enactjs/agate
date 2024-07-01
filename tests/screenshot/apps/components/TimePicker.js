import TimePicker from '../../../../TimePicker';

const TimePickerTests = [
	<TimePicker value={new Date(2022, 6, 30, 1, 12, 30)} />,
	<TimePicker disabled value={new Date(2022, 6, 30, 1, 12, 30)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <TimePicker value={new Date(2022, 6, 30, 1, 12, 30)} />
	},
	{
		locale: 'ar-SA',
		component: <TimePicker disabled value={new Date(2022, 6, 30, 1, 12, 30)} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <TimePicker disabled value={new Date(2022, 6, 30, 13, 12, 30)} />
	}
];

export default TimePickerTests;
