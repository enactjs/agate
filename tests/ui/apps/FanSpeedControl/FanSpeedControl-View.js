import FanSpeedControl from '../../../../FanSpeedControl';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<FanSpeedControl
			min={1}
			max={10}
			icon="fan"
		/>
	</div>
</div>;

export default ThemeDecorator(app);
