import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, number, range} from '@enact/storybook-utils/addons/controls';
import ArcSlider, {ArcSliderBase} from '@enact/agate/ArcSlider';

ArcSlider.displayName = 'ArcSlider';
const Config = mergeComponentMetadata('ArcSlider', ArcSliderBase, ArcSlider);

// Set up some defaults for colors and radius
const prop = {
	colors: ['', '#444444', '#ffffff', '#000000', '#fdc902', '#986aad', '#0000ff'],
	radius: [120, 150]
};

export default {
	title: 'Agate/ArcSlider',
	component: 'ArcSlider'
};

export const _ArcSlider = (args) => (
	<ArcSlider
		backgroundColor={args['backgroundColor']}
		disabled={args['disabled']}
		endAngle={args['endAngle']}
		foregroundColor={args['foregroundColor']}
		max={args['max']}
		min={args['min']}
		onChange={action('onChange')}
		onDown={action('onDown')}
		onDrag={action('onDrag')}
		onDragEnd={action('onDragEnd')}
		onDragStart={action('onDragStart')}
		radius={args['radius']}
		startAngle={args['startAngle']}
		step={args['step']}
		strokeWidth={args['strokeWidth']}
	/>
);

select('backgroundColor', _ArcSlider, prop.colors, Config);
boolean('disabled', _ArcSlider, Config);
range('endAngle', _ArcSlider,Config, {range: true, min: 0, max: 360});
select('foregroundColor',_ArcSlider,  prop.colors, Config);
number('max', _ArcSlider, Config);
number('min', _ArcSlider, Config);
select('radius', _ArcSlider,prop.radius, Config);
range('startAngle', _ArcSlider, Config, {range: true, min: 0, max: 360});
number('step', _ArcSlider, Config);
number('strokeWidth', _ArcSlider, Config)
_ArcSlider.storyName = 'ArcSlider';
_ArcSlider.parameters = {
	info: {
		text: 'The basic ArcSlider'
	}
};
