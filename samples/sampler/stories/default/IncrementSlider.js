import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
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

export const _IncrementSlider = () => {
	// added here to add conditioned styling to vertical Slider so that the tooltip is visible when positioned "left"
	const orientation = select('orientation', ['horizontal', 'vertical'], Config);

	// added here to force Storybook to put the Slider tab first
	const disabled = boolean('disabled', Config);

	// tooltip is first so it appears at the top of the tab. the rest are alphabetical
	const tooltip = boolean('tooltip', IncrementSliderTooltipConfig);
	const percent = boolean('percent', IncrementSliderTooltipConfig);
	const position = select('position', ['', 'above', 'above left', 'above center', 'above right', 'above before', 'above after', 'before', 'left', 'right', 'after', 'below', 'below left', 'below center', 'below right', 'below before', 'below after'], IncrementSliderTooltipConfig, '');


	return (
		<IncrementSlider
			activateOnFocus={boolean('activateOnFocus', Config)}
			decrementIcon={select('decrementIcon', decrementIcons, Config)}
			disabled={disabled}
			incrementIcon={select('incrementIcon', incrementIcons, Config)}
			knobStep={number('knobStep', Config)}
			max={number('max', Config)}
			min={number('min', Config)}
			noFill={boolean('noFill', Config)}
			onActivate={action('onActivate')}
			onChange={action('onChange')}
			onDragEnd={action('onDragEnd')}
			onDragStart={action('onDragStart')}
			orientation={orientation}
			progressAnchor={number('progressAnchor', Config, {range: true, min: 0, max: 1, step: 0.1}, 0)}
			size={select('size', ['small', 'large'], Config)}
			step={number('step', Config)}
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

_IncrementSlider.storyName = 'IncrementSlider';
_IncrementSlider.parameters = {
	info: {
		text: 'The basic IncrementSlider'
	}
};
