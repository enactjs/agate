import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select} from '@enact/storybook-utils/addons/controls';
import ArcPicker, {ArcPickerBase} from '@enact/agate/ArcPicker';

ArcPicker.displayName = 'ArcPicker';
const Config = mergeComponentMetadata('ArcPicker', ArcPicker, ArcPickerBase);

// Set up some defaults for colors
const prop = {
	colors: ['', '#444444', '#eeeeee', '#ffffff', '#986aad', '#0000ff']
};

export default {
	title: 'Agate/ArcPicker',
	component: 'ArcPicker'
};

export const _ArcPicker = (args) => {
	console.log('from _ArcPicker');
	console.log(args['selectionType']);
	const itemCount = args['items'];
	const items = (new Array(itemCount)).fill().map((i, index) => index + 1);

	return (
		<ArcPicker
			backgroundColor={args['backgroundColor']}
			disabled={args['disabled']}
			endAngle={args['endAngle']}
			foregroundColor={args['foregroundColor']}
			onChange={action('onChange')}
			selectionType={args['selectionType']}
			startAngle={args['startAngle']}
		>
			{items}
		</ArcPicker>
	);
};

range('items', _ArcPicker, Config,  {range: true, min: 0, max: 40}, 8);
select('backgroundColor', _ArcPicker, prop.colors, Config);
boolean('disabled', _ArcPicker, Config);
range('endAngle', _ArcPicker, Config, {range: true, min: 0, max: 360});
select('foregroundColor', _ArcPicker, prop.colors, Config);
select('selectionType', _ArcPicker, ['cumulative', 'single'], Config, 'cumulative');
range('startAngle', _ArcPicker, Config, {range: true, min: 0, max: 360});
_ArcPicker.storyName = 'ArcPicker';
_ArcPicker.parameters = {
	info: {
		text: 'The basic ArcPicker'
	}
};
