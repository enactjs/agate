import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import SwitchItem from '@enact/agate/SwitchItem';

import {iconList} from './util/icons';

const Config = mergeComponentMetadata('SwitchItem', SwitchItem);
SwitchItem.displayName = 'SwitchItem';

export default {
	title: 'Agate/SwitchItem',
	component: 'SwitchItem'
};

export const _SwitchItem = (args) => (
	<div>
		<SwitchItem
			disabled={args['disabled']}
			icon={args['icon']}
			inline={args['inline']}
			size={args['size']}
			switchOffLabel={args['switchOffLabel']}
			switchOnLabel={args['switchOnLabel']}
		>
			{args['children']}
		</SwitchItem>
	</div>
);

boolean('disabled', _SwitchItem, Config);
select('icon', _SwitchItem, ['', ...iconList], Config, 'music');
boolean('inline', _SwitchItem, Config);
select('size', _SwitchItem, ['small', 'large'], Config, 'large');
text('switchOffLabel', _SwitchItem, Config);
text('switchOnLabel', _SwitchItem, Config);
text('children', _SwitchItem, Config, 'Sound');

_SwitchItem.storyName = 'SwitchItem';
_SwitchItem.parameters = {
	info: {
		text: 'The basic SwitchItem'
	}
};
