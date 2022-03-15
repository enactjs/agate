import DateTimePicker from '../../../../DateTimePicker';

const DateTimePickerTests = [
	<DateTimePicker value={new Date(2020, 5, 6)} />,
	<DateTimePicker disabled value={new Date(2020, 5, 6)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DateTimePicker value={new Date(2020, 5, 6)} />
	},
	{
		locale: 'ar-SA',
		component: <DateTimePicker disabled value={new Date(2020, 5, 6)} />
	},
	// long meridiem characters
	{
		locale: 'ta-IN',
		component: <DateTimePicker disabled value={new Date(2020, 5, 6)} />
	}
];

export default DateTimePickerTests;
