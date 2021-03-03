import DateTimePicker from '../../../../DateTimePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<DateTimePicker
			id="dateTimePickerDefault"
		/>
		<DateTimePicker
			id="dateTimePickerWithDefaultValue"
			defaultValue={new Date(2020, 5, 6, 12, 10)}
		/>
		<DateTimePicker
			id="dateTimePickerDisabled"
			disabled
		/>
		<DateTimePicker
			id="dateTimePickerDisabledWithDefaultValue"
			defaultValue={new Date(2020, 5, 6, 12, 10)}
			disabled
		/>
	</div>
</div>;

export default ThemeDecorator(app);
