import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UiIcon from '@enact/ui/Icon';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Icon, {IconBase} from '@enact/agate/Icon';
import LabeledIcon from '@enact/agate/LabeledIcon';

import iconNames from './icons';

LabeledIcon.displayName = 'LabeledIcon';

const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);
storiesOf('Agate', module)
	.add(
		'LabeledIcon',
		() => (
			<LabeledIcon
				disabled={boolean('disabled', Config)}
				flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
				icon={select('icon', ['', ...iconNames], Config, 'temperature')}
				inline={boolean('inline', Config)}
				labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
				size={select('size', ['small', 'large'], Config)}
			>
				{text('children', Config, 'Hello LabeledIcon')}
			</LabeledIcon>
		),
		{
			text: 'Basic usage of LabeledIcon'
		}
	);
