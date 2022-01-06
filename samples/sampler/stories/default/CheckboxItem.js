import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import Checkbox, {CheckboxBase} from '@enact/agate/Checkbox';
import CheckboxItem, {CheckboxItemBase} from '@enact/agate/CheckboxItem';
import Icon from '@enact/agate/Icon';
import Item, {ItemBase} from '@enact/agate/Item';

import {iconList} from './util/icons';

CheckboxItem.displayName = 'CheckboxItem';
const Config = mergeComponentMetadata('CheckboxItem', ItemBase, Item, CheckboxBase, Checkbox, CheckboxItemBase, CheckboxItem);
Config.defaultProps.icon = CheckboxBase.defaultProps.children;

export default {
	title: 'Agate/CheckboxItem',
	component: 'CheckboxItem'
};

export const _CheckboxItem = (args) => {
	// const slotBeforeSelection = select('slotBefore', ['', ...iconList], Config);
	const slotBefore = args['slotBefore'] ? (<Icon slot="slotBefore">{args['slotBefore']}</Icon>) : null;

	return (
		<CheckboxItem
			disabled={args['disabled']}
			icon={args['icon']}
			indeterminate={args['indeterminate']}
			indeterminateIcon={args['indeterminateIcon']}
			inline={args['inline']}
			label={args['label']}
			labelPosition={args['labelPosition']}
			onToggle={action('onToggle')}
		>
			{slotBefore}
			{args['children']}
		</CheckboxItem>
	);
};
boolean('disabled', _CheckboxItem,Config);
select('icon', _CheckboxItem, iconList, Config);
boolean('indeterminate', _CheckboxItem, Config);
select('indeterminateIcon', _CheckboxItem, iconList, Config);
boolean('inline', _CheckboxItem, Config)
text('label', _CheckboxItem, Config);
select('labelPosition', _CheckboxItem, ['above', 'after', 'before', 'below'], Config)
text('children', _CheckboxItem, Config, 'Hello CheckboxItem')
select('slotBefore', _CheckboxItem,  ['', ...iconList], Config)
_CheckboxItem.storyName = 'CheckboxItem';
_CheckboxItem.parameters = {
	info: {
		text: 'The basic CheckboxItem'
	}
};
