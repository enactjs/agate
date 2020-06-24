import ri from '@enact/ui/resolution';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

storiesOf('Agate', module)
	.add(
		'ImageItem',
		() => (
			<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
				<ImageItem
					src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
					orientation={select('orientation', ['horizontal', 'vertical'], Config)}
				>
					{text('children', Config, 'caption')}
				</ImageItem>
			</div>
		),
		{
			text: 'Basic usage of ImageItem'
		}
	);

storiesOf('Agate QA.Image', module)
	.add(
		'without children',
		() => (
			<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
				<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" />
			</div>
		)
	);
