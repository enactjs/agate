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
			<Heading alt="Aria-labelled" aria-label="This is a Label." size="large" showLine>Text 2</Heading>
			<Heading alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled size="large" showLine>Text 3</Heading>
		</Section>
	</>
);

export default HeadingView;
