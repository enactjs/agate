import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import TemperatureControl from '../../../../TemperatureControl';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import ri from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: ri.scaleToRem(900)}}>
			<Heading>TemperatureControl default</Heading>
			<TemperatureControl id="temperatureControlDefault" />
			<Heading>TemperatureControl custom min, max, endAngle, startAngle</Heading>
			<TemperatureControl min={0} max={2} defaultValue={0} id="temperatureControlCustom" />
			<Heading>TemperatureControl disabled</Heading>
			<TemperatureControl disabled id="temperatureControlDisabled" />
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
