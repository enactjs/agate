import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import ColorPicker, {ColorPickerBase} from '@enact/agate/ColorPicker';

ColorPicker.displayName = 'ColorPicker';
const Config = mergeComponentMetadata('ColorPicker', ColorPicker, ColorPickerBase);

const prop = {
	direction: ['up', 'right', 'down', 'left'],
	presets: {
		'Default': ['green', 'yellow', 'orange', 'red', 'black', 'gray', 'white', '#cc5500', 'maroon', 'brown'],
		'Duck Tales': ['lavender', 'red', 'blue', 'green']
	}
};

const StoryOptions = {
	groupId: 'Story Options'
};

storiesOf('Agate', module)
	.add(
		'ColorPicker',
		() => {
			const direction = select('direction', prop.direction, Config, 'right'); // moved out of component to force order of knobs in the story
			const colors = prop.presets[
				select('color palette', Object.keys(prop.presets), StoryOptions, 'Default')
			];
			return (
				<ColorPicker
					direction={direction}
					disabled={boolean('disabled', Config)}
					onChange={action('onChange')}
					defaultValue={colors[0]}
				>
					{colors}
				</ColorPicker>
			);
		},
		{
			text: 'The basic ColorPicker'
		}
	);
