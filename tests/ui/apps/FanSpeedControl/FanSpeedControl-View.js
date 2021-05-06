import Heading from '../../../../Heading';
import FanSpeedControl from '../../../../FanSpeedControl';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Section>
			<Heading>FanSpeedControl without icon</Heading>
			<FanSpeedControl
				id="fanSpeedControlWithoutIcon"
				max={10}
				min={1}
			/>
		</Section>
		<Section>
			<Heading>FanSpeedControl with icon</Heading>
			<FanSpeedControl
				id="fanSpeedControlWithIcon"
				icon="fan"
				max={10}
				min={1}
			/>
		</Section>
		<Section>
			<Heading>FanSpeedControl Disabled</Heading>
			<FanSpeedControl
				id="fanSpeedControlDisabled"
				icon="fan"
				disabled
				max={10}
				min={1}
			/>
		</Section>
	</div>
</div>;

export default ThemeDecorator(app);
