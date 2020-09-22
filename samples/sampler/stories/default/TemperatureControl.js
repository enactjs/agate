import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

// Set up some defaults for colors and radius
const prop = {
	scale: ['C', 'F']
};

TemperatureControl.displayName = 'Button';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase, TemperatureControl);

storiesOf('Agate', module)
	.add(
		'TemperatureControl',
		() => (
			<TemperatureControl
				max={number('max', Config)}
				min={number('min', Config)}
				onMouseDown={action('onMouseDown')}
				scale={select('scale', prop.scale, Config)}
			/>
		),
		{
			text: 'Temperature Control'
		}
	);
