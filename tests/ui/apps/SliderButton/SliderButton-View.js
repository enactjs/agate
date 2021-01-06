import SliderButton from '../../../../SliderButton';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';
import React from 'react';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const threeItems = ['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed'];
const fiveItems = ['Light Speed', 'Ridiculous Speed', 'Ludicrous Speed', 'Bananas Speed', 'OK Enough Speed'];

const app = (props) => <div {...props}>
	<div>
		<SliderButton
			id="sliderButton1"
		>
			{threeItems}
		</SliderButton>
		<SliderButton
			id="sliderButton2"
		>
			{fiveItems}
		</SliderButton>
		<SliderButton
			id="sliderButton3"
			disabled
		>
			{threeItems}
		</SliderButton>
	</div>
</div>;

export default ThemeDecorator(app);
