import FanSpeedControl from '../../../../FanSpeedControl';

import {withConfig} from './utils';

const FanSpeedControlSmokeTests = [
	<FanSpeedControl min={1} />,
	<FanSpeedControl max={10} />,
	<FanSpeedControl icon="fanoff" min={1} max={10} />,
	<FanSpeedControl min={1} max={10} value={1} />,
	<FanSpeedControl min={1} max={10} value={5} />,
	<FanSpeedControl min={1} max={10} value={10} />,
	<FanSpeedControl disabled min={1} max={10} value={6} />
];

const FanSpeedControlTests = [
	...FanSpeedControlSmokeTests,
	...withConfig({focus: true}, [<FanSpeedControl min={1} max={10} value={7} />])
];

export default FanSpeedControlTests;
