import Keypad from '../../../../Keypad';
import Scroller from '../../../../Scroller';
import ThemeDecorator  from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) =>
	<div {...props}>
		<Scroller style={{height: scaleToRem(650)}} id="scroller">
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
		</Scroller>
	</div>;

export default ThemeDecorator(app);
