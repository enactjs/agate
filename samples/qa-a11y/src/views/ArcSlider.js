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
			<div />
			<ArcSlider alt="Disabled" disabled />
			<Button icon="arrowdown" />
		</Section>

		<Section title="Aria-ValueText" vertical>
			<AriaValueTextSlider alt="Aria-valuetext" aria-valuetext="This is a Label." />
			<div />
			<AriaValueTextSlider alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled />
			<Button icon="arrowup" />
		</Section>
	</>
);

export default ArcSliderView;
