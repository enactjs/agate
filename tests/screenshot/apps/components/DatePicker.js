import DatePicker from '../../../../DatePicker';

const DatePickerTests = [
	<DatePicker value={new Date(2020, 5, 6)} />,
	<DatePicker disabled value={new Date(2020, 5, 6)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DatePicker value={new Date(2020, 5, 6)} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker disabled value={new Date(2020, 5, 6)} />
	}
];

export default DatePickerTests;
