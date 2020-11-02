import ArcSlider from '@enact/agate/ArcSlider';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ArcSliderView = () => (
	<>
		<Section title="Default">
			<ArcSlider alt="Normal" />
			<ArcSlider alt="With slotCenter" className={appCss.marginTop} slotCenter="Text" />
			<ArcSlider alt="Disabled" className={appCss.marginTop} disabled />
			<ArcSlider alt="Disabled with slotCenter" className={appCss.marginTop} disabled slotCenter="Text" />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ArcSlider alt="Aria-labelled" aria-label="This is a Label." />
			<ArcSlider alt="Aria-labelled with slotCenter" className={appCss.marginTop} aria-label="This is a Label." slotCenter="Text" />
			<ArcSlider alt="Aria-labelled and Disabled" className={appCss.marginTop} aria-label="This is a Label." disabled />
			<ArcSlider alt="Aria-labelled and Disabled with slotCenter" className={appCss.marginTop} aria-label="This is a Label." disabled slotCenter="Text" />
		</Section>
	</>
);

export default ArcSliderView;
