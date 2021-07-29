import Heading from '../../../../Heading';

const HeadingTests = [
	<Heading />,
	<Heading size="title">This is a new Heading</Heading>,
	<Heading showLine spacing="small">This Heading has a line underneath</Heading>,
	<Heading disabled showBackButton>This Heading also shows a back button</Heading>,

	// Heading with different sizes
	<Heading size="subtitle">This is a Heading with subtitle size</Heading>,
	<Heading size="tiny">This is a Heading with tiny size</Heading>,
	<Heading size="small">This is a Heading with small size</Heading>,
	<Heading size="medium">This is a Heading with medium size</Heading>,
	<Heading size="large">This is a Heading with large size</Heading>,

	// Heading with size="title" and showline
	<Heading size="title" showline spacing="none">This is a Heading with title size and a line underneath</Heading>,
	<Heading size="title" showline spacing="small">This is a Heading with title size and a line underneath</Heading>,
	<Heading size="title" showline spacing="medium">This is a Heading with title size and a line underneath</Heading>,
	<Heading size="title" showline spacing="large">This is a Heading with title size and a line underneath</Heading>,

	// Heading with size="title" with different colors
	<Heading size="title" color="#E6444B">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#FDC902">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#986AAD">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#4E75E1">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#30CC83">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#44C8D5">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#47439B">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#2D32A6">This is a Heading with title size with different colors</Heading>,
	<Heading size="title" color="#4E75E1">This is a Heading with title size with different colors</Heading>
];

export default HeadingTests;
