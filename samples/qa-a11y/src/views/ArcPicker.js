/* eslint-disable react/jsx-no-bind */

import ArcPicker from '@enact/agate/ArcPicker';
import Button from '@enact/agate/Button';
import React from 'react';

import AriaValuetextDecorator from '../components/AriaValuetextDecorator';
import Section from '../components/Section';

const AriaValueTextArcPicker = AriaValuetextDecorator(ArcPicker);

const ArcPickerView = () => (
	<>
		<Section title="Default" vertical>
			<ArcPicker alt="Normal">{[1, 2, 3, 4, 5]}</ArcPicker>
			<ArcPicker alt="With slotCenter" slotCenter="SlotCenter">{[1, 2, 3, 4, 5]}</ArcPicker>
			<ArcPicker alt="Disabled" disabled>{[1, 2, 3, 4, 5]}</ArcPicker>
			<ArcPicker alt="Disabled with slotCenter" disabled slotCenter="SlotCenter">{[1, 2, 3, 4, 5]}</ArcPicker>
			<Button aria-label="5 way Down to move to the next line" icon="arrowdown" />
		</Section>

		<Section title="Aria-ValueText" vertical>
			<AriaValueTextArcPicker alt="Aria-valuetext" aria-valuetext="This is a Label.">{[1, 2, 3, 4, 5]}</AriaValueTextArcPicker>
			<AriaValueTextArcPicker alt="Aria-valuetext with slotCenter" aria-valuetext="This is a Label." slotCenter="SlotCenter">{[1, 2, 3, 4, 5]}</AriaValueTextArcPicker>
			<AriaValueTextArcPicker alt="Aria-valuetext and Disabled" aria-valuetext="This is a Label." disabled>{[1, 2, 3, 4, 5]}</AriaValueTextArcPicker>
			<AriaValueTextArcPicker alt="Aria-valuetext and Disabled with slotCenter" aria-valuetext="This is a Label." disabled slotCenter="SlotCenter">{[1, 2, 3, 4, 5]}</AriaValueTextArcPicker>
			<Button aria-label="5 way Up to move to the previous line" icon="arrowup" />
		</Section>
	</>
);

export default ArcPickerView;
