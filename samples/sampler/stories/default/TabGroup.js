import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {select} from '@enact/storybook-utils/addons/controls';
import Button from '@enact/agate/Button';
import TabGroup from '@enact/agate/TabGroup';

TabGroup.displayName = 'TabGroup';
const Config = mergeComponentMetadata('TabGroup', TabGroup);

export default {
	title: 'Agate/TabGroup',
	component: 'TabGroup'
};

export const _TabGroup = (args) => {
	const orientation = args['orientation'];

	return (
		<TabGroup
			onSelect={action('onSelect')}
			orientation={orientation}
			tabPosition={args['tabPosition']}
			tabs={[
				{title: 'Home', icon: 'home'},
				{title: 'Settings', icon: 'setting'},
				{title: 'Theme', icon: 'display'}
			]}
		>
			<beforeTabs>
				<Button
					icon={orientation  === 'vertical' ? 'arrowlargeup' : 'arrowlargeleft'}
					size="small"
					type="grid"
				/>
			</beforeTabs>
			<afterTabs>
				<Button
					icon={orientation  === 'vertical' ? 'arrowlargedown' : 'arrowlargeright'}
					size="small"
					type="grid"
				/>
			</afterTabs>
		</TabGroup>
	);
};

select('orientation', _TabGroup, ['vertical', 'horizontal'], Config, 'horizontal');
select('tabPosition', _TabGroup, ['before', 'after'], Config, 'before');

_TabGroup.storyName = 'TabGroup';
_TabGroup.parameters = {
	info: {
		text: 'The basic TabGroup'
	}
};
