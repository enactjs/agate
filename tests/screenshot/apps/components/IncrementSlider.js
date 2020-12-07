import IncrementSlider from '../../../../IncrementSlider';
import React from 'react';

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
	<IncrementSlider incrementIcon="plus" decrementIcon="minus" />
];

export default IncrementSliderTests;
