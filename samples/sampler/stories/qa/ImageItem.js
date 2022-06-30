import ri from '@enact/ui/resolution';
import ImageItem from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const withoutChildren = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			src="http://via.placeholder.com/300x400/9037ab/ffffff/png?text=Image0"
		/>
	</div>
);

withoutChildren.storyName = 'without children';
