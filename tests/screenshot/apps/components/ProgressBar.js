import ProgressBar from '../../../../ProgressBar';

const ProgressBarTests = [
	<ProgressBar />,
	<ProgressBar disabled />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar progress={0} />,
	<ProgressBar progress={0.25} />,
	<ProgressBar progress={0.5} />,
	<ProgressBar progress={0.75} />,
	<ProgressBar progress={1} />,
	<ProgressBar progress={0.75} size="small" />,
	<ProgressBar progress={0.75} disabled />,
	<ProgressBar progress={0.25} progressAnchor={0.5} />,
	<ProgressBar progress={0.5} progressAnchor={0.5} />,
	<ProgressBar progress={0.75} progressAnchor={0.5} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <ProgressBar />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.25} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.5} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.75} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={1} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.25} progressAnchor={0.5} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.5} progressAnchor={0.5} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar progress={0.75} progressAnchor={0.5} />
	}
];

export default ProgressBarTests;
