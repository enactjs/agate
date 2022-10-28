import BodyText from '@enact/agate/BodyText';
import Header from '@enact/agate/Header';
import Heading from '@enact/agate/Heading';
import {Panel} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';
import kind from '@enact/core/kind';
import $L from '@enact/i18n/$L';
import Text from '@enact/i18n/Text';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="QA Sample - I18N" />
			<Scroller>
				<Heading showLine>Strings</Heading>
				<BodyText>String - $L: {$L('String')}</BodyText>
				<BodyText>String - Text: <Text>String</Text></BodyText>

				<Heading showLine>Components</Heading>
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
