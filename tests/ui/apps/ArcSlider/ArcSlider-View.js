import ArcSlider from '../../../../ArcSlider';
import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import {scaleToRem} from "@enact/ui/resolution";

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(900)}}>
			<Heading>ArcSlider default</Heading>
			<ArcSlider id="arcSliderDefault" />
			<Heading>ArcSlider custom min, max, endAngle, startAngle</Heading>
			<ArcSlider endAngle={350} foregroundColor="#fdc902" min={0} max={2} startAngle={10} id="arcSliderCustom" />
			<Heading>ArcSlider disabled</Heading>
			<ArcSlider disabled id="arcSliderDisabled" />
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
