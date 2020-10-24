import SliderButton from '@enact/agate/SliderButton';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SliderButtonView = () => (
	<>
		<Section title="Default">
			<SliderButton alt="Normal" onChange={Function.prototype}>{['A', 'B', 'C']}</SliderButton>
			<SliderButton alt="Disabled" disabled onChange={Function.prototype}>{['A', 'B', 'C']}</SliderButton>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<SliderButton alt="Aria-labelled" aria-label="This is a Label 0." onChange={Function.prototype}>{['A', 'B', 'C']}</SliderButton>
			<SliderButton alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled onChange={Function.prototype}>{['A', 'B', 'C']}</SliderButton>
		</Section>
	</>
);

export default SliderButtonView;
