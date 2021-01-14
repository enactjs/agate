import React from 'react';
import {mount, shallow} from 'enzyme';
import {FloatingLayerBase, FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import Button from '../../Button';
import {Tooltip} from '../Tooltip';
import TooltipDecorator from '../TooltipDecorator';
import TooltipLabel from '../TooltipLabel';

const TooltipButton = TooltipDecorator(
	{tooltipDestinationProp: 'decoration'},
	Button
);

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

	test('should apply alignment when `centered` and `marquee`', () => {
		const subject = shallow(
			<TooltipLabel centered marquee>
				Label
			</TooltipLabel>
		);

		const expected = 'center';
		const actual = subject.prop('alignment');

		expect(actual).toBe(expected);
	});

	test('should not apply alignment when `centered` but not `marquee`', () => {
		const subject = shallow(
			<TooltipLabel centered>
				Label
			</TooltipLabel>
		);

		expect(subject).not.toHaveProperty('alignment');
	});

	test('should position Tooltip above when tooltipPosition equals "above"', () => {
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<TooltipButton tooltipPosition="above">
				{tooltipText}
			</TooltipButton>
		);

		const expected = 'above';
		const actual = subject.find('TooltipDecorator').first().prop('tooltipPosition');

		expect(actual).toBe(expected);
	});

	test('should position Tooltip below when tooltipPosition equals "below"', () => {
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<TooltipButton tooltipPosition="below">
				{tooltipText}
			</TooltipButton>
		);

		const expected = 'below';
		const actual = subject.find('TooltipDecorator').first().prop('tooltipPosition');

		expect(actual).toBe(expected);
	});

	test('should position Tooltip on left when tooltipPosition equals "left middle"', () => {
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<TooltipButton tooltipPosition="left middle">
				{tooltipText}
			</TooltipButton>
		);

		const expected = 'left middle';
		const actual = subject.find('TooltipDecorator').first().prop('tooltipPosition');

		expect(actual).toBe(expected);
	});

	test('should position Tooltip on right when tooltipPosition equals "right middle"', () => {
		const tooltipText = 'This is a tooltip';

		const subject = mount(
			<TooltipButton tooltipPosition="right middle">
				{tooltipText}
			</TooltipButton>
		);

		const expected = 'right middle';
		const actual = subject.find('TooltipDecorator').first().prop('tooltipPosition');

		expect(actual).toBe(expected);
	});
});
