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
	<Picker id="pickerDefault">{pickerList}</Picker>,
	<Picker disabled id="pickerDisabled">{pickerList}</Picker>,
	<Picker value={1} id="pickerWithDefaultValue">{pickerList}</Picker>,
	<Picker orientation="horizontal" id="pickerHorizontal">{pickerList}</Picker>,
</div>;

export default ThemeDecorator(app);
