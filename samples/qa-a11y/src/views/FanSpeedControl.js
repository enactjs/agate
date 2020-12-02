import Button from '@enact/agate/Button';
import FanSpeedControl from '@enact/agate/FanSpeedControl';
import React from 'react';

import AriaValuetextDecorator from '../components/AriaValuetextDecorator';
import Section from '../components/Section';

const AriaValueTextFanSpeedControl = AriaValuetextDecorator(FanSpeedControl);

const FanSpeedControlView = () => (
	<>
		<Section title="Default" vertical>
			<FanSpeedControl alt="Normal" icon="fan" max={5} min={1} />
			<FanSpeedControl alt="Disabled" disabled icon="fan" max={5} min={1} />
			<Button icon="arrowdown" />
		</Section>

		<Section title="Aria-ValueText" vertical>
			<AriaValueTextFanSpeedControl alt="Aria-valuetext" aria-valuetext="This is a Label." icon="fan" max={5} min={1} />
			<AriaValueTextFanSpeedControl alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled icon="fan" max={5} min={1} />
			<Button icon="arrowup" />
		</Section>
	</>
);

export default FanSpeedControlView;
