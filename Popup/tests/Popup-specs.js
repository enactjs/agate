import React from 'react';
import {mount, shallow} from 'enzyme';

import {Popup, PopupBase} from '../Popup';
import css from '../Popup.module.less';

describe('Popup specs', () => {
	test('should set role to alert by default', () => {
		const popup = shallow(
			<PopupBase>
				<div>popup</div>
			</PopupBase>
		);

		const expected = 'alert';
		const actual = popup.find(`.${css.popup}`).prop('role');

		expect(actual).toBe(expected);
	});

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

	describe('with centered content', function () {
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
	});

	describe('with position center', function () {
		test('should have position=center when no position is specified', () => {
			const popup = mount(
				<PopupBase />
			);

			const expected = 'center';
			const actual = popup.prop('position');

			expect(actual).toBe(expected);
		});

		test('should not have center class', () => {
			const popup = shallow(
				<PopupBase open position="center">
					<div>popup</div>
				</PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('center');
		});
	});

	describe('with position top', function () {
		test('should have top class', () => {
			const popup = shallow(
				<PopupBase open position="top">
					<div>popup</div>
				</PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain('top');
		});
	});

	describe('with position changes dynamically', function () {
		test('should not have top class when position change from top to any other position', () => {
			const firstPosition = 'top';
			const popup = shallow(
				<PopupBase open position={firstPosition}>
					<div>popup</div>
				</PopupBase>
			);

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).toContain(firstPosition);
			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain('center');
			expect(popup.prop('className').split(' ')).not.toContain('center');

			popup.setProps({position: 'center'});

			expect(popup.find(`.${css.popup}`).prop('className').split(' ')).not.toContain(firstPosition);
			expect(popup.prop('className').split(' ')).not.toContain(firstPosition);
		});
	});
});
