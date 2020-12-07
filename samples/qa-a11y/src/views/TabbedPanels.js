/* eslint-disable react/jsx-no-bind */

import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import {Panel, TabbedPanels} from '@enact/agate/Panels';
import React from 'react';

import appCss from '../App/App.module.less';

const tabTitles = [
	{title: 'A'},
	{title: 'B'},
	{title: 'C'},
	{title: 'D'}
];

const TabbedPanelsView = () => {
	const [noAnimation, setNoAnimation] = React.useState(false);
	const [noCloseButton, setNoCloseButton] = React.useState(false);
	const [vertical, setVertical] = React.useState(false);

	const handleNoAnimation = () => setNoAnimation(!noAnimation);
	const handleNoCloseButton = () => setNoCloseButton(!noCloseButton);
	const handleVertical = () => setVertical(!vertical);

	return (
		<TabbedPanels
			className={appCss.tabbedPanels}
			noAnimation={noAnimation}
			noCloseButton={noCloseButton}
			orientation={vertical ? 'vertical' : 'horizontal'}
			tabs={tabTitles}
		>
			<Panel key={0}>
				<CheckboxItem
					onToggle={handleNoAnimation}
					selected={noAnimation}
					style={{width: '350px'}}
				>
					noAnimation
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleNoCloseButton}
					selected={noCloseButton}
					style={{width: '350px'}}
				>
					noCloseButton
				</CheckboxItem>
				<CheckboxItem
					onToggle={handleVertical}
					selected={vertical}
					style={{width: '350px'}}
				>
					vertical
				</CheckboxItem>
				<Button>Text 0</Button>
			</Panel>
			<Panel key="1">
				Hello
				<Button>Text 1</Button>
			</Panel>
			<Panel key="2">
				Hello
				<Button>Text 2</Button>
			</Panel>
			<Panel key="3">
				Hello
				<Button>Text 3</Button>
			</Panel>
		</TabbedPanels>
	);
};

export default TabbedPanelsView;
