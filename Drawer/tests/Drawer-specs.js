import {mount} from 'enzyme';

import {Drawer, DrawerBase} from '../Drawer';

describe('Drawer specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const drawer = mount(
			<Drawer open>
				Hello!
			</Drawer>
		);

		const expected = true;
		const actual = drawer.prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const drawer = mount(
			<Drawer open={false}>
				Hello!
			</Drawer>
		);

		const expected = false;
		const actual = drawer.prop('open');

		expect(actual).toBe(expected);
	});

	test('should apply \'shown\' class when visible', () => {
		const subject = mount(
			<DrawerBase open />
		);

		const expected = 'shown';
		const actual = subject.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply \'ease-in-out\' class when noAnimation is false', () => {
		const subject = mount(
			<DrawerBase open noAnimation={false} />
		);

		const expected = 'ease-in-out';
		const actual = subject.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});
});
