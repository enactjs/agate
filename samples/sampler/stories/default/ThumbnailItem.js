import {mergeComponentMetadata} from '@enact/storybook-utils';
import {text, select, boolean} from '@enact/storybook-utils/addons/controls';
import ThumbnailItem, {ThumbnailItemBase} from '@enact/agate/ThumbnailItem';

ThumbnailItem.displayName = 'ThumbnailItem';
const Config = mergeComponentMetadata('ThumbnailItem', ThumbnailItem, ThumbnailItemBase);

export default {
	title: 'Agate/ThumbnailItem',
	component: 'ThumbnailItem'
};

export const _ThumbnailItem = (args) => (
	<ThumbnailItem
		disabled={args['disabled']}
		inline={args['inline']}
		label={args['label']}
		selected={args['selected']}
		src="https://dummyimage.com/64/e048e0/0011ff"
		type={args['type']}
	>
		{args['children']}
	</ThumbnailItem>
);
boolean('disabled', _ThumbnailItem, Config);
boolean('inline', _ThumbnailItem, Config);
text('label', _ThumbnailItem, Config, 'Sub Content');
boolean('selected', _ThumbnailItem, Config);
select('type', _ThumbnailItem, ['normal', 'styled'], Config);
text('children', _ThumbnailItem, Config, 'Main Content');
_ThumbnailItem.storyName = 'ThumbnailItem';
_ThumbnailItem.parameters = {
	info: {
		text: 'Basic usage of ThumbnailItem'
	}
};
