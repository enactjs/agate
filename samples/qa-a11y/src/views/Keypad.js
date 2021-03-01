import Keypad from '@enact/agate/Keypad';

import Section from '../components/Section';

const KeypadView = () => (
	<>
		<Section title="Default">
			<Keypad alt="Normal" />
			<Keypad alt="Disabled" disabled />
		</Section>
	</>
);

export default KeypadView;
