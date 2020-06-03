import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';
const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

const prop = {
	children: 'caption'
};

storiesOf('Agate', module)
	.add(
		'ImageItem',
		() => (
			<div style={{width: '400px', height: '300px'}}>
				<ImageItem
					src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
					children={text('children', prop.children, Config)}
					orientation={select('orientation', ['horizontal', 'vertical'], Config)}
				/>
			</div>
		)
	);