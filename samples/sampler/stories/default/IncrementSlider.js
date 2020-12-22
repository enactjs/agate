import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import IncrementSlider, {IncrementSliderBase, IncrementSliderTooltip} from '@enact/agate/IncrementSlider';

import {decrementIcons, incrementIcons} from './icons';

const Config = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);
const IncrementSliderTooltipConfig = mergeComponentMetadata('IncrementSliderTooltip', IncrementSliderTooltip);

IncrementSlider.displayName = 'IncrementSlider';
IncrementSliderTooltip.displayName = 'IncrementSliderTooltip';


storiesOf('Agate', module)
	.add(
		'IncrementSlider',
		() => {
			// added here to force Storybook to put the Slider tab first
			const disabled = boolean('disabled', Config);

			// tooltip is first so it appears at the top of the tab. the rest are alphabetical
			const tooltip = boolean('tooltip', IncrementSliderTooltipConfig);
			const percent = boolean('percent', IncrementSliderTooltipConfig);
			const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], IncrementSliderTooltipConfig, '');

			return (
				<IncrementSlider
					active={boolean('active', Config)}
					decrementIcon={select('decrementIcon', decrementIcons, Config)}
					disabled={disabled}
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
					orientation={select('orientation', ['horizontal', 'vertical'], Config)}
					progressAnchor={number('progressAnchor', Config, {range: true, min: 0, max: 1, step: 0.1}, 0)}
					showAnchor={boolean('showAnchor', Config)}
					size={select('size', ['small', 'large'], Config)}
					step={number('step', Config)}
				>
					{tooltip ? (
						<IncrementSliderTooltip
							percent={percent}
							position={position}
						/>
					) : null}
				</IncrementSlider>
			);
		},
		{
			text: 'The basic IncrementSlider'
		}
	);
