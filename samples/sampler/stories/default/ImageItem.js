import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', 'image0'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', 'image0'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', 'image0'),
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
