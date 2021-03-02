import Button from '../../../../Button';
import TooltipDecorator from '../../../../TooltipDecorator';

import {withConfig} from './utils';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const TooltipDecoratorTests = [
	<TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipDelay={100} tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>,

	// RTL
	...withConfig({
		locale: 'ar-SA'
	}, [
		<TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
		<TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>
	])
];

export default TooltipDecoratorTests;
