import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';

import {withConfig} from './utils';

const CheckboxItemSmokeTests = [
	<CheckboxItem />,
	<CheckboxItem>CheckboxItem</CheckboxItem>, 			// not selected
	<CheckboxItem disabled>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem selected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>,

	<CheckboxItem indeterminate>CheckboxItem</CheckboxItem>, 			// not selected
	<CheckboxItem indeterminate indeterminateIcon="lock">CheckboxItem</CheckboxItem>, 	// not selected
	<CheckboxItem disabled indeterminate>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem selected indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected disabled indeterminate>CheckboxItem</CheckboxItem>
];

const CheckboxItemSlotBeforeTests = [
	<CheckboxItem><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>
];

const CheckboxItemTests = [
	...CheckboxItemSmokeTests,
	...CheckboxItemSlotBeforeTests, // Icon slotBefore

	// *************************************************************
	// locale = 'ar-SA'
	...withConfig({locale: 'ar-SA'}, CheckboxItemSmokeTests)
];
export default CheckboxItemTests;
