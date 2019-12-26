import IncrementSlider, {IncrementSliderBase} from '@enact/agate/IncrementSlider';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {decrementIcons, incrementIcons} from './icons';
import {boolean, number, select} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

IncrementSlider.displayName = 'IncrementSlider';
const Config = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);

storiesOf('Agate', module)
	.add(
		'IncrementSlider',
		() => (
			<IncrementSlider
				active={boolean('active', Config)}
				decrementIcon={select('decrementIcon', decrementIcons, Config)}
				incrementIcon={select('incrementIcon', incrementIcons, Config)}
				disabled={boolean('disabled', Config)}
				focused={boolean('focused', Config)}
				knobStep={number('knobStep', Config)}
				max={number('max', Config)}
				min={number('min', Config)}
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
