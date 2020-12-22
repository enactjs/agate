import ArcPicker from '../../../../ArcPicker';
import Heading from '../../../../Heading';
import Scroller from '../../../../Scroller';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import {scaleToRem} from '@enact/ui/resolution';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Scroller style={{height: scaleToRem(900)}}>
			<Heading>ArcPicker default</Heading>
			<ArcPicker id="arcPickerDefault">{[1, 2, 3, 4]}</ArcPicker>
			<Heading>ArcPicker cumulative</Heading>
			<ArcPicker id="arcPickerCumulative" selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>
			<Heading>ArcPicker disabled</Heading>
			<ArcPicker disabled id="arcPickerDisabled">{[1, 2, 3, 4]}</ArcPicker>
		</Scroller>
	</div>
</div>;

export default ThemeDecorator(app);
