import DatePicker from '../../../../DatePicker';

const DatePickerTests = [
	<DatePicker value={new Date(2022, 6, 30)} />,
	<DatePicker disabled value={new Date(2022, 6, 30)} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <DatePicker value={new Date(2022, 6, 30)} />
	},
	{
		locale: 'ar-SA',
		component: <DatePicker disabled value={new Date(2022, 6, 30)} />
	}
];

export default DatePickerTests;
