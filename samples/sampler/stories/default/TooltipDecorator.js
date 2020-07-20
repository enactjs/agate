import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';
import Button, {ButtonBase} from '@enact/agate/Button';
import TooltipDecorator from '@enact/agate/TooltipDecorator';
import UiButton from '@enact/ui/Button';
import React from 'react';

Button.displayName = 'TooltipDecorator';
const Config = mergeComponentMetadata('TooltipDecorator', UiButton, ButtonBase, Button);
const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

storiesOf('Agate', module)
	.add(
		'TooltipDecorator',
		() => (
			<TooltipButton
				backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
				disabled={boolean('disabled', Config)}
				onClick={action('onClick')}
				selected={boolean('selected', Config)}
				size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
				tooltipText={text('tooltip', Config, 'Tooltip')}
			>
				{text('children', Button, 'Click me')}
			</TooltipButton>
		),
		{
			text: 'The basic TooltipDecorator'
		}
	);
