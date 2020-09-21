import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

// Set up some defaults for colors and radius
const prop = {
	colors: ['', '#000000', '#444444', '#986aad', '#0000ff'],
	radius: [120, 150]
};

TemperatureControl.displayName = 'Button';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase);


storiesOf('Agate', module)
	.add(
		'TemperatureControl',
		() => (
			<TemperatureControl
				endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
				max={number('max', Config)}
				min={number('min', Config)}
				onMouseDown={action('onMouseDown')}
				radius={select('radius', prop.radius, Config)}
				startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
				strokeWidth={number('strokeWidth', Config)}
			/>
		),
		{
			text: 'The basic arc'
		}
	);
