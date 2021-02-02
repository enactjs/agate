import TemperatureControl from '../../../../TemperatureControl';
import React from 'react';

const TemperatureControlTests = [
	<TemperatureControl />,
	// Min value equals max value - [PLAT-123306]
	<TemperatureControl
		max={30}
		min={30}
	/>,
	// Min value > max value - [PLAT-123306]
	<TemperatureControl
		max={30}
		min={50}
	/>
];

export default TemperatureControlTests;
