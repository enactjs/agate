import ColorPicker from '@enact/agate/ColorPicker';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {text, select} from '../../src/enact-knobs';

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
				defaultValue={text('defaultValue', ColorPicker, '#3467af')}
				onChange={action('onChange')}
			>
				{prop.colors}
			</ColorPicker>
		),
		{
			text: 'The basic ColorPicker'
		}
	);
