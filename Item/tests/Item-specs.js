import {mount, shallow} from 'enzyme';

import {Item, ItemBase} from '../Item';

import css from '../Item.module.less';

describe('Item Specs', () => {
	test('should render an Item with content', () => {
		const content = 'Hello Item';

		const item = mount(
			<Item>{content}</Item>
		);

		const expected = content;
		const actual = item.text();

		expect(actual).toBe(expected);
	});

	test('should support adding a `label`', () => {
		const expected = 'Item Label';

		const item = mount(
			<Item label={expected}>Hello Item</Item>
		);

		const actual = item.find(`.${css.label}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support label with 0', () => {
		const item = mount(
			<Item label={0}>Hello Item</Item>
		);

		const expected = '0';
		const actual = item.find(`.${css.label}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support adding text as a child when a label is also set', () => {
		const expected = 'Hello Item';

		const item = mount(
			<Item label="Item label">
				{expected}
			</Item>
		);

		const actual = item.find(`.${css.content}`).first().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotBefore`', () => {
		const expected = 'slot before';

		const subject = mount(
			<ItemBase slotBefore={expected}>
				Hello Item
			</ItemBase>
		);

		const actual = subject.find(`.${css.slotBefore}`).last().text();

		expect(actual).toBe(expected);
	});

	test('should support `slotAfter`', () => {
		const expected = 'slot after';

		const subject = mount(
			<ItemBase slotAfter={expected}>
				Hello Item
			</ItemBase>
		);

		const actual = subject.find(`.${css.slotAfter}`).last().text();

		expect(actual).toBe(expected);
	});

	test('should support repositioning of the label', () => {
		const item = mount(
			<Item labelPosition="above" label="Item label">
				Hello Item
			</Item>
		);

		const expected = css.labelAbove;
		const actual = item.find(`.${css.itemContent}`).first().prop('className');

		expect(actual).toContain(expected);
	});

	test('should not include the selected class when not selected', () => {
		const item = mount(
			<Item>Hello Item</Item>
		);

		const expected = 'selected';
		const actual = item.find(`div.${css.item}`).prop('className');

		expect(actual).not.toContain(expected);
	});

	test('should add the selected class when given the selected prop', () => {
		const item = mount(
			<Item selected>Hello Item</Item>
		);

		const expected = 'selected';
		const actual = item.find(`div.${css.item}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply small class when size prop is `small`', () => {
		const item = shallow(
			<ItemBase size="small">Hello Item</ItemBase>
		);

		const expected = 'small';
		const actual = item.first().prop('className');

		expect(actual).toBe(expected);
	});

	test('should apply large class by default', () => {
		const item = shallow(
			<ItemBase>Hello Item</ItemBase>
		);

		const expected = 'large';
		const actual = item.first().prop('className');

		expect(actual).toBe(expected);
	});

	test('should apply centered class when centered prop is true', () => {
		const item = shallow(
			<ItemBase centered>Hello Item</ItemBase>
		);

		const expected = 'centered';
		const actual = item.first().prop('className');

		expect(actual).toContain(expected);
	});

	test('should support RTL text', () => {
		const subject = mount(<ItemBase>Hello מצב תמונה</ItemBase>);

		const expected = 'rtl';
		const actual = subject.find('.text').prop('style');

		expect(actual).toHaveProperty('direction', expected);
	});
});
