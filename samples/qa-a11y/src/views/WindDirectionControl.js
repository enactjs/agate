import Button from '@enact/agate/Button';
import WindDirectionControl from '@enact/agate/WindDirectionControl';
import React from 'react';

import AriaValuetextDecorator from '../components/AriaValuetextDecorator';
import Section from '../components/Section';

const AriaValueTextWindDirectionControl = AriaValuetextDecorator({value: 'airDown'}, WindDirectionControl);

const WindDirectionControlView = () => (
	<>
		<Section horizontal title="Default">
			<WindDirectionControl alt="Normal">Text 0</WindDirectionControl>
			<WindDirectionControl alt="Disabled" disabled>Text 1</WindDirectionControl>
			<Button icon="arrowdown" />
		</Section>

		<Section horizontal title="Aria-ValueText">
			<AriaValueTextWindDirectionControl alt="Aria-valuetext" aria-valuetext="This is a Label.">Text 2</AriaValueTextWindDirectionControl>
			<AriaValueTextWindDirectionControl alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled>Text 3</AriaValueTextWindDirectionControl>
			<Button icon="arrowup" />
		</Section>
	</>
);

export default WindDirectionControlView;
