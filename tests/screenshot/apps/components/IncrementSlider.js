import IncrementSlider from '../../../../IncrementSlider';

const IncrementSliderTests = [
	<IncrementSlider />,
	<IncrementSlider defaultValue={50} />,
	<IncrementSlider value={50} />,
	<IncrementSlider value={50} noFill />,
	<IncrementSlider value={100} />,
	<IncrementSlider disabled />,
	<IncrementSlider defaultValue={50} disabled />,
	<IncrementSlider defaultValue={100} disabled />,
	<IncrementSlider min={-50} />,
	<IncrementSlider max={50} />,
	<IncrementSlider max={50} value={50} />,
	<IncrementSlider incrementIcon="plus" decrementIcon="minus" />,
	<IncrementSlider progressAnchor={0.7} value={60} />,
	<IncrementSlider progressAnchor={0.6} value={60} />,
	<IncrementSlider progressAnchor={0.4} value={60} />,
	<IncrementSlider orientation="vertical" />,
	<IncrementSlider orientation="vertical" value={60} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <IncrementSlider />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider defaultValue={50} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider value={50} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider value={50} noFill />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider value={100} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider disabled />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider defaultValue={50} disabled />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider min={-50} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider max={50} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider max={50} value={50} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider incrementIcon="plus" decrementIcon="minus" />
	},
	{
		locale: 'ar-SA',
		component: 	<IncrementSlider progressAnchor={0.7} value={60} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider progressAnchor={0.6} value={60} />
	},
	{
		locale: 'ar-SA',
		component: <IncrementSlider progressAnchor={0.4} value={60} />
	}
];

export default IncrementSliderTests;
