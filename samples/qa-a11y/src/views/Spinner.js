import Spinner from '@enact/agate/Spinner';
import React from 'react';

import Section from '../components/Section';

const SpinnerView = () => (
	<Section title="Default">
		<Spinner alt="Normal" color="dark" />
		<Spinner alt="Disabled" color="dark" />
	</Section>
);

export default SpinnerView;
