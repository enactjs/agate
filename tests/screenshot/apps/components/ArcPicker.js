import ArcPicker from '../../../../ArcPicker';

import {withConfig} from './utils';

const ArcPickerSmokeTests = [
	<ArcPicker endAngle={300} startAngle={10}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3} selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker disabled>{[1, 2, 3, 4]}</ArcPicker>
];

const ArcPickerFocusedSmokeTests = [
	<ArcPicker endAngle={300} startAngle={10}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3} selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker disabled>{[1, 2, 3, 4]}</ArcPicker>
];

const ArcPickerTests = [
	...ArcPickerSmokeTests,
	...withConfig({focus: true}, ArcPickerFocusedSmokeTests) // Focus
];

export default ArcPickerTests;
