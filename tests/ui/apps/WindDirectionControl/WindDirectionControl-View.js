import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import WindDirectionControl from '../../../../WindDirectionControl';
import React from 'react';
import ri from '@enact/ui/resolution';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<Scroller style={{height: ri.scaleToRem(900)}}>
		<div>
			<Heading>Default</Heading>
			<WindDirectionControl
				id="windDirectionControl1"
			/>
			<Heading>Air Right</Heading>
			<WindDirectionControl
				id="windDirectionControl2"
				value="airRight"
			/>
			<Heading>Air Up</Heading>
			<WindDirectionControl
				id="windDirectionControl3"
				value="airUp"
			/>
			<Heading>Disabled</Heading>
			<WindDirectionControl
				id="windDirectionControl4"
				disabled
			/>
		</div>
	</Scroller>
</div>;

export default ThemeDecorator(app);
