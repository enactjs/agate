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
	<ProgressBar highlighted progress={0.5} />,
	<ProgressBar highlighted progress={1} />,
	<ProgressBar backgroundProgress={0.5} />,
	<ProgressBar backgroundProgress={1} />,
	<ProgressBar backgroundProgress={0.25} progress={0.5} />,
	<ProgressBar backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar backgroundProgress={0.5} progress={0.5} />,
	<ProgressBar highlighted backgroundProgress={0.5} />,
	<ProgressBar highlighted backgroundProgress={1} />,
	<ProgressBar orientation="vertical" />,
	<ProgressBar orientation="vertical" highlighted />,
	<ProgressBar orientation="vertical" progress={0.5} />,
	<ProgressBar orientation="vertical" progress={1} />,
	<ProgressBar orientation="vertical" highlighted progress={0.5} />,
	<ProgressBar orientation="vertical" highlighted progress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={1} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={1} />,
	<ProgressBar orientation="vertical" highlighted backgroundProgress={0.5} progress={0.25} />,
	<ProgressBar orientation="vertical" progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.25} progress={0.75} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.75} progress={0.25} progressAnchor={0.5} />,
	<ProgressBar orientation="vertical" backgroundProgress={0.1} progress={0.25} progressAnchor={0.2} />,
	<ProgressBar orientation="vertical" progress={0.25} progressAnchor={0.5} tooltip />,
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
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar highlighted progress={0.5} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar backgroundProgress={0.5} progress={0.25} />
	},
	{
		locale: 'ar-SA',
		component: <ProgressBar highlighted backgroundProgress={0.5} />
	}
];

export default ProgressBarTests;
