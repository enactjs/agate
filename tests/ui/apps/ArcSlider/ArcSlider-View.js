import ArcSlider from '../../../../ArcSlider';
import Heading from '../../../../Heading';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{display: 'flex', flexWrap: 'wrap'}}>
		<div style={{width: '50%'}}>
			<Heading size="tiny">ArcSlider default</Heading>
			<ArcSlider id="arcSliderDefault" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">ArcSlider custom min, max, endAngle, startAngle</Heading>
			<ArcSlider endAngle={350} foregroundColor="#fdc902" min={0} max={2} startAngle={10} id="arcSliderCustom" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">ArcSlider disabled</Heading>
			<ArcSlider disabled id="arcSliderDisabled" />
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
