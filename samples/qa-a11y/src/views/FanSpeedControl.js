import Button from '@enact/agate/Button';
import FanSpeedControl from '@enact/agate/FanSpeedControl';

import AriaValueTextDecorator from '../components/AriaValueTextDecorator';
import Section from '../components/Section';

const AriaValueTextFanSpeedControl = AriaValueTextDecorator(FanSpeedControl);

const FanSpeedControlView = () => (
	<>
		<Section horizontal title="Default">
			<FanSpeedControl alt="Normal" max={5} min={1} />
			<FanSpeedControl alt="Disabled" disabled max={5} min={1} />
			<Button aria-label="5 way Down to move to the next line" icon="arrowdown" />
		</Section>

		<Section horizontal title="Aria-ValueText">
			<AriaValueTextFanSpeedControl alt="Aria-valuetext" aria-valuetext="This is a Label." max={5} min={1} />
			<AriaValueTextFanSpeedControl alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled max={5} min={1} />
			<Button aria-label="5 way Up to move to the previous line" icon="arrowup" />
		</Section>
	</>
);

export default FanSpeedControlView;
