import RangePicker from '../../../../RangePicker';
import React from 'react';

const RangePickerTests = [
	<RangePicker />,
	<RangePicker orientation="horizontal" />,
	<RangePicker min={0} max={20} step={5} />,
	<RangePicker min={-10} max={10} value={0} />,
	<RangePicker min={0} max={20} orientation="horizontal" step={5} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <RangePicker min={0} max={5} />
	},
	{
		locale: 'ar-SA',
		component: <RangePicker min={0} max={20} orientation="horizontal" step={5} />
	}
];

export default RangePickerTests;
