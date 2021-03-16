import RangePicker from '../../../../RangePicker';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div style={{display:'inline-block', width: '30%'}}>
		<RangePicker defaultValue={0} id="rangePickerDefault" min={0} max={10} step={5} />
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<RangePicker defaultValue={5} disabled id="rangePickerDisabled" min={0} max={10} step={5} />
	</div>
	<div style={{display:'inline-block', width: '30%'}}>
		<RangePicker defaultValue={0} id="rangePickerWithNegativeValues" min={-10} max={10} />
	</div>
</div>;

export default ThemeDecorator(app);
