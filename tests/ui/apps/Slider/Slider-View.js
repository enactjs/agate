import {scaleToRem} from '@enact/ui/resolution';
import React from 'react';

import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import Slider, {SliderTooltip} from '../../../../Slider';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(900)}}>
			<Heading>Slider default</Heading>
			<Slider defaultValue={0} id="sliderDefault"  />
			<Heading>Slider activate on focus</Heading>
			<Slider activateOnFocus id="sliderActivateOnFocus"  />
			<Heading>Slider custom progressAnchor</Heading>
			<Slider activateOnFocus id="sliderCustomProgressAnchor" progressAnchor={0.7} />
			<Heading>Slider with tooltip</Heading>
			<Slider id="sliderWithTooltip">
				<SliderTooltip />
			</Slider>
			<Heading>Slider vertical</Heading>
			<Slider id="sliderVertical" max={10} orientation="vertical" />
			<Heading>Slider disabled</Heading>
			<Slider disabled id="sliderDisabled"  />
			<Heading>Slider vertical disabled</Heading>
			<Slider disabled id="sliderVerticalDisabled" max={10} orientation="vertical" />
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
