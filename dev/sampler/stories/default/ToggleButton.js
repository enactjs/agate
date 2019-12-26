import Button, {ButtonBase} from '@enact/agate/Button';
import ToggleButton, {ToggleButtonBase} from '@enact/agate/ToggleButton';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import icons from './icons';
import {boolean, select, text} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

ToggleButton.displayName = 'ToggleButton';
const Config = mergeComponentMetadata('ToggleButton', UIButtonBase, UIButton, ButtonBase, Button, ToggleButtonBase, ToggleButton);

// Set up some defaults for info and knobs
const prop = {
	icons: ['', ...icons]
};

storiesOf('Agate', module)
	.add(
		'ToggleButton',
		() => (
			<ToggleButton
				backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
				disabled={boolean('disabled', Config)}
				icon={select('icon', prop.icons, Config)}
				size={select('size', ['small', 'large'], Config)}
				onClick={action('onClick')}
				onToggle={action('onToggle')}
				underline={boolean('underline', Config, true)}
				toggleOffLabel={text('toggleOffLabel', Config, 'Off')}
				toggleOnLabel={text('toggleOnLabel', Config, 'On')}
				type={select('type', ['grid', 'standard'], Config, 'standard')}
			>
				{text('children', ToggleButton, 'Click me')}
			</ToggleButton>
		),
		{
			text: 'The basic ToggleButton'
		}
	);
