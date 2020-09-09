import ColorPicker from '@enact/agate/ColorPicker';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const colors = ['green', 'yellow', 'orange', 'red', 'black', 'gray', 'white', '#cc5500', 'maroon', 'brown'];

const ColorPickerView = () => (
	<>
		<Section title="Default">
			<ColorPicker alt="Normal" defaultValue={colors[0]}>
				{colors}
			</ColorPicker>
			<ColorPicker alt="Disabled" defaultValue={colors[0]} disabled>
				{colors}
			</ColorPicker>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<ColorPicker alt="Aria-labelled" aria-label="This is a Label 0." defaultValue={colors[0]}>
				{colors}
			</ColorPicker>
			<ColorPicker alt="Aria-labelled and Disabled" aria-label="This is a Label 1." defaultValue={colors[0]} disabled>
				{colors}
			</ColorPicker>
		</Section>
	</>
);

export default ColorPickerView;
