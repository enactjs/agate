import FanSpeedControl from '../../../../FanSpeedControl';

const FanSpeedControlTests = [
	<FanSpeedControl min={1} />,
	<FanSpeedControl max={10} />,
	<FanSpeedControl icon="fanoff" min={1} max={10} />,
	<FanSpeedControl min={1} max={10} value={1} />,
	<FanSpeedControl min={1} max={10} value={5} />,
	<FanSpeedControl disabled min={1} max={10} value={6} />,
	{
		component: <FanSpeedControl min={1} max={10} value={7} />,
		focus: true
	},
	<FanSpeedControl min={1} max={10} value={10} />
];

export default FanSpeedControlTests;
