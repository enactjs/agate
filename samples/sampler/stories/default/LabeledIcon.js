import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import UiIcon from '@enact/ui/Icon';
import Icon, {IconBase} from '@enact/agate/Icon';
import LabeledIcon from '@enact/agate/LabeledIcon';

import {iconList} from './util/icons';

LabeledIcon.displayName = 'LabeledIcon';
const Config = mergeComponentMetadata('LabeledIcon', UiLabeledIconBase, UiLabeledIcon, UiIcon, IconBase, Icon, LabeledIcon);

export default {
	title: 'Agate/LabeledIcon',
	component: 'LabeledIcon'
};

export const _LabeledIcon = (args) => (
	<LabeledIcon
		disabled={args['disabled']}
		flip={args['flip']}
		icon={args['icon']}
		inline={args['inline']}
		labelPosition={args['labelPosition']}
		size={args['size']}
	>
		{args['children']}
	</LabeledIcon>
);
boolean('disabled', _LabeledIcon, Config);
select('flip', _LabeledIcon, ['', 'both', 'horizontal', 'vertical'], Config, '');
select('icon', _LabeledIcon, ['', ...iconList], Config, 'temperature');
boolean('inline', _LabeledIcon, Config);
select('labelPosition', _LabeledIcon, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
select('size', _LabeledIcon, ['smallest', 'small', 'large', 'huge'], Config);
text('children', _LabeledIcon, Config, 'Hello LabeledIcon');
_LabeledIcon.storyName = 'LabeledIcon';
_LabeledIcon.parameters = {
	info: {
		text: 'Basic usage of LabeledIcon'
	}
};
