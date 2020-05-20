import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import BodyText from '@enact/ui/BodyText';
import Heading, {HeadingBase} from '@enact/agate/Heading';

import css from './Heading.module.less';

Heading.displayName = 'Heading';
const Config = mergeComponentMetadata('Heading', Heading, HeadingBase);

const prop = {
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	sizes: ['', 'title', 'subtitle', 'large', 'medium', 'small', 'tiny'],
	spacings: ['', 'auto', 'title', 'large', 'medium', 'small', 'none']
};

storiesOf('Agate', module)
	.add(
		'Heading',
		() => {
			const knobProps = {
				color: select('color', prop.colors, Config),
				showLine: boolean('showLine', Config),
				size: select('size', prop.sizes, Config),
				spacing: select('spacing', prop.spacings, Config)
			};
			return (
				<>
					<Heading {...knobProps}>
						{text('children', Heading, 'Heading Text')}
					</Heading>
					<BodyText
						centered
						className={css.spacingNote}
					>
						The <em>spacing</em> prop will have no effect when using the Gallium skin.
						<br />
						<br />
						Choose a different skin from the Global Knobs to see!
					</BodyText>
				</>
			);
		},
		{
			text: 'The basic Heading'
		}
	);
