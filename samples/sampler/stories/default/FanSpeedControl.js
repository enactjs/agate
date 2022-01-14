import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean,  range, select} from '@enact/storybook-utils/addons/controls';
import {FanSpeedControl, FanSpeedControlBase} from '@enact/agate/FanSpeedControl';

import {iconList} from './util/icons';

FanSpeedControl.displayName = 'FanSpeedControl';
const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl, FanSpeedControlBase);

export default {
	title: 'Agate/FanSpeedControl',
	component: 'FanSpeedControl'
};

export const _FanSpeedControl = (args) => (
	<FanSpeedControl
		disabled={args['disabled']}
		icon={args['icon']}
		max={args['max']}
		min={args['min']}
		onChange={action('onChange')}
	/>
);

boolean('disabled', _FanSpeedControl, Config);
select('icon', _FanSpeedControl, ['', ...iconList], Config.defaultProps['icon'], 'FanSpeedControl');
range('max', _FanSpeedControl, Config, {max: 40, min: 1, range: true, step: 1}, 10);
range('min', _FanSpeedControl, Config, {max: 40, min: 1, range: true, step: 1}, 1);

_FanSpeedControl.storyName = 'FanSpeedControl';
_FanSpeedControl.parameters = {
	info: {
		text: 'The basic FanSpeedControl'
	}
};
