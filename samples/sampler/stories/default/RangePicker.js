import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/controls';
import {PickerBase} from '@enact/agate/internal/Picker';
import RangePicker from '@enact/agate/RangePicker';

RangePicker.displayName = 'RangePicker';
const Config = mergeComponentMetadata('RangePicker', RangePicker, PickerBase);

export default {
	title: 'Agate/RangePicker',
	component: 'RangePicker'
};

export const _RangePicker = (args) => (
	<RangePicker
		defaultValue={5}
		disabled={args['disabled']}
		max={args['max']}
		min={args['min']}
		noAnimation={args['noAnimation']}
		onChange={action('onChange')}
		orientation={args['orientation']}
		spotlightDisabled={args['spotlightDisabled']}
		step={args['step']}
		wrap={args['wrap']}
	/>
);

boolean('disabled', _RangePicker, Config);
number('max', _RangePicker, Config, 20);
number('min', _RangePicker, Config, 0);
boolean('noAnimation', _RangePicker, Config);
select('orientation', _RangePicker, ['vertical', 'horizontal'], Config);
boolean('spotlightDisabled', _RangePicker, Config);
number('step', _RangePicker, Config);
boolean('wrap', _RangePicker, Config);

_RangePicker.storyName = 'RangePicker';
_RangePicker.parameters = {
	info: {
		text: 'Basic usage of RangePicker'
	}
};
