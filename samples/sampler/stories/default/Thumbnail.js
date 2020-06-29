import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ThumbnailItem from '@enact/agate/ThumbnailItem';

const Config = mergeComponentMetadata('ThumbnailItem', ThumbnailItem);
ThumbnailItem.displayName = 'ThumbnailItem';

storiesOf('Agate', module)
	.add(
		'ThumbnailItem',
		() => (
			<div>
				<ThumbnailItem
					src={text('src', Config, 'https://dummyimage.com/64/e048e0/0011ff')}
				>
					An image!
				</ThumbnailItem>
			</div>
		),
		{
			info: {
				text: 'Basic usage of ThumbnailItem'
			}
		}
	);
