import Dropdown from '../../../../Dropdown';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{padding: 100}} id="wrapper">
		<Dropdown id="dropdownDefault" title="Default" style={{display: 'inline-block', width: '50%'}}>
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown direction="right" id="dropdownDirectionRight" title="DirectionRight" style={{display: 'inline-block', width: '50%'}}>
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown disabled id="dropdownDisabled" title="Disabled">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
		<Dropdown id="dropdownSelected" defaultSelected={1} title="Selected">
			{['one', 'two', 'three', 'four', 'five']}
		</Dropdown>
	</div>
</div>;

export default ThemeDecorator(app);
