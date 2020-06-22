import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select} from '@enact/storybook-utils/addons/knobs';
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
				label={text('label', Config, 'Sub Content')}
				type={select('type', ['round', 'square'], Config)}
			>
				{text('children', Config, 'Main Content')}
			</ThumbnailItem>
		),
		{
			text: 'Basic usage of ThumbnailItem'
		}
	);
