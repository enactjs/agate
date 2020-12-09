import Heading from '../../../../Heading';
import IncrementSlider from '../../../../IncrementSlider';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<Heading>IncrementSlider default</Heading>
		<IncrementSlider defaultValue={0} className="incrementSliderDefault" />
		<Heading>IncrementSlider activate on focus</Heading>
		<IncrementSlider activateOnFocus className="incrementSliderActivateOnFocus" />
		<Heading>IncrementSlider custom progressAnchor</Heading>
		<IncrementSlider activateOnFocus className="incrementSliderCustomProgressAnchor" progressAnchor={0.7} />
		<Heading>IncrementSlider vertical</Heading>
		<IncrementSlider className="incrementSliderVertical" max={10} orientation="vertical" />
		<Heading>IncrementSlider disabled</Heading>
		<IncrementSlider disabled className="incrementSliderDisabled" />
		<Heading>IncrementSlider vertical disabled</Heading>
		<IncrementSlider disabled className="incrementSliderVerticalDisabled" max={10} orientation="vertical" />
	</div>
</div>;

export default ThemeDecorator(app);
