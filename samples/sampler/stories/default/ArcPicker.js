import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, select} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ArcPicker, {ArcPickerBase} from '@enact/agate/ArcPicker';

ArcPicker.displayName = 'ArcPicker';
const Config = mergeComponentMetadata('ArcPicker', ArcPicker, ArcPickerBase);

// Set up some defaults for colors
const prop = {
	colors: ['#444444', '#eeeeee', '#ffffff', '#986aad', '#0000ff']
};

storiesOf('Agate', module)
	.add(
		'ArcPicker',
		() => {
			const itemCount = number('items', Config, {range: true, min: 0, max: 40}, 8);
			const items = (new Array(itemCount)).fill().map((i, index) => index + 1);

			return (
				<ArcPicker
					backgroundColor={select('backgroundColor', prop.colors, Config)}
					endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
					foregroundColor={select('foregroundColor', prop.colors, Config)}
					onChange={action('onChange')}
					selectionType={select('selectionType', ['cumulative', 'single'], Config, 'cumulative')}
					startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
					style={{marginTop: ri.scaleToRem(40)}}
				>{items}</ArcPicker>
			);
		},
		{
			text: 'The basic ArcPicker'
		}
	);
