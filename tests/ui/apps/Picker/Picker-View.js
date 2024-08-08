import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';

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
	<div>
		<Picker id="pickerHorizontalDefault" orientation="horizontal">{pickerList}</Picker>
		<Picker defaultValue={1} disabled id="pickerHorizontalDisabled" orientation="horizontal">{pickerList}</Picker>
		<Picker defaultValue={1} id="pickerHorizontalWithDefaultValue" orientation="horizontal">{pickerList}</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
