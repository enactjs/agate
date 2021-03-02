import Button from '../../../../Button';
import TooltipDecorator from '../../../../TooltipDecorator';

import {withConfig} from './utils';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const TooltipDecoratorTests = [
	{
		component: <TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
		focus: true
	},
	{
		component: <TooltipButton tooltipDelay={100} tooltipText="tooltip">Click me</TooltipButton>,
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>,
		focus: true
	},
	{
		component: <TooltipButton tooltipText="Tooltip to test tooltipWidth prop" tooltipWidth={50}>Click me</TooltipButton>,
		focus: true
	},
	{
		component: <TooltipButton tooltipText="Long tooltip to test that Marquee applies" tooltipMarquee tooltipWidth={150}>Click me</TooltipButton>,
		focus: true
	},

	// RTL
	...withConfig({
		focus: true,
		locale: 'ar-SA'
	}, [
		<TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
		<TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>
	])
];

export default TooltipDecoratorTests;
