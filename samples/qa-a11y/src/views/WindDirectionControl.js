import Button from '@enact/agate/Button';
import WindDirectionControl from '@enact/agate/WindDirectionControl';

import AriaValueTextDecorator from '../components/AriaValueTextDecorator';
import Section from '../components/Section';

const AriaValueTextWindDirectionControl = AriaValueTextDecorator({value: 'airDown'}, WindDirectionControl);

const WindDirectionControlView = () => (
	<>
		<Section horizontal title="Default">
			<WindDirectionControl alt="Normal">Text 0</WindDirectionControl>
			<WindDirectionControl alt="Disabled" disabled>Text 1</WindDirectionControl>
			<Button aria-label="5 way Down to move to the next line" icon="arrowdown" />
		</Section>

		<Section horizontal title="Aria-ValueText">
			<AriaValueTextWindDirectionControl alt="Aria-valuetext" aria-valuetext="This is a Label.">Text 2</AriaValueTextWindDirectionControl>
			<AriaValueTextWindDirectionControl alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled>Text 3</AriaValueTextWindDirectionControl>
			<Button aria-label="5 way Up to move to the previous line" icon="arrowup" />
		</Section>
	</>
);

export default WindDirectionControlView;
