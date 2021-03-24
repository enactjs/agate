import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import Slider, {SliderBase, SliderTooltip} from '@enact/agate/Slider';

const Config = mergeComponentMetadata('Slider', SliderBase, Slider);
const SliderTooltipConfig = mergeComponentMetadata('SliderTooltip', SliderTooltip);

Slider.displayName = 'Slider';
SliderTooltip.displayName = 'SliderTooltip';

export default {
	title: 'Agate/Slider',
	component: 'Slider'
};

export const _Slider = () => {
	// added here to force Storybook to put the Slider tab first
	const disabled = boolean('disabled', Config);

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = boolean('tooltip', SliderTooltipConfig);
	const percent = boolean('percent', SliderTooltipConfig);
	const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], SliderTooltipConfig, '');

	return (
		<Slider
			activateOnFocus={boolean('activateOnFocus', Config)}
			backgroundProgress={number('backgroundProgress', Config, {range: true, min: 0, max: 1, step: 0.01}, 0.5)}
			disabled={disabled}
			knobStep={number('knobStep', Config)}
			max={number('max', Config)}
			min={number('min', Config)}
			onActivate={action('onActivate')}
			onKeyDown={action('onKeyDown')}
			onKeyUp={action('onKeyUp')}
			orientation={select('orientation', ['horizontal', 'vertical'], Config, 'horizontal')}
			progressAnchor={number('progressAnchor', Config, {range: true, min: 0, max: 1, step: 0.1}, 0)}
			step={number('step', Config)}
		>
			{tooltip ? (
				<SliderTooltip
					percent={percent}
					position={position}
				/>
			) : null}
		</Slider>
	);
};

_Slider.storyName = 'Slider';
_Slider.parameters = {
	info: {
		text: 'The basic Slider'
	}
};
