import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Heading from '@enact/agate/Heading';

import ImageItem from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

storiesOf('Agate QA.ImageItem', module)
	.add(
		'Kitchen Sink',
		() => (
			<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
				<Heading showline>ImageItem</Heading>
				<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" />
			</div>
		)
	);
