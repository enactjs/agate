import Slider from '../../../../Slider';

const SliderTests = [
	<Slider />,
	<Slider disabled />,
	<Slider active />,
	<Slider min={0} max={20} progressAnchor={0.4} />,
	<Slider value={60} />,
	<Slider progressAnchor={0.7} value={60} />,
	<Slider progressAnchor={0.6} value={60} />,
	<Slider progressAnchor={0.4} value={60} />,
	<Slider orientation="vertical" />,
	<Slider orientation="vertical" value={60} />,
	<Slider progressAnchor={0.7} orientation="vertical" value={60} />,
	<Slider progressAnchor={0.4} orientation="vertical" value={60} />,
	// RTL
	{
		locale: 'ar-SA',
		component: <Slider />
	},
	{
		locale: 'ar-SA',
		component: <Slider disabled />
	},
	{
		locale: 'ar-SA',
		component: <Slider active />
	},
	{
		locale: 'ar-SA',
		component: <Slider min={0} max={20} progressAnchor={0.4} />
	},
	{
		locale: 'ar-SA',
		component: <Slider value={60} />
	},
	{
		locale: 'ar-SA',
		component: <Slider progressAnchor={0.7} value={60} />
	},
	{
		locale: 'ar-SA',
		component: <Slider progressAnchor={0.6} value={60} />
	},
	{
		locale: 'ar-SA',
		component: <Slider progressAnchor={0.4} value={60} />
	}
];

export default SliderTests;
