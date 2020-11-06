import LabeledIconButton from '@enact/agate/LabeledIconButton';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const LabeledIconButtonView = () => (
	<>
		<Section title="Default">
			<LabeledIconButton alt="Normal" icon="star">Text 0</LabeledIconButton>
			<LabeledIconButton alt="Disabled" disabled icon="star">Text 1</LabeledIconButton>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<LabeledIconButton alt="Aria-labelled" aria-label="This is a Label." icon="star">Text 2</LabeledIconButton>
			<LabeledIconButton alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled icon="star">Text 3</LabeledIconButton>
		</Section>
	</>
);

export default LabeledIconButtonView;
