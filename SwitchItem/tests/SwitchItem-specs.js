import {mount} from 'enzyme';
import {SwitchItemBase} from '../SwitchItem';

describe('SwitchItem specs', () => {
	test('should contain a Switch', () => {
		const subject = mount(
			<SwitchItemBase>
				SwitchItem
			</SwitchItemBase>
		);

		const expected = 1;
		const actual = subject.find('Switch').length;

		expect(actual).toBe(expected);
	});

	test('should pass selected to Switch element', () => {
		const subject = mount(
			<SwitchItemBase selected>
				SwitchItem
			</SwitchItemBase>
		);

		const expected = true;
		const actual = subject.find('Switch').prop('selected');

		expect(actual).toBe(expected);
	});

	test('should apply disabled when `disabled` prop is true', () => {
		const subject = mount(
			<SwitchItemBase disabled>
				SwitchItem
			</SwitchItemBase>
		);

		const expected = true;
		const actual = subject.prop('disabled');

		expect(actual).toBe(expected);
	});
});
