import TemperatureControl from '../../../../TemperatureControl';

const TemperatureControlTests = [
	<TemperatureControl />,
	<TemperatureControl
		max={30}
		min={10}
	/>,
	<TemperatureControl
		max={30}
		min={10}
		value={15}
	/>,
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
