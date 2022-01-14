import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';
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

export const _TooltipButton = (args) => (
	<div style={{textAlign: 'center'}}>
		<TooltipButton
			backgroundOpacity={args['backgroundOpacity']}
			disabled={args['disabled']}
			icon={args['icon']}
			onClick={action('onClick')}
			selected={args['selected']}
			size={args['size']}
			tooltipDelay={args['tooltipDelay']}
			tooltipMarquee={args['tooltipMarquee']}
			tooltipPosition={args['tooltipPosition']}
			tooltipRelative={args['tooltipRelative']}
			tooltipText={args['tooltip']}
			tooltipWidth={args['tooltipWidth']}
		>
			{args['children']}
		</TooltipButton>
	</div>
);

select('backgroundOpacity', _TooltipButton, ['opaque', 'lightOpaque', 'transparent'], Config);
boolean('disabled', _TooltipButton, Config);
select('icon', _TooltipButton, ['', ...iconList], Config);
boolean('selected', _TooltipButton, Config);
select('size', _TooltipButton, ['smallest', 'small', 'large', 'huge'], Config);
number('tooltipDelay', _TooltipButton, Config, 500);
boolean('tooltipMarquee', _TooltipButton, Config);
select('tooltipPosition', _TooltipButton, prop.tooltipPosition, Config);
boolean('tooltipRelative', _TooltipButton, Config);
text('tooltip', _TooltipButton, Config, 'Tooltip');
number('tooltipWidth', _TooltipButton, Config);
text('children', _TooltipButton, Config, 'Click me');

_TooltipButton.storyName = 'TooltipDecorator';
_TooltipButton.parameters = {
	info: {
		text: 'The basic TooltipDecorator'
	}
};
