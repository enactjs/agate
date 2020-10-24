import ArcPicker from '@enact/agate/ArcPicker';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const ArcPickerView = () => (
	<>
		<Section title="Default">
			<ArcPicker alt="Normal">{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="With slotCenter" slotCenter="SlotCenter">{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="Disabled" disabled>{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="Disabled with slotCenter" disabled slotCenter="SlotCenter">{[1,2,3,4,5]}</ArcPicker>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ArcPicker alt="Aria-labelled" aria-label="This is a Label 4.">{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="Aria-labelled with slotCenter" aria-label="This is a Label 5." slotCenter="SlotCenter">{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="Aria-labelled and Disabled" aria-label="This is a Label 6." disabled>{[1,2,3,4,5]}</ArcPicker>
			<ArcPicker alt="Aria-labelled and Disabled with slotCenter" aria-label="This is a Label 7." disabled slotCenter="SlotCenter">{[1,2,3,4,5]}</ArcPicker>
		</Section>
	</>
);

export default ArcPickerView;
