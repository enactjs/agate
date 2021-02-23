import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import UIButton, {ButtonBase as UIButtonBase} from '@enact/ui/Button';

import Button, {ButtonBase} from '@enact/agate/Button';
import ToggleButton, {ToggleButtonBase} from '@enact/agate/ToggleButton';

import {iconList} from './icons';

const Config = mergeComponentMetadata('ToggleButton', UIButtonBase, UIButton, ButtonBase, Button, ToggleButtonBase, ToggleButton);

export default {
	title: 'Agate/ToggleButton',
	component: 'ToggleButton'
};

export const _ToggleButton = () => (
	<ToggleButton
		backgroundOpacity={select('backgroundOpacity', ['opaque', 'lightOpaque', 'transparent'], Config)}
		defaultSelected={boolean('defaultSelected', Config, true)}
		disabled={boolean('disabled', Config)}
		icon={select('icon', ['', ...iconList], Config)}
		onClick={action('onClick')}
		onToggle={action('onToggle')}
		size={select('size', ['smallest', 'small', 'large', 'huge'], Config)}
		toggleOffLabel={text('toggleOffLabel', Config, 'Off')}
		toggleOnLabel={text('toggleOnLabel', Config, 'On')}
		type={select('type', ['grid', 'standard'], Config, 'standard')}
		underline={boolean('underline', Config, true)}
	>
		{text('children', ToggleButton, 'Click me')}
	</ToggleButton>
);

_ToggleButton.storyName = 'ToggleButton';
_ToggleButton.parameters = {
	info: {
		text: 'The basic ToggleButton'
	}
};
