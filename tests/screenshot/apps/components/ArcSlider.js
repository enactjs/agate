import ArcSlider from '../../../../ArcSlider';

import {withConfig} from './utils';

const ArcSliderSmokeTests = [
	<ArcSlider />,
	<ArcSlider endAngle={250} startAngle={30} value={50} />,
	<ArcSlider disabled endAngle={250} startAngle={30} value={60} />
];

const ArcSliderFocusedSmokeTests = [
	<ArcSlider endAngle={251} startAngle={30} value={50} />,
	<ArcSlider disabled endAngle={251} startAngle={30} value={60} />
];

const ArcSliderTests = [
	...ArcSliderSmokeTests,
	...withConfig({focus: true}, ArcSliderFocusedSmokeTests) // Focus
];

export default ArcSliderTests;
