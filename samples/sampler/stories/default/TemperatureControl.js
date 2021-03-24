import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

const prop = {
	unit: ['Celsius', 'Fahrenheit']
};

TemperatureControl.displayname = 'TemperatureControl';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase, TemperatureControl);

export default {
	title: 'Agate/TemperatureControl',
	component: 'TemperatureControl'
};

export const _TemperatureControl = () => (
	<TemperatureControl
		disabled={boolean('disabled', Config)}
		max={number('max', Config)}
		min={number('min', Config)}
		onChange={action('onChange')}
		unit={select('unit', prop.unit, Config)}
	/>
);

_TemperatureControl.storyName = 'TemperatureControl';
_TemperatureControl.parameters = {
	info: {
		text: 'Temperature Control'
	}
};
