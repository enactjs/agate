import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

TemperatureControl.displayName = 'Temperature Control';
const Config = mergeComponentMetadata('TemperatureControl',TemperatureControlBase, TemperatureControl);

storiesOf('Agate', module)
	.add(
		'TemperatureControl',
		() => (
			<TemperatureControl
				minValue={number('minValue', Config)}
				maxValue={number('maxValue', Config)}
			/>
		),
		{
			text: 'The basic Temperature Control'
		}
	);
