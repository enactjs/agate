import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Button from '../../Button';
import TabGroup from '../TabGroup';

describe('TabGroup Specs', () => {
	test('should render three tabs when given three objects in `tabs` prop', () => {
		render(
			<TabGroup
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expectedClass = 'tabGroup';

		const expectedTabNumber = 3;
		const tabGroup = screen.getByRole('group');

		expect(tabGroup).toHaveClass(expectedClass);
		expect(tabGroup.children).toHaveLength(expectedTabNumber);
	});

	test('should have positionAfter when given `tabPosition=after`', () => {
		render(
			<TabGroup
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 'positionAfter';
		const actual = screen.getByRole('group').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should render two buttons when given children', () => {
		render(
			<TabGroup
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			>
				<beforeTabs>
					<Button
						icon="arrowlargeleft"
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						icon="arrowlargeright"
						size="small"
						type="grid"
					/>
				</afterTabs>
			</TabGroup>
		);

		const expected = 2;
		const actual = screen.getAllByRole('button');

		expect(actual).toHaveLength(expected);
	});

	test('should apply `vertical` when `orientation=vertical`', () => {
		render(
			<TabGroup
				orientation="vertical"
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 'vertical';
		const actual = screen.getByRole('group').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});
});
