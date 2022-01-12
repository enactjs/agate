import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import SliderButton, {SliderButtonBase} from '@enact/agate/SliderButton';
import {icons} from '@enact/agate/Icon';

SliderButton.displayName = 'SliderButton';
const Config = mergeComponentMetadata('SliderButton', SliderButtonBase, SliderButton);

// Set up some defaults for info and controls
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

export const _SliderButton = (args) => (
	<SliderButton
		onChange={action('onChange')}
		disabled={args['disabled']}
	>
		{prop[args['options']]}
	</SliderButton>
);
boolean('disabled', _SliderButton, Config);
select('options', _SliderButton, [3, 5], Config, 3);
_SliderButton.storyName = 'SliderButton';
_SliderButton.parameters = {
	info: {
		text: 'The basic SliderButton'
	}
};
