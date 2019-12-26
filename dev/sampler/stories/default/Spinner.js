import Spinner, {SpinnerBase} from '@enact/agate/Spinner';
import UiSpinner, {SpinnerBase as UiSpinnerBase} from '@enact/ui/Spinner';
import ri from '@enact/ui/resolution';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {boolean, select} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

Spinner.displayName = 'Spinner';
const Config = mergeComponentMetadata('Spinner', UiSpinnerBase, UiSpinner, SpinnerBase, Spinner);

storiesOf('Agate', module)
	.add(
		'Spinner',
		() => (
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
						position: 'absolute',
						height: '100%',
						width: '100%',
						top: 0,
						left: 0
					}}
				/>
				<div
					style={{
						outline: 'teal dashed 1px',
						position: 'relative',
						height: ri.unit(180, 'rem')
					}}
				>
					<label
						style={{
							outline: 'teal dashed 1px',
							backgroundColor: 'rgba(0, 128, 128, 0.5)',
							color: '#0bb',
							position: 'absolute',
							transform: 'translateY(-100%)',
							borderBottomWidth: 0,
							padding: '0.1em 1em',
							fontWeight: 100,
							fontStyle: 'italic',
							fontSize: ri.unit(15, 'rem')
						}}
					>Container</label>
					<div
						style={{
							position: 'absolute',
							height: '100%',
							width: '100%'
						}}
					/>
					<Spinner
						blockClickOn={select('blockClickOn', [null, 'container', 'screen'], Config)}
						centered={boolean('centered', Config)}
						color={select('color', ['dark', 'light'], Config, 'light')}
						scrim={boolean('scrim', Config)}
						size={select('size', ['huge', 'large', 'small', 'smallest'], Config)}
						type={select('type', ['loading', 'searching'], Config, 'searching')}
						transparent={boolean('transparent', Config)}
					/>
				</div>
			</div>
		),
		{
			text: 'Basic usage of Spinner'
		}
	);
