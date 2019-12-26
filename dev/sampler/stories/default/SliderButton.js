import SliderButton, {SliderButtonBase} from '@enact/agate/SliderButton';
import {icons} from '@enact/agate/Icon';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {boolean, select} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

SliderButton.displayName = 'SliderButton';
const Config = mergeComponentMetadata('SliderButton', SliderButtonBase, SliderButton);

// Set up some defaults for info and knobs
const prop = {
	icons: ['', ...Object.keys(icons)],
	3: [
		'Light Speed',
		'Ridiculous Speed',
		'Ludicrous Speed'
	],
	5: [
		'Light Speed',
		'Ridiculous Speed',
		'Ludicrous Speed',
		'Bananas Speed',
		'OK Enough Speed'
	]
};

storiesOf('Agate', module)
	.add(
		'SliderButton',
		() => (
			<SliderButton
				onChange={action('onChange')}
				disabled={boolean('disabled', Config)}
			>
				{prop[select('options', [3, 5], Config, '3')]}
			</SliderButton>
		),
		{
			text: 'The basic SliderButton'
		}
	);
