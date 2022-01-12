import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';
import Button, {ButtonBase} from '@enact/agate/Button';
import ToggleButton, {ToggleButtonBase} from '@enact/agate/ToggleButton';

import {iconList} from './util/icons';

ToggleButton.displayName = 'ToggleButton';
const Config = mergeComponentMetadata('ToggleButton', UIButtonBase, UIButton, ButtonBase, Button, ToggleButtonBase, ToggleButton);

export default {
	title: 'Agate/ToggleButton',
	component: 'ToggleButton'
};

export const _ToggleButton = (args) => (
	<ToggleButton
		backgroundOpacity={args['backgroundOpacity']}
		defaultSelected={args['defaultSelected']}
		disabled={args['disabled']}
		icon={args['icon']}
		onClick={action('onClick')}
		onToggle={action('onToggle')}
		size={args['size']}
		toggleOffLabel={args['toggleOffLabel']}
		toggleOnLabel={args['toggleOnLabel']}
		type={args['type']}
		underline={args['underline']}
	>
		{args['children']}
	</ToggleButton>
);
select('backgroundOpacity', _ToggleButton, ['opaque', 'lightOpaque', 'transparent'], Config);
boolean('defaultSelected', _ToggleButton, Config, true);
boolean('disabled', _ToggleButton, Config);
select('icon', _ToggleButton, ['', ...iconList], Config);
select('size', _ToggleButton, ['smallest', 'small', 'large', 'huge'], Config);
text('toggleOffLabel', _ToggleButton, Config, 'Off');
text('toggleOnLabel', _ToggleButton, Config, 'On');
select('type', _ToggleButton, ['grid', 'standard'], Config, 'standard');
boolean('underline', _ToggleButton, Config, true);
text('children', _ToggleButton, Config, 'Click me');
_ToggleButton.storyName = 'ToggleButton';
_ToggleButton.parameters = {
	info: {
		text: 'The basic ToggleButton'
	}
};
