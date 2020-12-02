import ThemeDecorator from '../../../../ThemeDecorator';
import WindDirectionControl from '../../../../WindDirectionControl';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<WindDirectionControl
			id="windDirectionControl1"
			style={{display: 'inline-block', width: '30%'}}
		/>
		<WindDirectionControl
			id="windDirectionControl2"
			value="airRight"
			style={{display: 'inline-block', width: '30%'}}
		/>
		<WindDirectionControl
			id="windDirectionControl3"
			value="airUp"
		/>
		<WindDirectionControl
			id="windDirectionControl4"
			disabled
		/>
	</div>
</div>;

export default ThemeDecorator(app);
