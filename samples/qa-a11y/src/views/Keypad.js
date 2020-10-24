import Keypad from '@enact/agate/Keypad';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const KeypadView = () => (
	<>
		<Section title="Default">
			<Keypad alt="Normal" />
			<Keypad alt="Disabled" disabled />
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Keypad alt="Aria-labelled" aria-label="This is a Label 0." />
			<Keypad alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled />
		</Section>
	</>
);

export default KeypadView;
