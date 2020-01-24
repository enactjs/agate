import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text, number} from '@enact/storybook-utils/addons/knobs';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import LabeledIconButton from '@enact/agate/LabeledIconButton';

import iconNames from './icons';

const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, LabeledIconButton);
Config.displayName = 'LabeledIconButton';

storiesOf('Agate', module)
	.add(
		'LabeledIconButton',
		() => (
			<LabeledIconButton
				backgroundOpacity={select('backgroundOpacity', ['', 'opaque', 'lightOpaque', 'transparent'], Config, '')}
				disabled={boolean('disabled', Config)}
				highlighted={boolean('highlighted', Config)}
				icon={select('icon', ['', ...iconNames], Config, 'temperature')}
				inline={boolean('inline', Config)}
				labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
				selected={boolean('selected', Config)}
				size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
				spriteCount={number('spriteCount', Config, {min: 1}, 1)}
			>
				{text('children', Config, 'Hello LabeledIconButton')}
			</LabeledIconButton>
		),
		{
			text: 'Basic usage of LabeledIconButton'
		}
	);
