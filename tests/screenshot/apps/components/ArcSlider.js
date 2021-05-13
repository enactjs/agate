import ArcSlider from '../../../../ArcSlider';

const ArcSliderTests = [
	<ArcSlider />,
	<ArcSlider endAngle={300} startAngle={10} />,
	<ArcSlider endAngle={250} startAngle={30} value={50} />,
	<ArcSlider disabled endAngle={250} startAngle={30} value={60} />,
	{
		component: <ArcSlider endAngle={250} startAngle={30} value={70} />,
		focus: true
	},
	{
		component: <ArcSlider disabled endAngle={250} startAngle={30} value={80} />,
		focus: true
	}
];

export default ArcSliderTests;
