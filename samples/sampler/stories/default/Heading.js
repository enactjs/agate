import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import BodyText from '@enact/ui/BodyText';
import Heading, {HeadingBase} from '@enact/agate/Heading';

import css from './Heading.module.less';

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

export const _Heading = () => {
	const knobProps = {
		color: select('color', prop.colors, Config),
		disabled: boolean('disabled', Config),
		marqueeOn: select('marqueeOn', prop.marqueeOn, Config),
		showBackButton: boolean('showBackButton', Config),
		showLine: boolean('showLine', Config),
		size: select('size', prop.sizes, Config),
		spacing: select('spacing', prop.spacings, Config)
	};
	return (
		<>
			<Heading {...knobProps}>
				{text('children', Config, 'Heading Text')}
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
				{(knobProps.size === 'title' || typeof knobProps.color === 'undefined') ? null : (
					<span>
						<br />
						<strong>Note</strong>: The <code>color</code> prop only applies when the <code>size</code> prop is &quot;title&quot;.
					</span>
				)}
			</BodyText> 
		</>
	);
};

_Heading.storyName = 'Heading';
_Heading.parameters = {
	info: {
		text: 'The basic Heading'
	}
};
