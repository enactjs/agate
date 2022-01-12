import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/controls';
import Keypad from '@enact/agate/Keypad';

Keypad.displayName = 'Keypad';
const Config = mergeComponentMetadata('Keypad', Keypad);

export default {
	title: 'Agate/Keypad',
	component: 'Keypad'
};

export const _Keypad = (args) => (
	<Keypad
		disabled={args['disabled']}
		activeCall={args['activeCall']}
		onChange={action('onChange')}
		spotlightDisabled={args['spotlightDisabled']}
	/>
);
boolean('disabled', _Keypad, Config);
boolean('activeCall', _Keypad, Config);
boolean('spotlightDisabled', _Keypad, Config);
_Keypad.storyName = 'Keypad';
_Keypad.parameters = {
	info: {
		text: 'Basic usage of Keypad'
	}
};
