import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';
import Button, {ButtonBase} from '@enact/agate/Button';
import UiButton from '@enact/ui/Button';
import React from 'react';

Button.displayName = 'TooltipDecorator';
const Config = mergeComponentMetadata('TooltipDecorator', UiButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	casing: ['preserve', 'sentence', 'word', 'upper'],
};

storiesOf('Agate', module)
	.add(
		'TooltipDecorator',
		() => (
			<Button
				backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
				disabled={boolean('disabled', Config)}
				onClick={action('onClick')}
				selected={boolean('selected', Config)}
				size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
				tooltipText={text('tooltip', Config, 'Tooltip')}
			>
				{text('children', Button, 'Click me')}
			</Button>
		),
		{
			text: 'The basic TooltipDecorator'
		}
	);
