import FanSpeedControl from '../../../../FanSpeedControl';
import React from 'react';

const FanSpeedControlTests = [
	<FanSpeedControl min={1} max={10} value={5} />,
	<FanSpeedControl icon="fan" min={1} max={10} value={5} />
];

export default FanSpeedControlTests;
