import LabeledIconButton from '@enact/agate/LabeledIconButton';
import React from 'react';
import {storiesOf} from '@storybook/react';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';

import iconNames from './icons';
import {mergeComponentMetadata} from '../../src/utils';
import {boolean, select, text} from '../../src/enact-knobs';

const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, LabeledIconButton);
Config.displayName = 'LabeledIconButton';

storiesOf('Agate', module)
	.add(
		'LabeledIconButton',
		() => (
			<LabeledIconButton
				disabled={boolean('disabled', Config)}
				icon={select('icon', ['', ...iconNames], Config, 'temperature')}
				inline={boolean('inline', Config)}
				labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
				selected={boolean('selected', Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('children', Config, 'Hello LabeledIconButton')}
			</LabeledIconButton>
		),
		{
			text: 'Basic usage of LabeledIconButton'
		}
	);
