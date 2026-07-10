import ArcSlider from '../../../../ArcSlider';

import {withConfig} from './utils';

const ArcSliderSmokeTests = [
	<ArcSlider />,
	<ArcSlider endAngle={250} startAngle={30} value={50} />,
	<ArcSlider disabled endAngle={250} startAngle={30} value={60} />
];

const ArcSliderTests = [
	ArcSliderSmokeTests,
	...withConfig({focus: true}, ArcSliderSmokeTests) // Focus
];

export default ArcSliderTests;
