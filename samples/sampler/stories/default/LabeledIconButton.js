import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {LabeledIconBase as UiLabeledIconBase, LabeledIcon as UiLabeledIcon} from '@enact/ui/LabeledIcon';
import {LabeledIconButtonBase, LabeledIconButton} from '@enact/agate/LabeledIconButton';

import {iconList} from './util/icons';

LabeledIconButton.displayName = 'LabeledIconButton';
const Config = mergeComponentMetadata('LabeledIconButton', UiLabeledIconBase, UiLabeledIcon, LabeledIconButtonBase, LabeledIconButton);

export default {
	title: 'Agate/LabeledIconButton',
	component: 'LabeledIconButton'
};

export const _LabeledIconButton = (args) => (
	<LabeledIconButton
		backgroundOpacity={args['backgroundOpacity']}
		disabled={args['disabled']}
		highlighted={args['highlighted']}
		icon={args['icon']}
		inline={args['inline']}
		labelPosition={args['labelPosition']}
		selected={args['selected']}
		size={args['size']}
		tooltipText={args['tooltipText']}
	>
		{args['children']}
	</LabeledIconButton>
);
select('backgroundOpacity', _LabeledIconButton, ['', 'opaque', 'lightOpaque', 'transparent'], Config, '');
boolean('disabled', _LabeledIconButton, Config);
boolean('highlighted', _LabeledIconButton, Config);
select('icon', _LabeledIconButton, ['', ...iconList], Config, 'temperature');
boolean('inline', _LabeledIconButton, Config);
select('labelPosition', _LabeledIconButton, ['above', 'after', 'before', 'below', 'left', 'right'], Config);
boolean('selected', _LabeledIconButton, Config);
select('size', _LabeledIconButton, ['smallest', 'small', 'large', 'huge'], Config);
text('tooltipText', _LabeledIconButton, Config, 'This is a Labeled Icon Button');
text('children', _LabeledIconButton, Config, 'Hello LabeledIconButton');
_LabeledIconButton.storyName = 'LabeledIconButton';
_LabeledIconButton.parameters = {
	info: {
		text: 'Basic usage of LabeledIconButton'
	}
};
