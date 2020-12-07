import ProgressBar from '../../../../ProgressBar';
import React from 'react';

const ProgressBarTests = [
	<ProgressBar />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar progress={0.75} size="small" />
];

export default ProgressBarTests;
