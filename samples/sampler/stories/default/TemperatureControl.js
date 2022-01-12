import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

const prop = {
	unit: ['Celsius', 'Fahrenheit']
};

TemperatureControl.displayName = 'TemperatureControl';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase, TemperatureControl);

export default {
	title: 'Agate/TemperatureControl',
	component: 'TemperatureControl'
};

export const _TemperatureControl = (args) => (
	<TemperatureControl
		disabled={args['disabled']}
		max={args['max']}
		min={args['min']}
		onChange={action('onChange')}
		unit={args['unit']}
	/>
);
boolean('disabled', _TemperatureControl, Config);
number('max', _TemperatureControl, Config);
number('min', _TemperatureControl, Config);
select('unit', _TemperatureControl, prop.unit, Config);
_TemperatureControl.storyName = 'TemperatureControl';
_TemperatureControl.parameters = {
	info: {
		text: 'Temperature Control'
	}
};
