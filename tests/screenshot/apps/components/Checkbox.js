import Checkbox from '../../../../Checkbox';

import {withConfig} from './utils';

const CheckboxTests = [
	<Checkbox />,
	<Checkbox disabled />,
	<Checkbox selected />,
	<Checkbox>star</Checkbox>,
	<Checkbox selected>star</Checkbox>,
	<Checkbox indeterminate>star</Checkbox>,
	<Checkbox indeterminate indeterminateIcon="plus">star</Checkbox>,

	...withConfig({focus: true}, [
		<div><Checkbox style={{margin: '30px'}} /></div>,
		<div><Checkbox style={{margin: '30px'}} disabled /></div>,
		<div><Checkbox style={{margin: '30px'}} selected /></div>,
		<div><Checkbox style={{margin: '30px'}}> star</Checkbox></div>,
		<div><Checkbox selected style={{margin: '30px'}}>star</Checkbox></div>,
		<div><Checkbox indeterminate style={{margin: '30px'}}>star</Checkbox></div>,
		<div><Checkbox indeterminate indeterminateIcon="plus" style={{margin: '30px'}}>star</Checkbox></div>
	])
];
export default CheckboxTests;
