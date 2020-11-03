import Spinner from '../../../../Spinner';
import React from 'react';
import ri from '@enact/ui/resolution';

const SpinnerTests = [
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
			<Spinner />
		</div>
	</div>,
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
			<Spinner centered />
		</div>
	</div>,
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
			<Spinner size="huge" />
		</div>
	</div>,
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
			<Spinner type="loading" />
		</div>
	</div>
];

export default SpinnerTests;
