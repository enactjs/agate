import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import Slider, {SliderBase} from '@enact/agate/Slider';

Slider.displayName = 'Slider';
const Config = mergeComponentMetadata('Slider', SliderBase, Slider);

storiesOf('Agate', module)
	.add(
		'Slider',
		() => (
			<Slider
				activateOnFocus={boolean('activateOnFocus', Config)}
				disabled={boolean('disabled', Config)}
				knobStep={number('knobStep', Config)}
				max={number('max', Config)}
				min={number('min', Config)}
				onActivate={action('onActivate')}
				onKeyDown={action('onKeyDown')}
				onKeyUp={action('onKeyUp')}
				orientation={select('orientation', ['horizontal', 'vertical'], Config, 'horizontal')}
				progressAnchor={number('progressAnchor', Config, {range: true, min: 0, max: 1, step: 0.1}, 0)}
				step={number('step', Config)}
			/>
		),
		{
			text: 'The basic Slider'
		}
	);
