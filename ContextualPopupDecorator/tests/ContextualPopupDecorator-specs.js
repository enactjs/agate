/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {mount} from 'enzyme';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {ContextualPopupDecorator} from '../ContextualPopupDecorator';
import Button from '../../Button';

const ContextualButton = ContextualPopupDecorator(Button);

describe('ContextualPopupDecorator Specs', () => {
	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';

		const subject = mount(
			<Root>
				<ContextualButton
					open
					popupComponent={() => <div>{message}</div>}
				>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = message;
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});

	test('should not render into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const message = 'goodbye';

		const subject = mount(
			<Root>
				<ContextualButton
					popupComponent={() => <div>{message}</div>}
				>
					Hello
				</ContextualButton>
			</Root>
		);

		const expected = '';
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});
});
