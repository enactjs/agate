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
		const actual = dropDown.find('.text').at(1).text();

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
		const actual = dropDown.find('.text').at(1).text();

		expect(actual).toBe(expected);
	});

	test('should have `title` when `selected` is invalid', () => {
		const dropDown = shallow(
			<DropdownBase title={title} selected={-1}>
				{children}
			</DropdownBase>
		);

		const expected = title;
		const actual = dropDown.find('DropdownButton').prop('children');

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
		const actual = dropDown.find('DropdownButton').prop('aria-label');

		expect(actual).toBe(expected);
	});

	test('should be disabled when there are no `children`', () => {
		const dropDown = mount(
			<DropdownBase title={title}>
				{[]}
			</DropdownBase>
		);

		const expected = true;
		const actual = dropDown.find('DropdownButton').prop('disabled');

		expect(actual).toBe(expected);
	});

	test('should update when children are added', () => {
		const dropDown = shallow(
			<Dropdown title={title}>
				{children}
			</Dropdown>
		);

		const updatedChildren = children.concat('option4', 'option5');
		dropDown.setProps({children: updatedChildren});
		const expected = 5;
		const actual = dropDown.children().length;

		expect(actual).toBe(expected);
	});

	test('should set the `role` of items to "checkbox"', () => {
		const dropDown = shallow(
			<DropdownBase title={title} defaultOpen>
				{['item']}
			</DropdownBase>
		);

		const expected = 'checkbox';
		const actual = dropDown.find('DropdownButton').prop('popupProps').children[0].role;

		expect(actual).toBe(expected);
	});

	test('should set the `aria-checked` state of the `selected` item', () => {
		const dropDown = shallow(
			<DropdownBase title={title} selected={0}>
				{['item']}
			</DropdownBase>
		);

		const expected = true;
		const actual = dropDown.find('DropdownButton').prop('popupProps').children[0]['aria-checked'];

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
		const actual = dropDown.find('DropdownButton').prop('popupProps').children[0].disabled;

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
		const actual = dropDown.find('DropdownButton').prop('popupProps').children[0];

		expect(actual).toMatchObject(expected);
	});

	test('should apply smallest width when width prop equals "smallest"', () => {
		const dropDown = mount(
			<DropdownBase width="smallest">
				{children}
			</DropdownBase>
		);
		const expected = 'smallestWidth';
		const actual = dropDown.find('div').at(0).prop('className');
		expect(actual).toContain(expected);
	});

	test('should apply small width when width prop equals "small"', () => {
		const dropDown = mount(
			<DropdownBase width="small">
				{children}
			</DropdownBase>
		);
		const expected = 'smallWidth';
		const actual = dropDown.find('div').at(0).prop('className');
		expect(actual).toContain(expected);
	});

	test('should apply large width when width prop equals "large"', () => {
		const dropDown = mount(
			<DropdownBase width="large">
				{children}
			</DropdownBase>
		);
		const expected = 'largeWidth';
		const actual = dropDown.find('div').at(0).prop('className');
		expect(actual).toContain(expected);
	});

	test('should huge smallest width when width prop equals "huge"', () => {
		const dropDown = mount(
			<DropdownBase width="huge">
				{children}
			</DropdownBase>
		);
		const expected = 'hugeWidth';
		const actual = dropDown.find('div').at(0).prop('className');
		expect(actual).toContain(expected);
	});
});
