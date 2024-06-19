import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import BodyText from '@enact/ui/BodyText';
import Heading, {HeadingBase} from '@enact/agate/Heading';

import * as css from './Heading.module.less';

Heading.displayName = 'Heading';
const Config = mergeComponentMetadata('Heading', Heading, HeadingBase);

const prop = {
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	marqueeOn: ['hover', 'render'],
	sizes: ['', 'title', 'subtitle', 'large', 'medium', 'small', 'tiny'],
	spacings: ['', 'auto', 'title', 'large', 'medium', 'small', 'none']
};

export default {
	title: 'Agate/Heading',
	component: 'Heading'
};

export const _Heading = (args) => {
	const actionProps = {
		color: args['color'],
		disabled: args['disabled'],
		marqueeOn: args['marqueeOn'],
		showBackButton: args['showBackButton'],
		showLine: args['showLine'],
		size: args['size'],
		spacing: args['spacing']
	};
	return (
		<>
			<Heading {...actionProps}>
				{args['children']}
			</Heading>
			<BodyText
				centered
				className={css.spacingIndicator}
			>
				This <a href="https://enactjs.com/docs/modules/ui/BodyText/">BodyText</a> component is rendered immediately after the Heading component and is<br />
				meant to provide a visual indicator of the effects of changing the <code>spacing</code> prop.
				<span className={css.spacingNote}>
					Choose a different skin from the Global Knobs to see!
				</span>
				{(actionProps.size === 'title' || typeof actionProps.color === 'undefined') ? null : (
					<span>
						<br />
						<strong>Note</strong>: The <code>color</code> prop only applies when the <code>size</code> prop is &quot;title&quot;.
					</span>
				)}
			</BodyText>
		</>
	);
};

select('color', _Heading, prop.colors, Config);
boolean('disabled', _Heading, Config);
select('marqueeOn', _Heading, prop.marqueeOn, Config);
boolean('showBackButton', _Heading, Config);
boolean('showLine', _Heading, Config);
select('size', _Heading, prop.sizes, Config);
select('spacing', _Heading, prop.spacings, Config);
text('children', _Heading, Config, 'Heading Text');

_Heading.storyName = 'Heading';
_Heading.parameters = {
	info: {
		text: 'The basic Heading'
	}
};
