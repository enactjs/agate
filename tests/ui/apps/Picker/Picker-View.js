import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';

const pickerList = [
	'Apple',
	'Banana',
	'Clementine',
	'Durian'
];

const app = (props) => <div {...props}>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker id="pickerDefault">{pickerList}</Picker>
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker defaultValue={1} disabled id="pickerDisabled">{pickerList}</Picker>
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<Picker defaultValue={1} id="pickerWithDefaultValue">{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
