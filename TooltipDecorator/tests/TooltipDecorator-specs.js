import React from 'react';
import {mount} from 'enzyme';
import {FloatingLayerBase, FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {Tooltip} from '../Tooltip';

describe('TooltipDecorator Specs', () => {
	test('should render component into FloatingLayer if open', () => {
		const Root = FloatingLayerDecorator('div');
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<Root>
				<FloatingLayerBase open>
					<Tooltip>
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = tooltipText;
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});

	test('should not render component into FloatingLayer if not open', () => {
		const Root = FloatingLayerDecorator('div');
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<Root>
				<FloatingLayerBase>
					<Tooltip>
						{tooltipText}
					</Tooltip>
				</FloatingLayerBase>
			</Root>
		);

		const expected = '';
		const actual = subject.find('FloatingLayer').text();

		expect(actual).toBe(expected);
	});
});
