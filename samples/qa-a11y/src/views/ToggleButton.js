import ToggleButton from '@enact/agate/ToggleButton';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ToggleButtonView = () => (
	<>
		<Section title="Default">
			<ToggleButton alt="Normal" underline>Text 0</ToggleButton>
			<ToggleButton alt="Disabled" disabled underline>Text 1</ToggleButton>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ToggleButton alt="Aria-labelled" aria-label="This is a Label 0." underline>Text 2</ToggleButton>
			<ToggleButton alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled underline>Text 3</ToggleButton>
		</Section>
	</>
);

export default ToggleButtonView;
