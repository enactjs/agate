import TabGroup from '@enact/agate/TabGroup';
import {useCallback, useState} from 'react';

import Section from '../components/Section';
import * as appCss from '../App/App.module.less';

const tabs = [
	{title: 'Home', icon: 'home'},
	{title: 'Settings', icon: 'setting'},
	{title: 'Theme', icon: 'display', disabled: true}
];

const TabGroupView = () => {
	const [selectedNormal, setSelectedNormal] = useState(0);
	const [selectedAriaLabelled, setSelectedAriaLabelled] = useState(0);

	const handleSelected = useCallback(({selected}) => setSelectedNormal(selected), []);
	const handleSelectedAriaLabelled = useCallback(({selected}) => setSelectedAriaLabelled(selected), []);

	return (
		<>
			<Section title="Default">
				<TabGroup alt="Normal" onSelect={handleSelected} selectedIndex={selectedNormal} tabPosition="before" tabs={tabs} />
				<TabGroup alt="Disabled" disabled onSelect={handleSelected} selectedIndex={selectedNormal} tabPosition="before" tabs={tabs} />
			</Section>

			<Section className={appCss.marginTop} title="Aria-labelled">
				<TabGroup alt="Aria-labelled" aria-label="This is a Label." onSelect={handleSelectedAriaLabelled} selectedIndex={selectedAriaLabelled} tabPosition="before" tabs={tabs} />
				<TabGroup
					alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled onSelect={handleSelectedAriaLabelled} selectedIndex={selectedAriaLabelled} tabPosition="before"
					tabs={tabs}
				/>
			</Section>
		</>
	);
};

export default TabGroupView;
