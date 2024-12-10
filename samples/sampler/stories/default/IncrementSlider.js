import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number, range} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import IncrementSlider, {IncrementSliderBase, IncrementSliderTooltip} from '@enact/agate/IncrementSlider';

import {decrementIcons, incrementIcons} from './util/icons';

const Config = mergeComponentMetadata('IncrementSlider', IncrementSliderBase, IncrementSlider);
const IncrementSliderTooltipConfig = mergeComponentMetadata('IncrementSliderTooltip', IncrementSliderTooltip);

IncrementSlider.displayName = 'IncrementSlider';
IncrementSliderTooltip.displayName = 'IncrementSliderTooltip';

export default {
	title: 'Agate/IncrementSlider',
	component: 'IncrementSlider'
};

export const _IncrementSlider = (args) => {
	// added here to add conditioned styling to vertical Slider so that the tooltip is visible when positioned "left"
	const orientation = args['orientation'];

	// added here to force Storybook to put the Slider tab first
	const disabled = args['disabled'];

	// tooltip is first, so it appears at the top of the tab. the rest are alphabetical
	const tooltip = args['tooltip'];
	const percent = args['percent'];
	const position = args['position'];

	return (
		<IncrementSlider
			activateOnFocus={args['activateOnFocus']}
			decrementIcon={args['decrementIcon']}
			disabled={disabled}
			incrementIcon={args['incrementIcon']}
			knobStep={args['knobStep']}
			max={args['max']}
			min={args['min']}
			noFill={args['noFill']}
			onActivate={action('onActivate')}
			onChange={action('onChange')}
			onDragEnd={action('onDragEnd')}
			onDragStart={action('onDragStart')}
			orientation={orientation}
			progressAnchor={args['progressAnchor']}
			size={args['size']}
			step={args['step']}
			style={orientation === 'vertical' ? {marginLeft: ri.scaleToRem(72)} : null}
		>
			{tooltip ? (
				<IncrementSliderTooltip
					percent={percent}
					position={position}
				/>
			) : null}
		</IncrementSlider>
	);
};

boolean('activateOnFocus', _IncrementSlider, Config);
select('decrementIcon', _IncrementSlider, decrementIcons, Config);
boolean('disabled', _IncrementSlider, Config);
select('incrementIcon', _IncrementSlider, incrementIcons, Config);
number('knobStep', _IncrementSlider, Config);
number('max', _IncrementSlider, Config);
number('min', _IncrementSlider, Config);
boolean('noFill', _IncrementSlider, Config);
select('orientation', _IncrementSlider, ['horizontal', 'vertical'], Config);
boolean('percent', _IncrementSlider, IncrementSliderTooltipConfig);
select('position', _IncrementSlider, ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], IncrementSliderTooltipConfig, '');
range('progressAnchor', _IncrementSlider, Config, {range: true, min: 0, max: 1, step: 0.1}, 0);
select('size', _IncrementSlider, ['small', 'large'], Config);
number('step', _IncrementSlider, Config);
boolean('tooltip', _IncrementSlider, IncrementSliderTooltipConfig);

_IncrementSlider.storyName = 'IncrementSlider';
_IncrementSlider.parameters = {
	info: {
		text: 'The basic IncrementSlider'
	}
};
