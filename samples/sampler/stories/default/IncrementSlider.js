import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import IncrementSlider, {IncrementSliderBase} from '@enact/agate/IncrementSlider';

import {decrementIcons, incrementIcons} from './icons';

IncrementSlider.displayName = 'IncrementSlider';
const Config = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);

storiesOf('Agate', module)
	.add(
		'IncrementSlider',
		() => (
			<IncrementSlider
				active={boolean('active', Config)}
				decrementIcon={select('decrementIcon', decrementIcons, Config)}
				disabled={boolean('disabled', Config)}
				focused={boolean('focused', Config)}
				incrementIcon={select('incrementIcon', incrementIcons, Config)}
				knobStep={number('knobStep', Config)}
				max={number('max', Config)}
				min={number('min', Config)}
				noFill={boolean('noFill', Config)}
				onActivate={action('onActivate')}
				onChange={action('onChange')}
				onDragEnd={action('onDragEnd')}
				onDragStart={action('onDragStart')}
				orientation={select('orientation', ['horizontal', 'vertical'], Config, 'horizontal')}
				step={number('step', Config)}
			/>
		),
		{
			text: 'The basic IncrementSlider'
		}
	);
