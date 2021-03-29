import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select, boolean} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import ThumbnailItem, {ThumbnailItemBase} from '@enact/agate/ThumbnailItem';

ThumbnailItem.displayName = 'ThumbnailItem';

const Config = mergeComponentMetadata('ThumbnailItem', ThumbnailItem, ThumbnailItemBase);

storiesOf('Agate', module)
	.add(
		'ThumbnailItem',
		() => (
			<ThumbnailItem
				disabled={boolean('disabled', Config)}
				inline={boolean('inline', Config)}
				label={text('label', Config, 'Sub Content')}
				selected={boolean('selected', Config)}
				src="https://dummyimage.com/64/e048e0/0011ff"
				type={select('type', ['normal', 'styled'], Config)}
			>
				{text('children', Config, 'Main Content')}
			</ThumbnailItem>
		),
		{
			text: 'Basic usage of ThumbnailItem'
		}
	);
