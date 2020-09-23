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
			<FanSpeedControl
				icon={select('icon', ['', ...iconNames], Config, 'fan')}
				size={number('size', Config, {range: true, min: 1, max: 40, step: 1}, 10)}
				style={{marginTop: '40px'}}
			/>
		),
		{
			text: 'The basic ArcPicker'
		}
	);
