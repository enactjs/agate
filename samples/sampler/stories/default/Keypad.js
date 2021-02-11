import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean} from '@enact/storybook-utils/addons/knobs';
import React from 'react';

import Keypad from '@enact/agate/Keypad';

const Config = mergeComponentMetadata('Keypad', Keypad);

export default {
	title: 'Agate/Keypad',
	component: 'Keypad'
}

export const _Keypad = () => (
	<Keypad
		disabled={boolean('disabled', Config)}
		onChange={action('onChange')}
	/>
);

_Keypad.storyName = 'Keypad';
_Keypad.parameters = {
	info: {
		text: 'Basic usage of Keypad'
	}
};
