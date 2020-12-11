import TemperatureControl from '@enact/agate/TemperatureControl';
import React from 'react';

import Section from '../components/Section';

const TemperatureControlView = () => (
	<>
		<Section horizontal title="Default">
			<TemperatureControl alt="Normal" />
			<TemperatureControl alt="Disabled" disabled />
		</Section>
	</>
);

export default TemperatureControlView;
