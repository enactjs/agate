import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Arc, {ArcBase} from '@enact/agate/Arc';

Arc.displayName = 'Arc';
const Config = mergeComponentMetadata('Arc', ArcBase, Arc);

// Set up some defaults for info and knobs
const arcProp = {
	colors: ['', '#000000', '#FDC902', '#986AAD']
};

storiesOf('Arc', module)
	.add(
		'Arc',
		() => (
			<Arc
				color={select('color', arcProp.colors, Config)}
				endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
				onClick={action('onClick')}
				radius={number('radius', Config)}
				startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
				strokeWidth={number('strokeWidth', Config)}
			/>
		)
	);
