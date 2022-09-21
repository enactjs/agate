import ri from '@enact/ui/resolution';
import ImageItem from '@enact/agate/ImageItem';

import {svgGenerator} from '../helper/svg';

ImageItem.displayName = 'ImageItem';

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const withoutChildren = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			src={svgGenerator(300, 400, '9037ab', 'ffffff', 'Image0')}
		/>
	</div>
);

withoutChildren.storyName = 'without children';
