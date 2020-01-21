import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import UiButton from '@enact/ui/Button';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button, {ButtonBase} from '../../../../Button';

import icons from './icons';

Button.displayName = 'Button';
const Config = mergeComponentMetadata('Button', UiButton, ButtonBase, Button);

// Set up some defaults for info and knobs
const prop = {
	casing: ['preserve', 'sentence', 'word', 'upper'],
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	icons: ['', ...icons],
	joinedPosition: ['', 'left', 'center', 'right']
};

storiesOf('Agate', module)
	.add(
		'Button',
		() => (
			<Button
				animateOnRender={boolean('animateOnRender', Config)}
				animationDelay={number('animationDelay', Config)}
				backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
				badge={text('badge', Config)}
				badgeColor={select('badgeColor', prop.colors, Config)}
				disabled={boolean('disabled', Config)}
				highlighted={boolean('highlighted', Config)}
				icon={select('icon', prop.icons, Config)}
				joinedPosition={select('joinedPosition', prop.joinedPosition, Config)}
				onClick={action('onClick')}
				selected={boolean('selected', Config)}
				size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
				type={select('type', ['standard', 'grid'], Config)}
			>
				{text('children', Button, 'Click me')}
			</Button>
		),
		{
			text: 'The basic Button'
		}
	);
