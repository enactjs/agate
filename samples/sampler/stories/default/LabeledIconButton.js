import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import React from 'react';

import LabeledIconButton from '@enact/agate/LabeledIconButton';

import {iconList} from './icons';

const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, LabeledIconButton);

export default {
	title: 'Agate/LabeledIconButton',
	component: 'LabeledIconButton'
};

export const _LabeledIconButton = () => (
	<LabeledIconButton
		backgroundOpacity={select('backgroundOpacity', ['', 'opaque', 'lightOpaque', 'transparent'], Config, '')}
		disabled={boolean('disabled', Config)}
		highlighted={boolean('highlighted', Config)}
		icon={select('icon', ['', ...iconList], Config, 'temperature')}
		inline={boolean('inline', Config)}
		labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
		selected={boolean('selected', Config)}
		size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
	>
		{text('children', Config, 'Hello LabeledIconButton')}
	</LabeledIconButton>
);

_LabeledIconButton.storyName = 'LabeledIconButton';
_LabeledIconButton.parameters = {
	info: {
		text: 'Basic usage of LabeledIconButton'
	}
};
