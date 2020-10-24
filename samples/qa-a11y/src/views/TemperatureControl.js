import TemperatureControl from '@enact/agate/TemperatureControl';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const TemperatureControlView = () => (
	<>
		<Section title="Default">
			<TemperatureControl alt="Normal" />
			<TemperatureControl alt="Disabled" disabled />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<TemperatureControl alt="Aria-labelled" aria-label="This is a Label." />
			<TemperatureControl alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled />
		</Section>
	</>
);

export default TemperatureControlView;
