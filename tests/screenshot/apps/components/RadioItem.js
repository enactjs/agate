import Icon from '../../../../Icon';
import RadioItem from '../../../../RadioItem';

import {TallglyphLatin, TallglyphMultiScript, withConfig} from './utils';

const RadioItemsSmokeTests = [
	<RadioItem>RadioItem</RadioItem>,
	<RadioItem disabled>RadioItem</RadioItem>,
	<RadioItem inline>Inline RadioItem</RadioItem>,
	<RadioItem disabled inline>RadioItem Not Checked</RadioItem>,
	<RadioItem disabled>مساء الخير</RadioItem>,
	<RadioItem inline>{TallglyphLatin}</RadioItem>,
	<RadioItem>{TallglyphMultiScript}</RadioItem>,
	<RadioItem selected>{TallglyphLatin}</RadioItem>,
	<RadioItem selected>{TallglyphMultiScript}</RadioItem>,
	<RadioItem selected>RadioItem Checked</RadioItem>,
	<RadioItem selected disabled>RadioItem Checked</RadioItem>,
	<RadioItem selected disabled inline>RadioItem Checked</RadioItem>,
	<RadioItem selected inline>RadioItem Checked</RadioItem>,
	<RadioItem selected>-Lorem</RadioItem>
];

const RadioItemAdditionalTests = [
	<RadioItem inline>مساء الخير</RadioItem>,
	<RadioItem disabled>{TallglyphLatin}</RadioItem>,
	<RadioItem inline>{TallglyphMultiScript}</RadioItem>,
	<RadioItem><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem inline><Icon slot="slotBefore">home</Icon>RadioItem</RadioItem>,
	<RadioItem selected><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
	<RadioItem selected inline><Icon slot="slotBefore">home</Icon>RadioItem Checked</RadioItem>,
	<RadioItem icon="earphone">RadioItem</RadioItem>,
	<RadioItem icon="uninstall">RadioItem</RadioItem>
];

const RadioItemTests = [
	...RadioItemsSmokeTests,
	...RadioItemAdditionalTests,
	...withConfig({locale: 'ar-SA'}, RadioItemsSmokeTests) // locale = ar-SA
];

export default RadioItemTests;
