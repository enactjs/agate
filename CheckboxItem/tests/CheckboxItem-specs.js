import {mount, shallow} from 'enzyme';
import {CheckboxItemBase} from '../CheckboxItem';
import css from '../../Checkbox/Checkbox.module.less';

describe('CheckboxItem Specs', () => {
	test('should support a custom icon', () => {
		const expected = 'star';

		const subject = shallow(
			<CheckboxItemBase icon={expected}>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const actual = subject.find('Checkbox').prop('children');

		expect(actual).toBe(expected);
	});

	test('should render correct icon when selected', () => {
		const subject = mount(
			<CheckboxItemBase selected />
		);

		const expected = 1;
		const actual =  subject.find('Checkbox').find(`.${css.selected}`).length;

		expect(actual).toBe(expected);
	});

	test('should include the indeterminate class when indeterminate', () => {
		const subject = mount(
			<CheckboxItemBase indeterminate>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const expected = 1;
		const actual = subject.find('Checkbox').find(`.${css.indeterminate}`).length;

		expect(actual).toBe(expected);
	});

	test('should not include the indeterminate class when not indeterminate', () => {
		const subject = mount(
			<CheckboxItemBase>
				Hello CheckboxItem
			</CheckboxItemBase>
		);

		const expected = css.indeterminate;
		const actual = subject.find('Checkbox').find(`.${css.indeterminate}`);

		expect(actual).not.toContain(expected);
	});
});
