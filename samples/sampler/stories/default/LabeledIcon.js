import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';

import Icon, {IconBase} from '@enact/agate/Icon';
import LabeledIcon from '@enact/agate/LabeledIcon';

import {iconList} from './icons';

const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

export default {
	title: 'Agate/LabeledIcon',
	component: 'LabeledIcon'
};

export const _LabeledIcon = () => (
	<LabeledIcon
		disabled={boolean('disabled', Config)}
		flip={select('flip', ['', 'both', 'horizontal', 'vertical'], Config, '')}
		icon={select('icon', ['', ...iconList], Config, 'temperature')}
		inline={boolean('inline', Config)}
		labelPosition={select('labelPosition', ['above', 'after', 'before', 'below', 'left', 'right'], Config)}
		size={select('size', ['small', 'large'], Config)}
	>
		{text('children', Config, 'Hello LabeledIcon')}
	</LabeledIcon>
);

_LabeledIcon.storyName = 'LabeledIcon';
_LabeledIcon.parameters = {
	info: {
		text: 'Basic usage of LabeledIcon'
	}
};
