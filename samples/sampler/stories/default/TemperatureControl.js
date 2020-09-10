import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import TemperatureControl, {TemperatureControlBase} from '@enact/agate/TemperatureControl';

const Config = mergeComponentMetadata('Temperature Control', TemperatureControlBase, TemperatureControl);

storiesOf('Agate', module)
	.add(
		'Temperature Control',
		() => (
			<TemperatureControl
				min={number('min', Config)}
				max={number('max', Config)}
			/>
		),
		{
			text: 'The basic Temperature Control'
		}
	);
