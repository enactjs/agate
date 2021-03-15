import {mount} from 'enzyme';

import Button from '../../Button';
import TabGroup from '../TabGroup';

describe('TabGroup Specs', () => {
	test('should render three tabs when given three objects in `tabs` prop', () => {
		const subject = mount(
			<TabGroup
				tabPosition="before"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 3;
		const actual = subject.find('Tab').length;

		expect(actual).toBe(expected);
	});

	test('should have positionAfter when given `tabPosition=after`', () => {
		const subject = mount(
			<TabGroup
				tabPosition="after"
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			/>
		);

		const expected = 'after';
		const actual = subject.find('TabGroup').prop('tabPosition');

		expect(actual).toBe(expected);
	});

	test('should render two buttons when given children', () => {
		const subject = mount(
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

		const expected = 'arrowlargeleft';
		const actual = subject.find('Button').at(0).prop('icon');

		expect(actual).toBe(expected);

		const secondExpected = 'arrowlargeright';
		const secondActual = subject.find('Button').at(1).prop('icon');

		expect(secondActual).toBe(secondExpected);
	});

	test('should apply `vertical` when `orientation=vertical`', () => {
		const subject = mount(
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
		const actual = subject.find('TabGroup').prop('orientation');

		expect(actual).toBe(expected);
	});
});
