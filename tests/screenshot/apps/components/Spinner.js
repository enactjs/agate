import ri from '@enact/ui/resolution';
import Spinner from '../../../../Spinner';

const Wrapper = ({children}) => (
	<div
		style={{
			outline: 'teal dashed 1px',
			position: 'relative',
			padding: ri.unit(90, 'rem'),
			backgroundColor: 'rgba(0, 187, 187, 0.5)'
		}}
	>
		<div
			style={{
				outline: 'teal dashed 1px',
				position: 'relative',
				height: ri.unit(180, 'rem')
			}}
		>
			{children}
		</div>
	</div>
);

const SpinnerTests = [
	<Wrapper>
		<Spinner />
	</Wrapper>,
	<Wrapper>
		<Spinner centered />
	</Wrapper>,
	<Wrapper>
		<Spinner size="huge" />
	</Wrapper>,
	<Wrapper>
		<Spinner>Loading content</Spinner>
	</Wrapper>,
	<Wrapper>
		<Spinner type="loading" />
	</Wrapper>,
	<Wrapper>
		<Spinner type="loading">Loading content</Spinner>
	</Wrapper>
];

export default SpinnerTests;
