import DateTimePicker from '../../../../DateTimePicker';

const DateTimePickerTests = [
	<DateTimePicker value={new Date()} />,
	<DateTimePicker disabled value={new Date()} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DateTimePicker value={new Date()} />
	},
	{
		locale: 'ar-SA',
		component: <DateTimePicker disabled value={new Date()} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <DateTimePicker disabled value={new Date()} />
	}
];

export default DateTimePickerTests;
