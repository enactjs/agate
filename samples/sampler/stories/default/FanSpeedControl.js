import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';
import React from 'react';

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
					value={number('value', Config, {range: true, min: 0, max: 10, step: 1}, 4)}
				/>
			</div>

		),
		{
			text: 'The basic FanSpeedControl'
		}
	);
