import Button from '../../../../Button';
import TooltipDecorator from '../../../../TooltipDecorator';
import React from 'react';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const TooltipDecoratorTests = [
	<TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipDelay={100} tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipText="Tooltip to test tooltipWidth prop" tooltipWidth={50}>Click me</TooltipButton>,
	<TooltipButton tooltipText="Long tooltip to test that Marquee applies" tooltipMarquee tooltipWidth={150}>Click me</TooltipButton>
];

export default TooltipDecoratorTests;
