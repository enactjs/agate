import Heading from '../../../../Heading';
import FanSpeedControl from '../../../../FanSpeedControl';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Section>
			<Heading>FanSpeedControl Default</Heading>
			<FanSpeedControl
				id="fanSpeedControlDefault"
				icon="fan"
				max={10}
				min={1}
			/>
		</Section>
		<Section>
			<Heading>FanSpeedControl Custom</Heading>
			<FanSpeedControl
				id="fanSpeedControlCustom"
				icon="happyface"
				max={10}
				min={1}
			/>
		</Section>
		<Section>
			<Heading>FanSpeedControl Disabled</Heading>
			<FanSpeedControl
				id="fanSpeedControlDisabled"
				disabled
				icon="fan"
				max={10}
				min={1}
			/>
		</Section>
	</div>
</div>;

export default ThemeDecorator(app);
