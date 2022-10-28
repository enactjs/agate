import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import {Header} from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';

import FontList from '../components/FontList';

const
	agateIcons = '\u{2B} \u{21A9} \u{22EF} \u{1F327} \u{2600}',
	lgIcons = 'ꔘ ꔧ ꕒ ꕭ ꖀ';

const fonts = {
	standard: [
		'100 1em "Agate"',
		'300 1em "Agate"',
		'1em "Agate"',
		'500 1em "Agate"',
		'italic 500 1em "Agate"',
		'700 1em "Agate"',
		'italic 700 1em "Agate"',
		'900 1em "Agate"',
		'italic 900 1em "Agate"',
		['1em "Agate Icons"', agateIcons],
		['1em "LG Icons"', lgIcons],
		'300 1em "Agate Global"',
		'1em "Agate Global"',
		'bold 1em "Agate Global"'
	],
	system: [
		// Full-names
		'300 1em "LG Smart UI Cond Light"',
		'1em "LG Smart UI Cond"',
		'600 1em "LG Smart UI Cond SemiBold"',
		'700 1em "LG Smart UI Cond Bold"',
		'300 1em "LG Smart UI Light"',
		'1em "LG Smart UI"',
		'600 1em "LG Smart UI SemiBold"',
		'700 1em "LG Smart UI Bold"',
		['1em "Agate"', agateIcons],
		['1em "LG Display_Dingbat"', lgIcons],
		'1em "LG Smart UI Global-Light"',
		'1em "LG Smart UI Global-Regular"',
		'1em "LG Display GP4_HK-Light"',
		'1em "LG Display GP4_HK-Regular"'
	],
	systemPs: [
		// Postscript names
		'300 1em "LGSmartUICond-Light"',
		'1em "LGSmartUICond-Regular"',
		'600 1em "LGSmartUICond-SemiBold"',
		'700 1em "LGSmartUICond-Bold"',
		'300 1em "LGSmartUI-Light"',
		'1em "LGSmartUI-Regular"',
		'600 1em "LGSmartUI-SemiBold"',
		'700 1em "LGSmartUI-Bold"',
		'1em "LGSmartUIGlobal-Light"',
		'1em "LGSmartUIGlobal-Regular"'
	],
	locale: [
		['1em "LG Display_Amharic"', 'አማርኛ'],
		'1em "LG Display_JP"',
		['1em "LG Display_ML"', 'മലയാളം'],
		['1em "LG Display_Oriya"', 'ଓଡ଼ିଆ ଭାଷା'],
		['1em "LG Display_Urdu"', 'مجھے چکّر آرہے ہیں']
	],
	legacyWeb: [
		'300 1em "Agate Miso"',
		'1em "Agate Miso"',
		'bold 1em "Agate Miso"',
		'100 1em "MuseoSans"',
		'300 1em "MuseoSans"',
		'1em "MuseoSans"',
		'500 1em "MuseoSans"',
		'italic 500 1em "MuseoSans"',
		'700 1em "MuseoSans"',
		'italic 700 1em "MuseoSans"',
		'900 1em "MuseoSans"',
		'italic 900 1em "MuseoSans"',
		['1em "Agate Icons"', agateIcons],
		['1em "LG Icons"', lgIcons],
		'300 1em "Agate LG Display"',
		'1em "Agate LG Display"',
		'bold 1em "Agate LG Display"'
	],
	legacySystem: [
		'300 1em "Miso"',
		'1em "Miso"',
		'bold 1em "Miso"',
		'100 1em "Museo Sans"',
		'300 1em "Museo Sans"',
		'1em "Museo Sans"',
		'500 1em "Museo Sans"',
		'italic 500 1em "Museo Sans"',
		'700 1em "Museo Sans"',
		'italic 700 1em "Museo Sans"',
		'900 1em "Museo Sans"',
		'italic 900 1em "Museo Sans"',
		['1em "Agate"', agateIcons],
		['1em "LG Display_Dingbat"', lgIcons],
		'1em "LG Display-Light"',
		'1em "LG Display-Regular"',
		'1em "LG Display GP4_HK-Light"',
		'1em "LG Display GP4_HK-Regular"'
	]
};

const MainPanel = (props) => {
	return (
		<Panel {...props}>
			<Header type="compact">
				<title>Font Verification</title>
				<Button>An Agate Button</Button>
			</Header>
			<Scroller focusableScrollbar>
				<Heading showLine size="large">Current</Heading>
				<FontList fonts={fonts.standard}>Agate Defined Fonts</FontList>
				<FontList fonts={fonts.system}>System Fonts (Locally Installed)</FontList>
				<FontList fonts={fonts.systemPs}>System Fonts PostScript Names (Locally Installed)</FontList>
				<Heading showLine size="large">Regional</Heading>
				<FontList fonts={fonts.locale}>Locale-specific Fonts</FontList>
				<Heading showLine size="large">Legacy</Heading>
				<FontList fonts={fonts.legacyWeb}>Legacy Agate Defined Fonts</FontList>
				<FontList fonts={fonts.legacySystem}>Legacy System Fonts (Locally Installed)</FontList>
			</Scroller>
		</Panel>
	);
};

export default MainPanel;
