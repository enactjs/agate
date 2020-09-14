import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Arc, {ArcBase} from '@enact/agate/Arc';

Arc.displayName = 'Arc';
const Config = mergeComponentMetadata('Arc', ArcBase, Arc);

// Set up some defaults for info and knobs
const prop = {
	colors: ['', '#000000', '#FDC902', '#986AAD']
};

storiesOf('Agate', module)
	.add(
		'Arc',
		() => (
			<div style={{width:'40%', height:'40%'}}>
				<Arc
					color={select('color', prop.colors, Config)}
					endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
					radius={number('radius', Config)}
					startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
					thickness={number('thickness', Config)}
				/>
			</div>
		),
		{
			text: 'The basic arc'
		}
	);
