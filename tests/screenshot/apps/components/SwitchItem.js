import SwitchItem from '../../../../SwitchItem';

import {withConfig} from './utils';

const SwitchItemsSmokeTests = [
	<SwitchItem />,
	<SwitchItem>Hello SwitchItem</SwitchItem>,
	<SwitchItem selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline disabled>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline disabled selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem icon="music">Hello SwitchItem</SwitchItem>
];

const SwitchItemTests = [
	...SwitchItemsSmokeTests,
	...withConfig({locale: 'ar-SA'}, SwitchItemsSmokeTests), // RTL
	...withConfig({focus: true}, SwitchItemsSmokeTests) // Focus
];
export default SwitchItemTests;
