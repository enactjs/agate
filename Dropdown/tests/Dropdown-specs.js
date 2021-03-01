import {mount, shallow} from 'enzyme';
import Dropdown, {DropdownBase} from '../Dropdown';

const children = ['option1', 'option2', 'option3'];
const title = 'Dropdown select';

describe('Dropdown', () => {
	test('should have `title`', () => {
		const dropDown = mount(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const expected = title;
		const actual = dropDown.find('.text').text();

		expect(actual).toBe(expected);
	});

	test('should have `title` that reflects `selected` option', () => {
		const selectedIndex = 1;

		const dropDown = mount(
			<DropdownBase selected={selectedIndex} title={title}>
				{children}
			</DropdownBase>
		);

		const expected = children[selectedIndex];
		const actual = dropDown.find('.text').text();

		expect(actual).toBe(expected);
	});

	test('should apply id to dropdown', () => {
		const dropDown = mount(
			<DropdownBase id="drop">
				{children}
			</DropdownBase>
		);

		const expected = 'drop';
		// NOTE: Using `#id` as a find will pass because Enzyme will find the id prop and use that
		// instead of what is rendered into the DOM.
		const actual = dropDown.getDOMNode().id;

		expect(actual).toBe(expected);
	});

	test('should apply aria label to `title`', () => {
		const dropDown = mount(
			<DropdownBase title={title} aria-label="Please select">
				{children}
			</DropdownBase>
		);

		const expected = 'Please select';
		const actual = dropDown.find('Item.dropdown').prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should be disabled when there are no `children`', () => {
		const dropDown = mount(
			<DropdownBase title={title}>
				{[]}
			</DropdownBase>
		);

		const expected = true;
		const actual = dropDown.find('Item.dropdown').prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should update when children are added', () => {
		const dropDown = shallow(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const updatedChildren = children.concat('option4', 'option5');
		dropDown.setProps({children: updatedChildren});

		const expected = 5;
		const actual = dropDown.find('.group').children().length;

		expect(actual).toBe(expected);
	});

	test('should set the `role` of items to "checkbox"', () => {
		const dropDown = mount(
			<Dropdown open title={title}>
				{['item1']}
			</Dropdown>
		);

		const expected = 'checkbox';
		const actual = dropDown.find('.dropdownList Item').prop('role');

		expect(actual).toBe(expected);
	});

	test('should set the `aria-checked` state of the `selected` item', () => {
		const dropDown = mount(
			<Dropdown open title={title} selected={0}>
				{['item']}
			</Dropdown>
		);

		const expected = true;
		const actual = dropDown.find('.dropdownList Item').prop('aria-checked');

		expect(actual).toBe(expected);
	});

	test('should pass through members of child objects to props for each item', () => {
		const dropDown = mount(
			<Dropdown open title={title}>
				{[{
					disabled: true,
					children: 'child',
					key: 'item-0'
				}]}
			</Dropdown>
		);

		const expected = true;
		const actual = dropDown.find('.dropdownList Item').prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should allow members in child object to override injected aria values', () => {
		const dropDown = mount(
			<Dropdown open title={title} selected={0}>
				{[{
					disabled: true,
					children: 'child',
					key: 'item-0',
					role: 'button',
					'aria-checked': false
				}]}
			</Dropdown>
		);

		const expected = {
			role: 'button',
			'aria-checked': false
		};
		const actual = {
			role: dropDown.find('.dropdownList Item').prop('role'),
			'aria-checked': dropDown.find('.dropdownList Item').prop('aria-checked')
		};

		expect(actual).toMatchObject(expected);
	});
});
