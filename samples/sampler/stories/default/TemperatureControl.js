import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

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
				scale={select('scale', prop.scale, Config)}
			/>
		),
		{
			text: 'Temperature Control'
		}
	);
