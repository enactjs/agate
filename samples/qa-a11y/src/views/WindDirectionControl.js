import WindDirectionControl from '@enact/agate/WindDirectionControl';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const WindDirectionControlView = () => (
	<>
		<Section title="Default">
			<WindDirectionControl alt="Normal">Text 0</WindDirectionControl>
			<WindDirectionControl alt="Disabled" disabled>Text 1</WindDirectionControl>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<WindDirectionControl alt="Aria-labelled" aria-label="This is a Label 0.">Text 0</WindDirectionControl>
			<WindDirectionControl alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled>Text 1</WindDirectionControl>
		</Section>
	</>
);

export default WindDirectionControlView;
