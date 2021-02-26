import Heading from '../../../../Heading';
import IncrementSlider, {IncrementSliderTooltip} from '../../../../IncrementSlider';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div>
		<Heading>IncrementSlider default</Heading>
		<IncrementSlider className="incrementSliderDefault" />
		<Heading>IncrementSlider custom progressAnchor</Heading>
		<IncrementSlider className="incrementSliderCustomProgressAnchor" progressAnchor={0.7} />
		<Heading>IncrementSlider with tooltip</Heading>
		<IncrementSlider className="incrementSliderWithTooltip">
			<IncrementSliderTooltip />
		</IncrementSlider>
		<Heading>IncrementSlider vertical</Heading>
		<IncrementSlider className="incrementSliderVertical" max={10} orientation="vertical" />
		<Heading>IncrementSlider disabled</Heading>
		<IncrementSlider disabled className="incrementSliderDisabled" />
		<Heading>IncrementSlider vertical disabled</Heading>
		<IncrementSlider disabled className="incrementSliderVerticalDisabled" max={10} orientation="vertical" />
	</div>
</div>;

export default ThemeDecorator(app);
