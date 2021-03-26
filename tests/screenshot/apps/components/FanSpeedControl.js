import FanSpeedControl from '../../../../FanSpeedControl';

const FanSpeedControlTests = [
	<FanSpeedControl icon="fan" min={1} />,
	<FanSpeedControl icon="fan" max={10} />,
	<FanSpeedControl icon="fan" min={1} max={10} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={1} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={5} />,
	<FanSpeedControl disabled icon="fan" min={1} max={10} value={6} />,
	{
		component: <FanSpeedControl icon="fan" min={1} max={10} value={7} />,
		focus: true
	},
	<FanSpeedControl icon="fan" min={1} max={10} value={10} />
];

export default FanSpeedControlTests;
