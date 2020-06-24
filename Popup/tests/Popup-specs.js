import React from 'react';
import {mount} from 'enzyme';

import Popup from '../Popup';

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
});
