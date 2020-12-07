import Heading from '../../../../Heading';
import Slider from '../../../../Slider';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<Heading>Slider default</Heading>
		<Slider defaultValue={0} id="sliderDefault"  />
		<Heading>Slider activate on focus</Heading>
		<Slider activateOnFocus="true" id="sliderActivateOnFocus"  />
		<Heading>Slider custom progressAnchor</Heading>
		<Slider activateOnFocus="true" id="sliderCustomProgressAnchor" progressAnchor={0.7} showAnchor />
		<Heading>Slider vertical</Heading>
		<Slider activateOnFocus="true" id="sliderVertical" orientation="vertical" />
		<Heading>Slider disabled</Heading>
		<Slider disabled id="sliderDisabled"  />

	</div>
</div>;

export default ThemeDecorator(app);
