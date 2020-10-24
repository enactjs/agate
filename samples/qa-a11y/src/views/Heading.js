import Heading from '@enact/agate/Heading';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const HeadingView = () => (
	<>
		<Section title="Default">
			<Heading alt="Normal" size="large" showLine>Text 0</Heading>
			<Heading alt="Disabled" disabled size="large" showLine>Text 1</Heading>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<Heading alt="Aria-labelled" aria-label="This is a Label 0." size="large" showLine>Text 0</Heading>
			<Heading alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled size="large" showLine>Text 1</Heading>
		</Section>
	</>
);

export default HeadingView;
