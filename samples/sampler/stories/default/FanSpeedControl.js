import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import FanSpeedControl from '@enact/agate/FanSpeedControl';

import iconNames from './icons';

FanSpeedControl.displayName = 'FanSpeedControl';
const Config = mergeComponentMetadata('FanSpeedControl', FanSpeedControl);

storiesOf('Agate', module)
	.add(
		'FanSpeedControl',
		() => (
			<div style={{marginTop: '40px'}}>
				<FanSpeedControl
					icon={select('icon', ['', ...iconNames], Config, 'fan')}
					max={number('max', Config, {max: 40, min: 1, range: true, step: 1}, 10)}
				/>
			</div>
		),
		{
			text: 'The basic FanSpeedControl'
		}
	);
