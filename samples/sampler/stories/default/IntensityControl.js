import {mergeComponentMetadata} from '@enact/storybook-utils';
import {number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import IntensityControl from '@enact/agate/IntensityControl';

IntensityControl.displayName = 'IntensityControl';
const Config = mergeComponentMetadata('IntensityControl', IntensityControl);

storiesOf('Agate', module)
	.add(
		'IntensityControl',
		() => (
			<IntensityControl
				value={number('value', Config, {range: true, min: 0, max: 10, step: 1}, 4)}
			/>
		),
		{
			text: 'The basic IntensityControl'
		}
	);
