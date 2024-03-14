import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

import {svgGenerator} from '../helper/svg';

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', 'image0'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', 'image0'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', 'image0'),
	invalidUrl: "ttps://placehold.co/300x300/9037ab/ffffff&text=Image0"
};

ImageItem.displayName = 'ImageItem';
const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

export default {
	title: 'Agate/ImageItem',
	component: 'ImageItem'
};

export const _ImageItem = (args) => (
	<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
		<ImageItem
			captionPosition={args['captionPosition']}
			disabled={args['disabled']}
			onError={action('onError')}
			onLoad={action('onLoad')}
			orientation={args['orientation']}
			sizing={args['sizing']}
			src={args['src']}
		>
			{args['children']}
		</ImageItem>
	</div>
);

select('captionPosition', _ImageItem, ['below', 'overlay'], Config);
boolean('disabled', _ImageItem, Config);
select('orientation', _ImageItem, ['horizontal', 'vertical'], Config);
select('sizing', _ImageItem, ['fill', 'fit', 'none'], Config);
select('src', _ImageItem, src, Config, src.hd);
text('children', _ImageItem, Config, 'caption');

_ImageItem.storyName = 'ImageItem';
_ImageItem.parameters = {
	info: {
		text: 'Basic usage of ImageItem'
	}
};
