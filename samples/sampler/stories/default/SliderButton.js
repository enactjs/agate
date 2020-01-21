import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import SliderButton, {SliderButtonBase} from '../../../../SliderButton';
import {icons} from '../../../../Icon';

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
