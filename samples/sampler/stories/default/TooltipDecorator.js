import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';
import Button from '@enact/agate/Button';
import TooltipDecorator, {Tooltip, TooltipBase} from '@enact/agate/TooltipDecorator';

import iconNames from './icons';

Button.displayName = 'TooltipDecorator';
const Config = mergeComponentMetadata('TooltipDecorator', TooltipDecorator, Tooltip, TooltipBase);
const TooltipButton = TooltipDecorator(
	{tooltipDestinationProp: 'decoration'},
	Button
);

const prop = {
	icons: ['', ...iconNames],
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

storiesOf('Agate', module)
	.add(
		'TooltipDecorator',
		() => (
			<div style={{textAlign: 'center'}}>
				<TooltipButton
					backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
					disabled={boolean('disabled', Config)}
					icon={select('icon', prop.icons, Config)}
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
		),
		{
			text: 'The basic TooltipDecorator'
		}
	);
