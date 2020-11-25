import RangePicker from '../../../../RangePicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<RangePicker defaultValue={0} id="rangePickerDefault" min={0} max={10} step={5} />
		<RangePicker defaultValue={5} disabled id="rangePickerDisabled" min={0} max={10} step={5} />
		<RangePicker defaultValue={0} id="rangePickerWithNegativeValues" min={-10} max={10} />
	</div>
</div>;

export default ThemeDecorator(app);
