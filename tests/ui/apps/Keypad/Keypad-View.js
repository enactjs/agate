import Keypad from '../../../../Keypad';
import ThemeDecorator  from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) =>
	<div {...props}>
		<Section>
			<h2 style={{textAlign: 'center'}}>Keypad Default</h2>
			<Keypad id="keypadDefault" />
		</Section>
		<Section>
			<h2 style={{textAlign: 'center'}}>Keypad Disabled</h2>
			<Keypad disabled id="keypadDisabled" />
		</Section>
		<Section>
			<h2 style={{textAlign: 'center'}}>Keypad SpotlightDisabled</h2>
			<Keypad disabled id="keypadSpotlightDisabled" spotlightDisabled />
		</Section>
	</div>;

export default ThemeDecorator(app);
