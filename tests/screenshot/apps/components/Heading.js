import Heading from '../../../../Heading';
import React from 'react';

const HeadingTests = [
	<Heading />,
	<Heading size="title">This is a new Heading</Heading>,
	<Heading showLine spacing="small">This Heading has a line underneath</Heading>,
	<Heading disabled showBackButton>This Heading also shows a back button</Heading>
];

export default HeadingTests;
