import FanSpeedControl from '../../../../FanSpeedControl';

const FanSpeedControlTests = [
	<FanSpeedControl />,
	<FanSpeedControl min={1} />,
	<FanSpeedControl max={10} />,
	<FanSpeedControl value={5} />,
	<FanSpeedControl icon="fan" min={1} max={10} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={1} />,
	<FanSpeedControl min={1} max={10} value={5} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={5} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={10} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={5} />
];

export default FanSpeedControlTests;
