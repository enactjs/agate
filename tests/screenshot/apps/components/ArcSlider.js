import ArcSlider from '../../../../ArcSlider';

const ArcSliderTests = [
	<ArcSlider />,
	<ArcSlider endAngle={300} startAngle={10} />,
	<ArcSlider disabled endAngle={250} startAngle={30} value={100} />,
	<ArcSlider endAngle={250} isFocused startAngle={30} value={100} />,
	<ArcSlider disabled endAngle={250} isFocused startAngle={30} value={100} />
];

export default ArcSliderTests;
