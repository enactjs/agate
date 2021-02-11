import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import FanSpeedControl from '@enact/agate/FanSpeedControl';

import {iconList} from './icons';

const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl);

export default {
	title: 'Agate/FanSpeedControl',
	component: 'FanSpeedControl'
}

export const _FanSpeedControl = () => (
	<FanSpeedControl
		disabled={boolean('disabled', Config)}
		icon={select('icon', ['', ...iconList], Config, 'fan')}
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
