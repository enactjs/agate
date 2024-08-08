import RangePicker from '../../../../RangePicker';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';

const app = (props) => <div {...props}>
	<Scroller>
		<RangePicker defaultValue={0} id="rangePickerDefault" min={0} max={10} step={5} />
		<RangePicker defaultValue={5} disabled id="rangePickerDisabled" min={0} max={10} step={5} />
		<RangePicker defaultValue={0} id="rangePickerWithNegativeValues" min={-10} max={10} />
		<RangePicker defaultValue={0} id="rangePickerWrap" min={0} max={10} wrap />
		<RangePicker defaultValue={0} id="rangePickerHorizontalDefault" min={0} max={10} orientation="horizontal" step={5} />
		<RangePicker defaultValue={5} disabled id="rangePickerHorizontalDisabled" min={0} max={10} orientation="horizontal" step={5} />
		<RangePicker defaultValue={0} id="rangePickerHorizontalWithNegativeValues" min={-10} max={10} orientation="horizontal" />
		<RangePicker defaultValue={0} id="rangePickerHorizontalWrap" min={0} max={10} orientation="horizontal" wrap />
	</Scroller>
</div>;

export default ThemeDecorator(app);
