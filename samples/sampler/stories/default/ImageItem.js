import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';

import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const _ImageItem = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			src="http://placehold.it/300x400/9037ab/ffffff&text=Image0"
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
			captionPosition={select('captionPosition', ['below', 'overlay'], Config)}
		>
			{text('children', Config, 'caption')}
		</ImageItem>
	</div>
);

_ImageItem.storyName = 'ImageItem';
_ImageItem.parameters = {
	info: {
		text: 'Basic usage of ImageItem'
	}
};
