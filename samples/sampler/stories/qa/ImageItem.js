import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';

import ImageItem from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

storiesOf('ImageItem', module)
	.add(
		'without children',
		() => (
			<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
				<ImageItem
					src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
				/>
			</div>
		)
	);
