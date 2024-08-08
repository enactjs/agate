import SliderButton from '../../../../SliderButton';

const SliderButtonTests = [
	<SliderButton>{['First', 'Second', 'Third']}</SliderButton>,
	<SliderButton disabled>{['First', 'Second', 'Third']}</SliderButton>,
	<SliderButton>{['First', 'Second', 'Third', 'Bananas Speed', 'OK Enough Speed']}</SliderButton>,
	<SliderButton disabled>{['First', 'Second', 'Third', 'Bananas Speed', 'OK Enough Speed']}</SliderButton>
];

export default SliderButtonTests;
