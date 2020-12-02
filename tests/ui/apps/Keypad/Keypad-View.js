import Keypad from '../../../../Keypad';
import ThemeDecorator  from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{padding: '0 20%'}}>
		<Keypad id="keypadDefault" />
	</div>
	<div style={{padding: '0 20%'}}>
		<Keypad disabled id="keypadDisabled" />
	</div>
</div>;

export default ThemeDecorator(app);
