import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ArcSlider, {ArcSliderBase} from '@enact/agate/ArcSlider';

ArcSlider.displayName = 'ArcSlider';
const Config = mergeComponentMetadata('ArcSlider', ArcSliderBase, ArcSlider);

// Set up some defaults for info and knobs
const prop = {
	colors: ['', '#000000', '#FDC902', '#986AAD']
};

storiesOf('Agate', module)
	.add(
		'ArcSlider',
		() => (
			<ArcSlider
				backgroundColor={select('backgroundColor', prop.colors, Config)}
				foregroundColor={select('foregroundColor', prop.colors, Config)}
				endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
				diameter={number('diameter', Config)}
				max={number('max', Config)}
				min={number('min', Config)}
				startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
				strokeWidth={number('strokeWidth', Config)}
				value={number('value', Config, {range: true, min: 0, max: 100})}
			/>
		),
		{
			text: 'The basic arc'
		}
	);
