import Checkbox from '../../../../Checkbox';

import {withConfig} from './utils';

const CheckboxSmokeTests = [
	<Checkbox />,
	<Checkbox disabled />,
	<Checkbox selected />,
	<Checkbox>star</Checkbox>,
	<Checkbox selected>star</Checkbox>,
	<Checkbox indeterminate>star</Checkbox>,
	<Checkbox indeterminate indeterminateIcon="plus">star</Checkbox>
];

const CheckboxFocusedTests = [
	<div><Checkbox style={{margin: '30px'}} /></div>,
	<div><Checkbox style={{margin: '30px'}} disabled /></div>,
	<div><Checkbox style={{margin: '30px'}} selected /></div>,
	<div><Checkbox style={{margin: '30px'}}> star</Checkbox></div>,
	<div><Checkbox selected style={{margin: '30px'}}>star</Checkbox></div>,
	<div><Checkbox indeterminate style={{margin: '30px'}}>star</Checkbox></div>,
	<div><Checkbox indeterminate indeterminateIcon="plus" style={{margin: '30px'}}>star</Checkbox></div>
];

const CheckboxTests = [
	...CheckboxSmokeTests,
	...withConfig({focus: true}, CheckboxFocusedTests)
];
export default CheckboxTests;
