import {mount, shallow} from 'enzyme';
import {Checkbox, CheckboxBase} from '../Checkbox';
import css from '../Checkbox.module.less';

describe('Checkbox Specs', () => {
	test('should render correct icon when not selected', () => {

		const checkbox = mount(
			<Checkbox />
		);

		const expected = 0;
		const actual =  checkbox.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {

		const checkbox = mount(
			<Checkbox selected />
		);

		const expected = 1;
		const actual =  checkbox.find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	// Extra test cases
	test('should not include the indeterminate class when not indeterminate', () => {
		const checkbox = shallow(
			<CheckboxBase />
		);

		const expected = css.indeterminate;
		const actual = checkbox.prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the indeterminate class when given the indeterminate prop', () => {
		const checkbox = shallow(
			<CheckboxBase indeterminate />
		);

		const expected = css.indeterminate;
		const actual = checkbox.prop('className');

		expect(actual).toContain(expected);
	});

	test('should prioritize indeterminate over selected', () => {
		const checkbox = shallow(
			<CheckboxBase indeterminate selected indeterminateIcon="minus">Sel</CheckboxBase>
		);

		const expected = 'minus';
		const actual = checkbox.find('.icon').prop('children');

		expect(actual).toBe(expected);
	});
});
