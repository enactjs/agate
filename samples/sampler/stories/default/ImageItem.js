import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {object, text, select} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import {storiesOf} from '@storybook/react';

import ImageItem, {ImageItemBase} from '@enact/agate/ImageItem';

ImageItem.displayName = 'ImageItem';

const src = {
	'hd':  'http://via.placeholder.com/200x200/9037ab/ffffff&text=Image0',
	'fhd': 'http://via.placeholder.com/300x300/9037ab/ffffff&text=Image0',
	'uhd': 'http://via.placeholder.com/600x600/9037ab/ffffff&text=Image0'
};

const Config = mergeComponentMetadata('ImageItem', ImageItem, ImageItemBase);

storiesOf('Agate', module)
	.add(
		'ImageItem',
		() => (
			<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
				<ImageItem
					onError={action('onError')}
					onLoad={action('onLoad')}
					orientation={select('orientation', ['horizontal', 'vertical'], Config)}
					captionPosition={select('captionPosition', ['below', 'overlay'], Config)}
					src={object('src', Config, src)}
				>
					{text('children', Config, 'caption')}
				</ImageItem>
			</div>
		),
		{
			text: 'Basic usage of ImageItem'
		}
	);
