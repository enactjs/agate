import Heading from '../../../../Heading';
import ProgressBar, {ProgressBarTooltip} from '../../../../ProgressBar';
import React from 'react';

const ProgressBarTests = [
	<ProgressBar />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar orientation="radial" />,
	<ProgressBar progress={0.75} size="small" />,
];

export default ProgressBarTests;
