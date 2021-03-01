import RangePicker from '../../../../RangePicker';

const RangePickerTests = [
	<RangePicker min={0} max={10} step={5} value={0} />,
	<RangePicker min={-10} max={10} value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" step={5} value={0} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <RangePicker min={0} max={10} value={0} />
	},
	{
		locale: 'ar-SA',
		component: <RangePicker min={0} max={10} orientation="horizontal" step={5} value={0} />
	},

	// Wrap
	<RangePicker min={0} max={10} wrap value={0} />,
	<RangePicker min={0} max={10} wrap disabled value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" wrap value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" wrap disabled value={0} />
];

export default RangePickerTests;
