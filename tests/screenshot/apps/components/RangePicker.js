import RangePicker from '../../../../RangePicker';

import {withConfig} from './utils';

const RangePickerSmokeTests = [
	<RangePicker min={0} max={10} value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" step={5} value={0} />
];

const RangePickerAdditionalTests = [
	<RangePicker min={0} max={10} step={5} value={0} />,
	<RangePicker min={-10} max={10} value={0} />,
	// Wrap
	<RangePicker min={0} max={10} wrap value={0} />,
	<RangePicker min={0} max={10} wrap disabled value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" wrap value={0} />,
	<RangePicker min={0} max={10} orientation="horizontal" wrap disabled value={0} />
];

const RangePickerTests = [
	...RangePickerSmokeTests,
	...RangePickerAdditionalTests,
	...withConfig({locale: 'ar-SA'}, RangePickerSmokeTests) // RTL
];

export default RangePickerTests;
