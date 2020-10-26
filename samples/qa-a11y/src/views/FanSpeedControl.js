import FanSpeedControl from '@enact/agate/FanSpeedControl';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const FanSpeedControlView = () => (
	<>
		<Section title="Default">
			<FanSpeedControl alt="Normal" icon="fan" max={5} min={1} />
			<FanSpeedControl alt="Disabled" disabled icon="fan" max={5} min={1} />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<FanSpeedControl alt="Aria-labelled" aria-label="This is a Label." icon="fan" max={5} min={1} />
			<FanSpeedControl alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled icon="fan" max={5} min={1} />
		</Section>
	</>
);

export default FanSpeedControlView;
