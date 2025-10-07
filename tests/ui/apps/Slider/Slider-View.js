import {scaleToRem} from '@enact/ui/resolution';

import Heading from '../../../../Heading';
import Slider, {SliderTooltip} from '../../../../Slider';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div style={{display: 'flex', flexWrap: 'wrap'}}>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider default</Heading>
			<Slider defaultValue={0} id="sliderDefault"  />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider activate on focus</Heading>
			<Slider activateOnFocus id="sliderActivateOnFocus"  />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider custom progressAnchor</Heading>
			<Slider activateOnFocus id="sliderCustomProgressAnchor" progressAnchor={0.7} />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider disabled</Heading>
			<Slider disabled id="sliderDisabled" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider with tooltip</Heading>
			<Slider id="sliderWithTooltip">
				<SliderTooltip />
			</Slider>
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider vertical</Heading>
			<Slider id="sliderVertical" max={10} orientation="vertical" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">Slider vertical disabled</Heading>
			<Slider disabled id="sliderVerticalDisabled" max={10} orientation="vertical" />
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
