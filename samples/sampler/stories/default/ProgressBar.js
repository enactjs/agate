import ProgressBar, {ProgressBarBase} from '@enact/agate/ProgressBar';
import UiProgressBar from '@enact/ui/ProgressBar';
import React from 'react';
import {storiesOf} from '@storybook/react';

import {boolean, number, select} from '../../src/enact-knobs';
import {mergeComponentMetadata} from '../../src/utils';

ProgressBar.displayName = 'ProgressBar';
const Config = mergeComponentMetadata('ProgressBar', UiProgressBar, ProgressBarBase, ProgressBar);

storiesOf('Agate', module)
	.add(
		'ProgressBar',
		() => (
			<ProgressBar
				disabled={boolean('disabled', Config)}
				orientation={select('orientation', ['horizontal', 'vertical'], Config)}
				progress={number('progress', Config, {range: true, min: 0, max: 1, step: 0.01}, 0.4)}
				size={select('size', ['small', 'large'], Config)}
			/>
		),
		{
			text: 'The basic ProgressBar'
		}
	);
