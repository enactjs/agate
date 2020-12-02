import CheckboxItem from '../../../../CheckboxItem';
import Icon from '../../../../Icon';
import React from 'react';


const CheckboxItemTests = [
	<CheckboxItem />,
	<CheckboxItem>CheckboxItem</CheckboxItem>, 			// not selected
	<CheckboxItem disabled>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem selected>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>,

	<CheckboxItem indeterminate>CheckboxItem</CheckboxItem>, 			// not selected
	<CheckboxItem indeterminate indeterminateIcon="lock">CheckboxItem</CheckboxItem>, 	// not selected
	<CheckboxItem disabled indeterminate>CheckboxItem</CheckboxItem>,	// not selected
	<CheckboxItem selected indeterminate>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected disabled indeterminate>CheckboxItem</CheckboxItem>,

	// Icon slotBefore
	<CheckboxItem><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,
	<CheckboxItem selected><Icon slot="slotBefore">home</Icon>CheckboxItem Checked</CheckboxItem>,
	<CheckboxItem indeterminate><Icon slot="slotBefore">home</Icon>CheckboxItem</CheckboxItem>,

	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <CheckboxItem>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled>CheckboxItem</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem disabled indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem selected disabled indeterminate>CheckboxItem Checked</CheckboxItem>
	},
	{
		locale: 'ar-SA',
		component: <CheckboxItem indeterminate indeterminateIcon="lock">CheckboxItem Checked</CheckboxItem>
	}
];
export default CheckboxItemTests;
