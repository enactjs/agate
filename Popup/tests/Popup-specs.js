import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount, shallow} from 'enzyme';

import {Popup, PopupBase} from '../Popup';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('Popup specs', () => {
	test('should be rendered opened if open is set to true', () => {
		const popup = mount(
			<FloatingLayerController>
				<Popup open>
					<div>popup</div>
				</Popup>
			</FloatingLayerController>
		);

		const expected = true;
		const actual = popup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should not be rendered if open is set to false', () => {
		const popup = mount(
			<FloatingLayerController>
				<Popup>
					<div>popup</div>
				</Popup>
			</FloatingLayerController>
		);

		const expected = false;
		const actual = popup.find('FloatingLayer').prop('open');

		expect(actual).toBe(expected);
	});

	test('should apply \'centered\' class when open with centered', () => {
		const subject = shallow(
			<PopupBase centered />
		);

		const expected = 'centered';
		const actual = subject.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});

	test('should not apply \'centered\' class when open without centered', () => {
		const subject = shallow(
			<PopupBase />
		);

		const expected = '';
		const actual = subject.find('div').at(0).prop('className');

		expect(actual).toContain(expected);
	});
});
