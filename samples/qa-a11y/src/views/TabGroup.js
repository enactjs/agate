import TabGroup from '@enact/agate/TabGroup';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const tabs = [
	{title: 'Home', icon: 'home'},
	{title: 'Settings', icon: 'setting'},
	{title: 'Theme', icon: 'display'}
];

const TabGroupView = () => (
	<>
		<Section title="Default">
			<TabGroup alt="Normal" tabPosition="before" tabs={tabs} />
			<TabGroup alt="Disabled" disabled tabPosition="before" tabs={tabs} />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<TabGroup alt="Aria-labelled" aria-label="This is a Label." tabPosition="before" tabs={tabs} />
			<TabGroup alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled tabPosition="before" tabs={tabs} />
		</Section>
	</>
);

export default TabGroupView;
