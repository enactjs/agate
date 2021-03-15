import Checkbox from '../../../../Checkbox';

const CheckboxTests = [
	<Checkbox />,
	<Checkbox disabled />,
	<Checkbox selected />,
	<Checkbox>star</Checkbox>,
	<Checkbox selected>star</Checkbox>,
	<Checkbox indeterminate>star</Checkbox>,
	<Checkbox indeterminate indeterminateIcon="plus">star</Checkbox>
];
export default CheckboxTests;
