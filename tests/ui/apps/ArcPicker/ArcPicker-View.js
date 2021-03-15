import ArcPicker from '../../../../ArcPicker';
import Heading from '../../../../Heading';
import ThemeDecorator from '../../../../ThemeDecorator';
import spotlight from '@enact/spotlight';

import Section from '../../components/Section';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Section>
			<Heading>ArcPicker default</Heading>
			<ArcPicker id="arcPickerDefault">{[1, 2, 3, 4]}</ArcPicker>
		</Section>
		<Section>
			<Heading>ArcPicker cumulative</Heading>
			<ArcPicker id="arcPickerCumulative" selectionType="cumulative">{[1, 2, 3, 4]}</ArcPicker>
		</Section>
		<Section>
			<Heading>ArcPicker disabled</Heading>
			<ArcPicker disabled id="arcPickerDisabled">{[1, 2, 3, 4]}</ArcPicker>
		</Section>
	</div>
</div>;

export default ThemeDecorator(app);
