import ArcSlider from '@enact/agate/ArcSlider';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ArcSliderView = () => (
	<>
		<Section title="Default">
			<ArcSlider alt="Normal" />
			<ArcSlider alt="With slotCenter" slotCenter="SlotCenter" />
			<ArcSlider alt="Disabled" disabled />
			<ArcSlider alt="Disabled with slotCenter" disabled slotCenter="SlotCenter" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ArcSlider alt="Aria-labelled" aria-label="This is a Label 4." />
			<ArcSlider alt="Aria-labelled with slotCenter" aria-label="This is a Label 5." slotCenter="SlotCenter" />
			<ArcSlider alt="Aria-labelled and Disabled" aria-label="This is a Label 6." disabled />
			<ArcSlider alt="Aria-labelled and Disabled with slotCenter" aria-label="This is a Label 7." disabled slotCenter="SlotCenter" />
		</Section>
	</>
);

export default ArcSliderView;
