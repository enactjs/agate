import ri from '@enact/ui/resolution';
import React from 'react';

import ImageItem from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const withoutChildren = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
		/>
	</div>
);

withoutChildren.storyName = 'without children';
