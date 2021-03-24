import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select, boolean} from '@enact/storybook-utils/addons/knobs';
import ThumbnailItem, {ThumbnailItemBase} from '@enact/agate/ThumbnailItem';

ThumbnailItem.displayName = 'ThumbnailItem';
const Config = mergeComponentMetadata('ThumbnailItem', ThumbnailItem, ThumbnailItemBase);

export default {
	title: 'Agate/ThumbnailItem',
	component: 'ThumbnailItem'
};

export const _ThumbnailItem = () => (
	<ThumbnailItem
		src="https://dummyimage.com/64/e048e0/0011ff"
		label={text('label', Config, 'Sub Content')}
		type={select('type', ['normal', 'styled'], Config)}
		selected={boolean('selected', Config)}
	>
		{text('children', Config, 'Main Content')}
	</ThumbnailItem>
);

_ThumbnailItem.storyName = 'ThumbnailItem';
_ThumbnailItem.parameters = {
	info: {
		text: 'Basic usage of ThumbnailItem'
	}
};
