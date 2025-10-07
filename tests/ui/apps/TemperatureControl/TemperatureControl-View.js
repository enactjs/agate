import Heading from '../../../../Heading';
import TemperatureControl from '../../../../TemperatureControl';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off, so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div style={{display: 'flex', flexWrap: 'wrap'}}>
		<div style={{width: '50%'}}>
			<Heading size="tiny">TemperatureControl default</Heading>
			<TemperatureControl id="temperatureControlDefault" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">TemperatureControl custom min, max, endAngle, startAngle</Heading>
			<TemperatureControl min={0} max={2} defaultValue={0} id="temperatureControlCustom" />
		</div>
		<div style={{width: '50%'}}>
			<Heading size="tiny">TemperatureControl disabled</Heading>
			<TemperatureControl disabled id="temperatureControlDisabled" />
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
