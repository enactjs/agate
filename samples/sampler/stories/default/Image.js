import {object, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Image, {ImageBase, ImageDecorator} from '@enact/agate/Image';

const src = {
	'hd':  'http://via.placeholder.com/200x200',
	'fhd': 'http://via.placeholder.com/300x300',
	'uhd': 'http://via.placeholder.com/600x600'
};

const Config = mergeComponentMetadata('Image', Image, ImageBase, ImageDecorator);
Image.displayName = 'Image';

storiesOf('Agate', module)
	.add(
		'Image',
		() => (
			<Image
				sizing={select('sizing', ['fill', 'fit', 'none'], Config, 'fill')}
				src={object('src', Config, src)}
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
		),
		{
			text: 'The basic Image'
		}
	);
