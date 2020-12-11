import ArcSlider from '@enact/agate/ArcSlider';
import Button from '@enact/agate/Button';
import React from 'react';

import AriaValuetextDecorator from '../components/AriaValuetextDecorator';
import Section from '../components/Section';

const AriaValueTextSlider = AriaValuetextDecorator(ArcSlider);

const ArcSliderView = () => (
	<>
		<Section horizontal title="Default">
			<ArcSlider alt="Normal" />
			<div />
			<ArcSlider alt="Disabled" disabled />
			<Button aria-label="5 way Down to move to the next line" icon="arrowdown" />
		</Section>

		<Section horizontal title="Aria-ValueText">
			<AriaValueTextSlider alt="Aria-valuetext" aria-valuetext="This is a Label." />
			<div />
			<AriaValueTextSlider alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled />
			<Button aria-label="5 way Up to move to the previous line" icon="arrowup" />
		</Section>
	</>
);

export default ArcSliderView;
