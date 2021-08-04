import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Dropdown, {DropdownBase} from '../Dropdown';

const FloatingLayerController = FloatingLayerDecorator('div');

const children = ['option1', 'option2', 'option3'];
const title = 'Dropdown select';

describe('Dropdown', () => {
	test('should have `title`', () => {
		render(
			<DropdownBase title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(title);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title` that reflects `selected` option', () => {
		const selectedIndex = 1;
		render(
			<DropdownBase selected={selectedIndex} title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(children[selectedIndex]);

		expect(actual).toBeInTheDocument();
	});

	test('should have `title` when `selected` is invalid', () => {
		render(
			<DropdownBase selected={-1} title={title}>
				{children}
			</DropdownBase>
		);

		const actual = screen.getByText(title);

		expect(actual).toBeInTheDocument();
	});

	test.skip('should apply id to dropdown', () => {
		// 'id' is a prop that is not rendered in the DOM
		//	so we can't test it right now using Testing Library
		render(
			<DropdownBase id="drop">
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('button');

		const expectedAttribute = 'id';
		const expectedValue = 'drop';

		expect(dropdown).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should apply aria label to `title`', () => {
		render(
			<DropdownBase aria-label="Please select" title={title}>
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByLabelText('Please select');

		expect(dropdown).toHaveTextContent(title);
	});

	test('should be disabled when there are no `children`', () => {
		render(
			<DropdownBase title={title}>
				{[]}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('button');

		const expectedAttribute = 'disabled';

		expect(dropdown).toHaveAttribute(expectedAttribute);
	});

	test('should update when children are added', () => {
		const {rerender} = render(
			<FloatingLayerController>
				<Dropdown open title={title}>
					{children}
				</Dropdown>
			</FloatingLayerController>
		);

		const expected = 3;
		const actual = screen.getByRole('list').children;

		expect(actual).toHaveLength(expected);

		const lessChildren = children.slice(0, -1);
		rerender(
			<FloatingLayerController>
				<Dropdown open title={title}>
					{lessChildren}
				</Dropdown>
			</FloatingLayerController>
		);

		const expectedLessChildren = 2;
		const actualLessChildren = screen.getByRole('list').children;

		expect(actualLessChildren).toHaveLength(expectedLessChildren);

		const moreChildren = children.concat('option4');
		rerender(
			<FloatingLayerController>
				<Dropdown open title={title}>
					{moreChildren}
				</Dropdown>
			</FloatingLayerController>
		);

		const expectedMoreChildren = 3;
		const actualMoreChildren = screen.getByRole('list').children;

		expect(actualMoreChildren).toHaveLength(expectedMoreChildren);
	});

	test('should set the `role` of items to `checkbox`', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);
		const dropdownItem = screen.getByRole('checkbox');

		const expected = 'item';

		expect(dropdownItem).toHaveTextContent(expected);
	});

	test('should set the `aria-checked` state of the `selected` item', () => {
		render(
			<FloatingLayerController>
				<DropdownBase open selected={0} title={title}>
					{['item']}
				</DropdownBase>
			</FloatingLayerController>
		);
		const dropdownItem = screen.getByRole('checkbox');

		const expectedAttribute = 'aria-checked';
		const expectedValue = 'true';

		expect(dropdownItem).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should pass through members of child objects to props for each item', () => {
		render(
			<FloatingLayerController>
				<Dropdown open title={title}>
					{[{
						children: 'child',
						disabled: true,
						key: 'item-0'
					}]}
				</Dropdown>
			</FloatingLayerController>
		);
		const dropdownItem = screen.getByRole('checkbox');

		const expectedAttribute = 'disabled';

		expect(dropdownItem).toHaveAttribute(expectedAttribute);
	});

	test('should allow members in child object to override injected aria values', () => {
		render(
			<FloatingLayerController>
				<Dropdown open selected={0} title={title}>
					{[{
						'aria-checked': false,
						children: 'child',
						disabled: true,
						key: 'item-0',
						role: 'button'
					}]}
				</Dropdown>
			</FloatingLayerController>
		);
		const dropdownItem = screen.getAllByRole('button')[1];

		const expectedAttribute = 'aria-checked';
		const expectedValue = 'false';

		expect(dropdownItem).toHaveAttribute(expectedAttribute, expectedValue);
	});

	test('should apply smallest width when width prop equals `smallest`', () => {
		render(
			<DropdownBase width="smallest">
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('region');

		const expected = 'smallestWidth';

		expect(dropdown).toHaveClass(expected);
	});

	test('should apply small width when width prop equals `small`', () => {
		render(
			<DropdownBase width="small">
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('region');

		const expected = 'smallWidth';

		expect(dropdown).toHaveClass(expected);
	});

	test('should apply large width when width prop equals `large`', () => {
		render(
			<DropdownBase width="large">
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('region');

		const expected = 'largeWidth';

		expect(dropdown).toHaveClass(expected);
	});

	test('should huge smallest width when width prop equals `huge`', () => {
		render(
			<DropdownBase width="huge">
				{children}
			</DropdownBase>
		);
		const dropdown = screen.getByRole('region');

		const expected = 'hugeWidth';

		expect(dropdown).toHaveClass(expected);
	});
});
