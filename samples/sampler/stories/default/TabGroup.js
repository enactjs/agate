import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select} from '@enact/storybook-utils/addons/knobs';
import Button from '@enact/agate/Button';
import TabGroup from '@enact/agate/TabGroup';

TabGroup.displayName = 'TabGroup';
const Config = mergeComponentMetadata('TabGroup', TabGroup);

export default {
	title: 'Agate/TabGroup',
	component: 'TabGroup'
};

export const _TabGroup = () => {
	const orientation = select('orientation', ['vertical', 'horizontal'], Config, 'horizontal');
	return (
		<TabGroup
			orientation={orientation}
			tabPosition={select('tabPosition', ['before', 'after'], Config, 'before')}
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

_TabGroup.storyName = 'TabGroup';
_TabGroup.parameters = {
	info: {
		text: 'The basic TabGroup'
	}
};
