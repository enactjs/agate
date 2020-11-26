import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const pickerList = [
	'Apple',
	'Banana',
	'Clementine',
	'Durian'
];

const app = (props) => <div {...props}>
	<div>
		<Picker id="pickerDefault">{pickerList}</Picker>
		<Picker defaultValue={1} disabled id="pickerDisabled">{pickerList}</Picker>
		<Picker defaultValue={1} id="pickerWithDefaultValue">{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
