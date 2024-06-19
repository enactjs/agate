import convert from 'color-convert';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, range, select, text} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/ui/BodyText';
import Drawer, {DrawerBase} from '@enact/agate/Drawer';
import Heading from '@enact/agate/Heading';

import * as css from './Drawer.module.less';

Drawer.displayName = 'Drawer';
const Config = mergeComponentMetadata('Drawer', Drawer, DrawerBase);

const StoryOptions = {
	groupId: 'Story Options'
};

const headingValues = {
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	sizes: ['', 'title', 'subtitle', 'large', 'medium', 'small', 'tiny'],
	spacings: ['', 'auto', 'title', 'large', 'medium', 'small', 'none']
};

const {colors: drawerColors} = headingValues;

const opacityRange = {
	range: true,
	min: 0,
	max: 1,
	step: 0.1
};

const convertToRGBa = (hex, opacity) => `rgba(${convert.hex.rgb(hex)},${opacity})`;

export default {
	title: 'Agate/Drawer',
	component: 'Drawer'
};

export const _Drawer = (args) => {
	const noDrawerAnimation = args['noAnimation'];
	const drawerBackgroundColor = args['Drawer background color'];
	const drawerBackgroundOpacity = args['Drawer background opacity'];
	const drawerStyle = {};

	if (drawerBackgroundColor && drawerBackgroundOpacity) {
		drawerStyle.background = convertToRGBa(drawerBackgroundColor, drawerBackgroundOpacity);
	}

	return (
		<BodyText>
			Use the <em>open</em> knob to show or hide the Drawer.<br />
			<br />
			<span className={css.galliumNote}>
				The styling in the Gallium skin does not set a background color for the Drawer,
				therefore it will inherit the value that &lt;body&gt; has.  In some cases it
				may be difficult to see the contents clearly.<br />
				<br />
				You can override the background color for the Drawer in the Story Options or
				choose a different skin (or night mode🌛) from the Global Controls to see!
			</span>
			<Drawer
				noAnimation={noDrawerAnimation}
				onHide={action('onHide')}
				open={args['open']}
				style={drawerStyle}
			>
				<header>
					<Heading>
						{args['header']}
					</Heading>
				</header>
				<BodyText>
					This Drawer is using a <a href="./?path=/story/agate--heading">Heading</a> component
					in the <em>header</em> slot and plain text for the <em>footer</em> slot.<br />
					<br />
					The Heading props can be adjusted in Story Options.
				</BodyText>
				<footer>
					{args['footer']}
				</footer>
			</Drawer>
		</BodyText>
	);
};

boolean('noAnimation', _Drawer, Config);
select('Drawer background color', _Drawer, drawerColors, StoryOptions);
range('Drawer background opacity', _Drawer, StoryOptions, opacityRange, 0.85);
boolean('open', _Drawer, Config);
text('header', _Drawer, Config, '[insert witty header text]');
text('footer', _Drawer, Config, '');

_Drawer.storyName = 'Drawer';
_Drawer.parameters = {
	info: {
		text: 'The basic Drawer'
	}
};
