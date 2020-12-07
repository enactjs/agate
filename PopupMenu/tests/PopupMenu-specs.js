import React from 'react';
import {mount} from 'enzyme';

import {PopupMenu, PopupMenuBase} from '../PopupMenu';

describe('PopupMenu specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const popupMenu = mount(
			<PopupMenu open>
				<div>popupMenu</div>
			</PopupMenu>
		);

		const expected = true;
		const actual = popupMenu.prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const popupMenu = mount(
			<PopupMenu open={false}>
				<div>popupMenu</div>
			</PopupMenu>
		);

		const expected = false;
		const actual = popupMenu.prop('open');

		expect(actual).toBe(expected);
	});

	test('should display correct title', () => {
		const popupMenu = mount(
			<PopupMenu title="This is a Popupmenu title" />
		);

		const expected = 'This is a Popupmenu title';
		const actual = popupMenu.prop('title');

		expect(actual).toBe(expected);
	});

	test('should apply \'shown\' class when visible with noAnimation', () => {
		const popupMenu = mount(
			<PopupMenuBase noAnimation open />
		);

		const expected = 'shown';
		const actual = popupMenu.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});

	test('should apply \'ease-in-out\' class when noAnimation is false', () => {
		const popupMenu = mount(
			<PopupMenuBase open noAnimation={false} />
		);

		const expected = 'ease-in-out';
		const actual = popupMenu.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have orientation=horizontal when no orientation is specified', () => {
		const popupMenu = mount(
			<PopupMenuBase />
		);

		const expected = 'horizontal';
		const actual = popupMenu.prop('orientation');

		expect(actual).toBe(expected);
	});
});
