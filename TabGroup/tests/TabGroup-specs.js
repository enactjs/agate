import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../../Button';
import TabGroup from '../TabGroup';
import ThemeDecorator from '../../ThemeDecorator';

describe('TabGroup Specs', () => {
	test('should fire `onTabClick` with `onTabClick` type when a tab is clicked', () => {
		const handleTabClick = jest.fn();
		render(
			<TabGroup
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home', onTabClick: handleTabClick},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		userEvent.click(screen.getByRole('group').children[0]); // clicking tab

		expect(handleTabClick).toHaveBeenCalled();
	});

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

	test('should render icons', () => {
		render(
			<TabGroup
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home', 'data-testid': 'homeIcon'},
					{title: 'Settings', icon: 'setting', 'data-testid': 'settingIcon'},
					{title: 'Theme', icon: 'display', 'data-testid': 'displayIcon'}
				]}
			/>
		);
		const actualHomeIcon = screen.getByTestId('homeIcon').textContent.codePointAt();
		const expectedHomeIcon = 983231; // decimal converted charCode of Unicode 'home' character
		const actualSettingsIcon = screen.getByTestId('settingIcon').textContent.codePointAt();
		const expectedSettingsIcon = 983083; // decimal converted charCode of Unicode 'setting' character
		const actualDisplayIcon = screen.getByTestId('displayIcon').textContent.codePointAt();
		const expectedDisplayIcon = 983244; // decimal converted charCode of Unicode 'display' character

		expect(actualHomeIcon).toBe(expectedHomeIcon);
		expect(actualSettingsIcon).toBe(expectedSettingsIcon);
		expect(actualDisplayIcon).toBe(expectedDisplayIcon);
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

	test('should apply className `vertical` when `orientation=vertical`', () => {
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

	test('should apply className `horizontal` when `orientation=horizontal`', () => {
		render(
			<TabGroup
				orientation="horizontal"
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 'horizontal';
		const actual = screen.getByRole('group').parentElement.parentElement;

		expect(actual).toHaveClass(expected);
	});

	test('should apply className `after` to the label when `orientation=vertical` and `tabPosition=before`', () => {
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

		const expected = 'after';
		const actual = screen.getByRole('group').children.item(0).children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should apply className `before` to the label when `orientation=vertical` and `tabPosition=after`', () => {
		render(
			<TabGroup
				orientation="vertical"
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 'before';
		const actual = screen.getByRole('group').children.item(0).children.item(0);

		expect(actual).toHaveClass(expected);
	});

	test('should include a ToggleButton inside TabLabel when the skin is `copper`', () => {
		const TabGroupComponent = () =>
			<TabGroup
				orientation="vertical"
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>;

		const App = ThemeDecorator(TabGroupComponent);

		render(<App skin="copper" />);

		const tabLabel = screen.getByLabelText('Home');
		const expected = 'toggleButton';
		const actual = tabLabel.children.item(0);

		expect(actual).toHaveClass(expected);
	});
});
