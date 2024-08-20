import ArcPicker from '../../../../ArcPicker';

import {withConfig} from './utils';

const ArcPickerTests = [
	<ArcPicker>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker endAngle={300} startAngle={10}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3}>{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker value={3} selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>,
	<ArcPicker disabled>{[1, 2, 3, 4]}</ArcPicker>,

	// Focus
	...withConfig({focus: true}, [
		<ArcPicker value={3}>{[1, 2, 3, 4, 5]}</ArcPicker>,
		<ArcPicker value={3} selectionType="cumulative">{[1, 2, 3, 4, 5]}</ArcPicker>,
		<ArcPicker disabled>{[1, 2, 3, 4, 5]}</ArcPicker>
	])
];

export default ArcPickerTests;
