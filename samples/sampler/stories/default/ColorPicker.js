import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ColorPicker, {ColorPickerBase} from '@enact/agate/ColorPicker';

ColorPicker.displayName = 'ColorPicker';
const Config = mergeComponentMetadata('ColorPicker', ColorPickerBase, ColorPicker );

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

export default {
	title: 'Agate/ColorPicker',
	component: 'ColorPicker'
};

export const _ColorPicker = (args) => {
	const direction = args['direction'];
	const colors = prop.presets[
		args['color palette'] || 'Default'
	];
	return (
		<ColorPicker
			direction={direction}
			disabled={args['disabled']}
			onChange={action('onChange')}
			defaultValue={colors[0]}
		>
			{colors}
		</ColorPicker>
	);
};

select('direction', _ColorPicker, prop.direction, Config, 'right');
boolean('disabled', _ColorPicker, Config);
select('color palette', _ColorPicker, Object.keys(prop.presets), StoryOptions, prop.presets['Default']);

_ColorPicker.storyName = 'ColorPicker';
_ColorPicker.parameters = {
	info: {
		text: 'The basic ColorPicker'
	}
};
