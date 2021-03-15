import SwitchItem from '../../../../SwitchItem';

import {withConfig} from './utils';

const SwitchItemTests = [
	<SwitchItem />,

	<SwitchItem>Hello SwitchItem</SwitchItem>,
	<SwitchItem selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled>Hello SwitchItem</SwitchItem>,

	// with icon
	<SwitchItem icon="music">Hello SwitchItem</SwitchItem>,

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		<SwitchItem>Hello SwitchItem</SwitchItem>,
		<SwitchItem selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
		// with icon
		<SwitchItem icon="music">Hello SwitchItem</SwitchItem>
	])
];
export default SwitchItemTests;
