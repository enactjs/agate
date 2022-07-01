import TimePicker from '../../../../TimePicker';

const TimePickerTests = [
	<TimePicker value={new Date(2020, 5, 6)} />,
	<TimePicker disabled value={new Date(2020, 5, 6)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <TimePicker value={new Date(2020, 5, 6)} />
	},
	{
		locale: 'ar-SA',
		component: <TimePicker disabled value={new Date(2020, 5, 6)} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <TimePicker disabled value={new Date(2020, 5, 6)} />
	}
];

export default TimePickerTests;
