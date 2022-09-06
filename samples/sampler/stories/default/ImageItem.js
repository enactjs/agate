import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

const src = {
	hd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' class='img-fluid rounded mx-auto d-block' width='200' height='200'%3E%3Crect width='200' height='200' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E200 X 200%3C/text%3E%3C/svg%3E",
	fhd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' class='img-fluid rounded mx-auto d-block' width='300' height='300'%3E%3Crect width='300' height='300' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E300 X 300%3C/text%3E%3C/svg%3E",
	uhd: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600' class='img-fluid rounded mx-auto d-block' width='600' height='600'%3E%3Crect width='600' height='600' fill='%237ed31d'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23ffffff'%3E600 X 600%3C/text%3E%3C/svg%3E",
	invalidUrl: "ttp://via.placeholder.com/300x300/9037ab/ffffff&text=Image0"
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
