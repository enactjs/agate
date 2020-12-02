import ArcSlider from '@enact/agate/ArcSlider';
import Button from '@enact/agate/Button';
import React from 'react';

import AriaValuetextDecorator from '../components/AriaValuetextDecorator';
import Section from '../components/Section';

const AriaValueTextSlider = AriaValuetextDecorator(ArcSlider);

const ArcSliderView = () => (
	<>
		<Section title="Default" vertical>
			<ArcSlider alt="Normal" />
			<ArcSlider alt="With slotCenter" slotCenter="Text" />
			<ArcSlider alt="Disabled" disabled />
			<ArcSlider alt="Disabled with slotCenter" disabled slotCenter="Text" />
			<Button icon="arrowdown" />
		</Section>

		<Section title="Aria-ValueText" vertical>
			<AriaValueTextSlider alt="Aria-valuetext" aria-valuetext="This is a Label." />
			<AriaValueTextSlider alt="Aria-valuetext with slotCenter" aria-valuetext="This is a Label." slotCenter="Text" />
			<AriaValueTextSlider alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled />
			<AriaValueTextSlider alt="Aria-valuetext and Disabled with slotCenter" aria-valuetext="This is a Label." disabled slotCenter="Text" />
			<Button icon="arrowup" />
		</Section>
	</>
);

export default ArcSliderView;
