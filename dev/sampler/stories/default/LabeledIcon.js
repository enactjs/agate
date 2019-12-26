import Icon, {IconBase} from '@enact/agate/Icon';
import LabeledIcon from '@enact/agate/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import iconNames from './icons';
import {boolean, text, select} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';
LabeledIcon.displayName = 'LabeledIcon';

const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

storiesOf('Agate', module)
	.add(
		'LabeledIcon',
		() => (
			<LabeledIcon
				icon={select('icon', ['', ...iconNames], LabeledIcon, 'temperature')}
				disabled={boolean('disabled', LabeledIcon)}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('children', LabeledIcon, 'Hello LabeledIcon')}
			</LabeledIcon>
		),
		{
			text: 'Basic usage of LabeledIcon'
		}
	);
