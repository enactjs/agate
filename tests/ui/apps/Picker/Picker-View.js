import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const pickerList = [
	'Romania',
	'Korea',
	'USA',
	'France',
	'Germany',
	'Japan'
];

const app = (props) => <div {...props}>
	<div>
		<Picker defaultValue={1} orientation="horizontal" id="pickerHorizontal">{pickerList}</Picker>
		<Picker id="pickerDefault">{pickerList}</Picker>
		<Picker disabled id="pickerDisabled">{pickerList}</Picker>
		<Picker defaultValue={1} id="pickerWithDefaultValue">{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
