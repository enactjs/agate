import React from 'react';
import {mount, shallow} from 'enzyme';

import {Popup, PopupBase} from '../Popup';
import css from '../Popup.module.less';

describe('Popup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const popup = mount(
			<Popup open>
				<div>popup</div>
			</Popup>
		);

		const expected = true;
		const actual = popup.prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const popup = mount(
			<Popup open={false}>
				<div>popup</div>
			</Popup>
		);

		const expected = false;
		const actual = popup.prop('open');

		expect(actual).toBe(expected);
	});

	test('should be rendered with centered content if centered is set to true', () => {
		const popup = mount(
			<Popup centered />
		);

		const expected = true;
		const actual = popup.prop('centered');

		expect(actual).toBe(expected);
	});

	test('should not be rendered with centered content if centered is set to false', () => {
		const popup = mount(
			<Popup centered={false} />
		);

		const expected = false;
		const actual = popup.prop('centered');

		expect(actual).toBe(expected);
	});

	test('should have position=center when no position is specified', () => {
		const popup = mount(
			<PopupBase />
		);

		const expected = 'center';
		const actual = popup.prop('position');

		expect(actual).toBe(expected);
	});

	test('should have `top` class when position prop is set to `top`', () => {
		const popup = shallow(
			<PopupBase position="top" />
		);

		const expected = 'top';
		const actual = popup.find(`.${css.popup}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have `bottom` class when position prop is set to `bottom`', () => {
		const popup = shallow(
			<PopupBase position="bottom" />
		);

		const expected = 'bottom';
		const actual = popup.find(`.${css.popup}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have `left` class when position prop is set to `left`', () => {
		const popup = shallow(
			<PopupBase position="left" />
		);

		const expected = 'left';
		const actual = popup.find(`.${css.popup}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have `right` class when position prop is set to `right`', () => {
		const popup = shallow(
			<PopupBase position="right" />
		);

		const expected = 'right';
		const actual = popup.find(`.${css.popup}`).prop('className');

		expect(actual).toContain(expected);
	});

	test('should have `fullscreen` class when position prop is set to `fullscreen`', () => {
		const popup = shallow(
			<PopupBase position="fullscreen" />
		);

		const expected = 'fullscreen';
		const actual = popup.find(`.${css.popup}`).prop('className');

		expect(actual).toContain(expected);
	});
});
