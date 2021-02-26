import ProgressBar from '../../../../ProgressBar';

const ProgressBarTests = [
	<ProgressBar />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar progress={0.75} />,
	<ProgressBar progress={0.75} size="small" />,
	<ProgressBar progress={0.75} disabled />,
	<ProgressBar progress={0.75} progressAnchor={0.5} />
];

export default ProgressBarTests;
