import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import FanSpeedControl from '@enact/agate/FanSpeedControl';

import iconNames from './icons';

FanSpeedControl.displayName = 'FanSpeedControl';
const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl);

storiesOf('Agate', module)
	.add(
		'FanSpeedControl',
		() => (
			<FanSpeedControl
				disabled={boolean('disabled', Config)}
				icon={select('icon', ['', ...iconNames], Config, 'fan')}
				max={number('max', Config, {max: 40, min: 1, range: true, step: 1}, 10)}
				min={number('min', Config, {max: 40, min: 1, range: true, step: 1}, 1)}
				onChange={action('onChange')}
			/>
		),
		{
			text: 'The basic FanSpeedControl'
		}
	);
