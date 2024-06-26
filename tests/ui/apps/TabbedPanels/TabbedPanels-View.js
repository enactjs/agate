import {useState} from 'react';
import spotlight from '@enact/spotlight';

import Button from '../../../../Button';
import Item from '../../../../Item';
import {Panel, TabbedPanels} from '../../../../Panels';
import ThemeDecorator from '../../../../ThemeDecorator';
import $L from "../../../../../enact/packages/i18n/$L";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const App = (props) => {
	const [panelIndex, setPanelIndex] = useState(0);
	const onSelect = (e) => setPanelIndex(e.index);
	const onBeforeTabs = () => {
		setPanelIndex(Math.max(panelIndex - 1, 0));
	};
	const onAfterTabs = () => {
		setPanelIndex(Math.min(panelIndex + 1, 2));
	};

	return (
		<div {...props}>
			<TabbedPanels
				id="tabbedPanels"
				index={panelIndex}
				noCloseButton
				onSelect={onSelect} // eslint-disable-line react/jsx-no-bind
				orientation="vertical"
				tabs={[
					{title: 'Button', icon: 'netbook'},
					{title: 'Item', icon: 'aircirculation'},
					{title: 'LabeledIconButton', icon: 'temperature'}
				]}
			>
				<beforeTabs>
					<Button
						aria-label={$L('Previous Tab')}
						className="previousButton"
						icon="arrowlargeleft"
						onClick={onBeforeTabs} // eslint-disable-line react/jsx-no-bind
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						aria-label={$L('Next Tab')}
						className="nextButton"
						icon="arrowlargeright"
						onClick={onAfterTabs} // eslint-disable-line react/jsx-no-bind
						size="small"
						type="grid"
					/>
				</afterTabs>
				<Panel>
					<Item>First tab view</Item>
				</Panel>
				<Panel>
					<Item>Second tab view</Item>
				</Panel>
				<Panel>
					<Item>Third tab view</Item>
				</Panel>
			</TabbedPanels>
		</div>
	)
}

export default ThemeDecorator(App);
