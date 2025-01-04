import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number, range} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Slider, {SliderBase, SliderTooltip} from '@enact/agate/Slider';

const Config = mergeComponentMetadata('Slider', SliderBase, Slider);
const SliderTooltipConfig = mergeComponentMetadata('SliderTooltip', SliderTooltip);

Slider.displayName = 'Slider';
SliderTooltip.displayName = 'SliderTooltip';

export default {
	title: 'Agate/Slider',
	component: 'Slider'
};

export const _Slider = (args) => {
	// added here to force Storybook to put the Slider tab first
	const disabled = args['disabled'];

	// tooltip is first, so it appears at the top of the tab. the rest are alphabetical
	const tooltip = args['tooltip'];
	const percent = args['percent'];
	const position = args['position'];
	const orientation = args['orientation'];

	return (
		<Slider
			activateOnFocus={args['activateOnFocus']}
			backgroundProgress={args['backgroundProgress']}
			disabled={disabled}
			knobStep={args['knobStep']}
			max={args['max']}
			min={args['min']}
			onActivate={action('onActivate')}
			onKeyDown={action('onKeyDown')}
			onKeyUp={action('onKeyUp')}
			orientation={orientation}
			progressAnchor={args['progressAnchor']}
			step={args['step']}
			style={orientation === 'vertical' ? {marginLeft: ri.scaleToRem(45)} : null}
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

boolean('disabled', _Slider, Config);
boolean('tooltip', _Slider, SliderTooltipConfig);
boolean('percent', _Slider, SliderTooltipConfig);
select('position', _Slider, ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], SliderTooltipConfig, '');
select('orientation', _Slider, ['horizontal', 'vertical'], Config, 'horizontal');
boolean('activateOnFocus', _Slider, Config);
range('backgroundProgress', _Slider, Config, {range: true, min: 0, max: 1, step: 0.01}, 0.5);
number('knobStep', _Slider, Config);
number('max', _Slider, Config);
number('min', _Slider, Config);
range('progressAnchor', _Slider, Config, {range: true, min: 0, max: 1, step: 0.1}, 0);
number('step', _Slider, Config);

_Slider.storyName = 'Slider';
_Slider.parameters = {
	info: {
		text: 'The basic Slider'
	}
};
