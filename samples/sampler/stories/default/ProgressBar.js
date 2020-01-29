import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, number} from '@enact/storybook-utils/addons/knobs';
import UiProgressBar from '@enact/ui/ProgressBar';
import React from 'react';
import {storiesOf} from '@storybook/react';

import ProgressBar, {ProgressBarBase} from '@enact/agate/ProgressBar';

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
