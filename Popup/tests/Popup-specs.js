import React from 'react';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount, shallow} from 'enzyme';

import {Popup, PopupBase} from '../Popup';
import css from '../Popup.module.less';

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

	test('should be rendered with centered content if center is set to true', () => {
		const popup = shallow(
			<PopupBase centered>
				<div>popup</div>
			</PopupBase>
		);

		const expected = true;
		const actual = popup.find(`.${css.popup}`).prop('centered');

		expect(actual).toBe(expected);
	});
});
