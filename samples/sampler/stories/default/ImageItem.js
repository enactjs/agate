import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, object, text, select} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

const src = {
	'hd':  'http://via.placeholder.com/200x200/9037ab/ffffff&text=Image0',
	'fhd': 'http://via.placeholder.com/300x300/9037ab/ffffff&text=Image0',
	'uhd': 'http://via.placeholder.com/600x600/9037ab/ffffff&text=Image0'
};

ImageItem.displayName = 'ImageItem';
const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const _ImageItem = () => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			captionPosition={select('captionPosition', ['below', 'overlay'], Config)}
			disabled={boolean('disabled', Config)}
			onError={action('onError')}
			onLoad={action('onLoad')}
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
			sizing={select('sizing', ['fill', 'fit', 'none'], Config)}
			src={object('src', Config, src)}
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
