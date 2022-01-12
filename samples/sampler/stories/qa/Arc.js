import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {number, range, select} from '@enact/storybook-utils/addons/controls';
import Arc, {ArcBase} from '@enact/agate/Arc';

Arc.displayName = 'Arc';
const Config = mergeComponentMetadata('Arc', ArcBase, Arc);

// Set up some defaults for info and controls
const arcProp = {
	colors: ['', '#000000', '#FDC902', '#986AAD']
};

export default {
	title: 'Agate/Arc',
	component: 'Arc'
};

export const ArcBasic = (args) => (
	<Arc
		color={args['color']}
		endAngle={args['endAngle']}
		onClick={action('onClick')}
		radius={args['radius']}
		startAngle={args['startAngle']}
		strokeWidth={args['strokeWidth']}
	/>
);
select('color', ArcBasic, arcProp.colors, Config);
range('endAngle', ArcBasic, Config, {range: true, min: 0, max: 360});
number('radius', ArcBasic, Config);
range('startAngle', ArcBasic, Config, {range: true, min: 0, max: 360});
number('strokeWidth', ArcBasic, Config);
ArcBasic.storyName = 'Arc';
