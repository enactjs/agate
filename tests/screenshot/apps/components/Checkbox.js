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

const CheckboxTests = [
	...CheckboxSmokeTests,
	...withConfig({focus: true}, CheckboxSmokeTests)
];
export default CheckboxTests;
