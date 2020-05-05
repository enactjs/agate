import {action} from '@enact/storybook-utils/addons/actions';
import {select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ColorPicker from '@enact/agate/ColorPicker';

ColorPicker.displayName = 'ColorPicker';
const prop = {
	direction: ['top', 'right', 'bottom', 'left'],
	colors: ['green', 'yellow', 'orange', 'red', 'black', 'gray', 'white', 'maroon', 'brown']
};

storiesOf('Agate', module)
	.add(
		'ColorPicker',
		() => (
			<ColorPicker
				direction={select('direction', prop.direction, ColorPicker, 'right')}
				onChange={action('onChange')}
				defaultValue={text('value', ColorPicker, '#3467af')}
			>
				{prop.colors}
			</ColorPicker>
		),
		{
			text: 'The basic ColorPicker'
		}
	);
