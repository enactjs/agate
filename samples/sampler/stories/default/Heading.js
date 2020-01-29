import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Heading, {HeadingBase} from '@enact/agate/Heading';

Heading.displayName = 'Heading';
const Config = mergeComponentMetadata('Heading', Heading, HeadingBase);

const prop = {
	colors: ['', '#E6444B', '#FDC902', '#986AAD', '#4E75E1', '#30CC83', '#44C8D5', '#47439B', '#2D32A6', '#4E75E1'],
	sizes: ['', 'title', 'large', 'medium', 'small', 'tiny'],
	spacings: ['', 'auto', 'title', 'large', 'medium', 'small', 'none']
};

storiesOf('Agate', module)
	.add(
		'Heading',
		() => (
			<Heading
				color={select('color', prop.colors, Config)}
				showLine={boolean('showLine', Config)}
				size={select('size', prop.sizes, Config)}
				spacing={select('spacing', prop.spacings, Config)}
			>
				{text('children', Heading, 'Heading Text')}
			</Heading>
		),
		{
			text: 'The basic Heading'
		}
	);
