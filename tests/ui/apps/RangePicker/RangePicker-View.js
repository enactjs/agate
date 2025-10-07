import RangePicker from '../../../../RangePicker';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<div style={{display: 'flex', flexWrap: 'wrap'}}>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerDefault" min={0} max={10} step={5} />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={5} disabled id="rangePickerDisabled" min={0} max={10} step={5} />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerWithNegativeValues" min={-10} max={10} />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerWrap" min={0} max={10} wrap />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerHorizontalDefault" min={0} max={10} orientation="horizontal" step={5} />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={5} disabled id="rangePickerHorizontalDisabled" min={0} max={10} orientation="horizontal" step={5} />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerHorizontalWithNegativeValues" min={-10} max={10} orientation="horizontal" />
		</div>
		<div style={{width: '50%'}}>
			<RangePicker defaultValue={0} id="rangePickerHorizontalWrap" min={0} max={10} orientation="horizontal" wrap />
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
