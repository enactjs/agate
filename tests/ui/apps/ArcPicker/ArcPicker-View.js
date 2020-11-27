import ArcPicker from '../../../../ArcPicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<ArcPicker id="arcPickerDefault">{[1, 2, 3, 4]}</ArcPicker>
		<ArcPicker id="arcPickerCumulative" selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>
		<ArcPicker disabled id="arcPickerDisabled">{[1, 2, 3, 4]}</ArcPicker>
	</div>
</div>;

export default ThemeDecorator(app);
