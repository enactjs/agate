import ArcSlider from '@enact/agate/ArcSlider';
import Button from '@enact/agate/Button';
import React from 'react';

import AriaValueTextDecorator from '../components/AriaValueTextDecorator';
import Section from '../components/Section';

const AriaValueTextSlider = AriaValueTextDecorator(ArcSlider);

const ArcSliderView = () => (
	<>
		<Section horizontal title="Default">
			<ArcSlider alt="Normal" />
			<ArcSlider alt="Disabled" disabled />
			<Button aria-label="5 way Down to move to the next line" icon="arrowdown" />
		</Section>

		<Section horizontal title="Aria-ValueText">
			<AriaValueTextSlider alt="Aria-valuetext" aria-valuetext="This is a Label." />
			<AriaValueTextSlider alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled />
			<Button aria-label="5 way Up to move to the previous line" icon="arrowup" />
		</Section>
	</>
);

export default ArcSliderView;
