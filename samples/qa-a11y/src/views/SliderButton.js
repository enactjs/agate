import SliderButton from '@enact/agate/SliderButton';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SliderButtonView = () => (
	<>
		<Section title="Default">
			<SliderButton alt="Normal">{['A', 'B', 'C']}</SliderButton>
			<SliderButton alt="Disabled" disabled>{['A', 'B', 'C']}</SliderButton>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<SliderButton alt="Aria-labelled" aria-label="This is a Label.">{['A', 'B', 'C']}</SliderButton>
			<SliderButton alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>{['A', 'B', 'C']}</SliderButton>
		</Section>
	</>
);

export default SliderButtonView;
