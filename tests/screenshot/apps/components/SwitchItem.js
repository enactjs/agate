import SwitchItem from '../../../../SwitchItem';

import {withConfig} from './utils';

const SwitchItemTests = [
	<SwitchItem />,

	<SwitchItem>Hello SwitchItem</SwitchItem>,
	<SwitchItem selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
	<SwitchItem disabled selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline disabled>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline disabled selected>Hello SwitchItem</SwitchItem>,
	<SwitchItem inline selected>Hello SwitchItem</SwitchItem>,

	// with icon
	<SwitchItem icon="music">Hello SwitchItem</SwitchItem>,

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		<SwitchItem>Hello SwitchItem</SwitchItem>,
		<SwitchItem selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem disabled>Hello SwitchItem</SwitchItem>,
		<SwitchItem disabled selected>Hello SwitchItem</SwitchItem>,
		<SwitchItem inline>Hello SwitchItem</SwitchItem>,
		<SwitchItem inline selected>Hello SwitchItem</SwitchItem>,
		// with icon
		<SwitchItem icon="music">Hello SwitchItem</SwitchItem>
	]),

	// Focus
	...withConfig({focus: true}, [
		<SwitchItem>Hello focused SwitchItem</SwitchItem>,
		<SwitchItem selected>Hello focused SwitchItem</SwitchItem>,
		<SwitchItem disabled>Hello focused SwitchItem</SwitchItem>,
		<SwitchItem disabled selected>Hello focused SwitchItem</SwitchItem>,
		<SwitchItem inline>Focused SwitchItem</SwitchItem>,
		<SwitchItem inline selected>Focused SwitchItem</SwitchItem>,
		// with icon
		<SwitchItem icon="music">Hello focused SwitchItem</SwitchItem>
	])
];
export default SwitchItemTests;
