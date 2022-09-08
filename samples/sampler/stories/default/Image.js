import {action} from '@enact/storybook-utils/addons/actions';
import {select} from '@enact/storybook-utils/addons/controls';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import Image, {ImageBase, ImageDecorator} from '@enact/agate/Image';

import css from './Image.module.less';

const svgGenerator = (width, height, bgColor, textColor, customText) => (
	`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' width='${width}' height='${height}'%3E` +
	`%3Crect width='${width}' height='${height}' fill='%23${bgColor}'%3E%3C/rect%3E` +
	`%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='36px' fill='%23${textColor}'%3E${customText}%3C/text%3E%3C/svg%3E`
);

const src = {
	hd: svgGenerator(200, 200, '7ed31d', 'ffffff', '200 X 200'),
	fhd: svgGenerator(300, 300, '7ed31d', 'ffffff', '300 X 300'),
	uhd: svgGenerator(600, 600, '7ed31d', 'ffffff', '600 X 600')
};

Image.displayName = 'Image';
const Config = mergeComponentMetadata('Image', Image, ImageBase, ImageDecorator);

export default {
	title: 'Agate/Image',
	component: 'Image'
};

export const _Image = (args) => (
	<Image
		className={css.image}
		onError={action('onError')}
		onLoad={action('onLoad')}
		sizing={args['sizing']}
		src={args['src']}
		style={{
			border: '#ffa500 dashed 1px',
			marginTop: ri.scaleToRem(50)
		}}
	>
		<label
			style={{
				backgroundColor: 'rgba(255, 165, 0, 0.5)',
				border: '#ffa500 dashed 1px',
				borderBottomWidth: 0,
				borderRadius: '12px 12px 0 0',
				color: '#fff',
				fontSize: '32px',
				fontStyle: 'italic',
				fontWeight: 100,
				padding: '0.1em 1em',
				position: 'absolute',
				transform: 'translateX(-1px) translateY(-100%)'
			}}
		>
			Image Boundry
		</label>
	</Image>
);

select('sizing', _Image, ['fill', 'fit', 'none'], Config, 'fill');
select('src', _Image, src, Config, src.hd);

_Image.storyname = 'Image';
_Image.parameters = {
	info: {
		text: 'The basic Image'
	}
};
