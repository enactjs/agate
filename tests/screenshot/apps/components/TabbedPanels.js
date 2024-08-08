import Button from '../../../../Button';
import {Panel, TabbedPanels} from '../../../../Panels';

const tabs = [
	{title: 'Button', icon: 'netbook'},
	{title: 'Item', icon: 'aircirculation'},
	{title: 'LabeledIconButton', icon: 'temperature'}
];

const CustomTabbedPanels = (orientation, tabPosition, beforeTabsIcon, afterTabsIcon) => (
	<TabbedPanels
		index={0}
		orientation={orientation}
		tabPosition={tabPosition}
		tabs={tabs}
	>
		<beforeTabs>
			<Button
				icon={beforeTabsIcon}
				size="small"
				type="grid"
			/>
		</beforeTabs>
		<afterTabs>
			<Button
				icon={afterTabsIcon}
				size="small"
				type="grid"
			/>
		</afterTabs>
		<Panel>
			<div>First tab view</div>
		</Panel>
		<Panel>
			<div>Second tab view</div>
		</Panel>
		<Panel>
			<div>Third tab view</div>
		</Panel>
	</TabbedPanels>
);

const TabbedPanelsTests = [
	{
		title: 'Vertical with before tabPosition',
		component: CustomTabbedPanels('vertical', 'before', 'arrowlargeleft', 'arrowlargeright'),
		wrapper: {full: true}
	},
	{
		title: 'Horizontal with before tabPosition',
		component: CustomTabbedPanels('horizontal', 'before', 'arrowlargeup', 'arrowlargedown'),
		wrapper: {full: true}
	},
	{
		title: 'Vertical with after tabPosition',
		component: CustomTabbedPanels('vertical', 'after', 'arrowlargeleft', 'arrowlargeright'),
		wrapper: {full: true}
	},
	{
		title: 'Horizontal with after tabPosition',
		component: CustomTabbedPanels('horizontal', 'after', 'arrowlargeup', 'arrowlargedown'),
		wrapper: {full: true}
	}
];

export default TabbedPanelsTests;
