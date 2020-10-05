import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

const prop = {
	unit: ['Celsius', 'Fahrenheit']
};

TemperatureControl.displayName = 'TemperatureControl';
const Config = mergeComponentMetadata('TemperatureControl', TemperatureControlBase, TemperatureControl);

storiesOf('Agate', module)
	.add(
		'TemperatureControl',
		() => (
			<TemperatureControl
				max={number('max', Config)}
				min={number('min', Config)}
				onChange={action('onChange')}
				style={{marginTop: ri.scaleToRem(40)}}
				unit={select('unit', prop.unit, Config)}
			/>
		),
		{
			text: 'Temperature Control'
		}
	);
