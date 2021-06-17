import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number} from '@enact/storybook-utils/addons/knobs';
import {FanSpeedControl, FanSpeedControlBase} from '@enact/agate/FanSpeedControl';
import {select} from '@storybook/addon-knobs';

import {iconList} from './util/icons';

FanSpeedControl.displayName = 'FanSpeedControl';
const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl, FanSpeedControlBase);

export default {
	title: 'Agate/FanSpeedControl',
	component: 'FanSpeedControl'
};

export const _FanSpeedControl = () => (
	<FanSpeedControl
		disabled={boolean('disabled', Config)}
		icon={select('icon', ['', ...iconList], Config.defaultProps['icon'], 'FanSpeedControl')}
		max={number('max', Config, {max: 40, min: 1, range: true, step: 1}, 10)}
		min={number('min', Config, {max: 40, min: 1, range: true, step: 1}, 1)}
		onChange={action('onChange')}
	/>
);

_FanSpeedControl.storyName = 'FanSpeedControl';
_FanSpeedControl.parameters = {
	info: {
		text: 'The basic FanSpeedControl'
	}
};
