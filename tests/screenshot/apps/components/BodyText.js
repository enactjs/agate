import BodyText from '../../../../BodyText';

import {withConfig, TALLGLYPH_LOCALES, TallglyphMultiScript} from './utils';

const BodyTextSmokeTests = [
	<BodyText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BodyText>,
	<BodyText centered>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BodyText>,
	<BodyText noWrap>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BodyText>
];

const BodyTextTallGlyphTests = [
	<BodyText>{TallglyphMultiScript}</BodyText>,
	<BodyText>পারেন।</BodyText>
]

const BodyTextTests = [
	...BodyTextSmokeTests,
	withConfig({locale: 'ar-Sa'}, BodyTextSmokeTests),
	withConfig({locale: TALLGLYPH_LOCALES}, BodyTextTallGlyphTests)

]

export default BodyTextTests;
