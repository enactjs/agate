import Heading from '../../../../Heading';
import ThemeDecorator from '../../../../ThemeDecorator';
import WindDirectionControl from '../../../../WindDirectionControl';
import spotlight from '@enact/spotlight';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Section>
			<Heading>WindDirectionControl Default</Heading>
			<WindDirectionControl
				id="windDirectionControl1"
			/>
		</Section>
		<Section>
			<Heading>WindDirectionControl Air Right</Heading>
			<WindDirectionControl
				id="windDirectionControl2"
				value="airRight"
			/>
		</Section>
		<br />
		<Section>
			<Heading>WindDirectionControl Air Up</Heading>
			<WindDirectionControl
				id="windDirectionControl3"
				value="airUp"
			/>
		</Section>
		<Section>
			<Heading>WindDirectionControl Disabled</Heading>
			<WindDirectionControl
				id="windDirectionControl4"
				disabled
			/>
		</Section>
	</div>
</div>;

export default ThemeDecorator(app);
