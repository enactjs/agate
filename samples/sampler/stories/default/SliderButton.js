import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';

import SliderButton, {SliderButtonBase} from '@enact/agate/SliderButton';
import {icons} from '@enact/agate/Icon';

const Config = mergeComponentMetadata('SliderButton', SliderButtonBase, SliderButton);

// Set up some defaults for info and knobs
const prop = {
	icons: ['', ...Object.keys(icons)],
	3: [
		'Light Speed',
		'Ridiculous Speed',
		'Ludicrous Speed'
	],
	5: [
		'Light Speed',
		'Ridiculous Speed',
		'Ludicrous Speed',
		'Bananas Speed',
		'OK Enough Speed'
	]
};

export default {
	title: 'Agate/SliderButton',
	component: 'SliderButton'
};

export const _SliderButton = () => (
	<SliderButton
		onChange={action('onChange')}
		disabled={boolean('disabled', Config)}
	>
		{prop[select('options', [3, 5], Config, '3')]}
	</SliderButton>
);

_SliderButton.storyName = 'SliderButton';
_SliderButton.parameters = {
	info: {
		text: 'The basic SliderButton'
	}
};
