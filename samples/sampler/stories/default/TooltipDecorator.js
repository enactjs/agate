import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import Button from '@enact/agate/Button';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/agate/TooltipDecorator';

import {iconList} from './util/icons';

const Config = mergeComponentMetadata('TooltipDecorator', TooltipDecorator, Tooltip, TooltipBase);
const TooltipButton = TooltipDecorator(
	{tooltipDestinationProp: 'decoration'},
	Button
);
TooltipButton.displayName = 'TooltipButton';

const prop = {
	icons: ['', ...iconList],
	tooltipPosition: [
		'above',
		'above center',
		'above left',
		'above right',
		'below',
		'below center',
		'below left',
		'below right',
		'left bottom',
		'left middle',
		'left top',
		'right bottom',
		'right middle',
		'right top'
	]
};

export default {
	title: 'Agate/TooltipDecorator',
	component: 'TooltipDecorator'
};

export const _TooltipButton = () => (
	<div style={{marginTop: ri.scaleToRem(99), textAlign: 'center'}}>
		<TooltipButton
			backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
			disabled={boolean('disabled', Config)}
			icon={select('icon', ['', ...iconList], Config)}
			onClick={action('onClick')}
			selected={boolean('selected', Config)}
			size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
			tooltipDelay={number('tooltipDelay', Config, 500)}
			tooltipMarquee={boolean('tooltipMarquee', Config)}
			tooltipPosition={select('tooltipPosition', prop.tooltipPosition, Config)}
			tooltipRelative={boolean('tooltipRelative', Config)}
			tooltipText={text('tooltip', Config, 'Tooltip')}
			tooltipWidth={number('tooltipWidth', Config)}
		>
			{text('children', Config, 'Click me')}
		</TooltipButton>
	</div>
);

_TooltipButton.storyName = 'TooltipDecorator';
_TooltipButton.parameters = {
	info: {
		text: 'The basic TooltipDecorator'
	}
};
