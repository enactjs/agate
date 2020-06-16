import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ThumbnailItem from '@enact/agate/ThumbnailItem';

ThumbnailItem.displayName = 'ThumbnailItem';

const Config = mergeComponentMetadata('ThumbnailItem', ThumbnailItem);

storiesOf('Agate', module)
	.add(
		'ThumbnailItem',
		() => (
			<ThumbnailItem
				src="https://dummyimage.com/64/e048e0/0011ff"
				roundThumbnail={boolean('roundThumbnail', Config)}
				content={text('content', Config, 'Main Content')}
				subContent={text('subContent', Config, 'Sub Content')}
			/>
		),
		{
			text: 'Basic usage of ThumbnailItem'
		}
	);
