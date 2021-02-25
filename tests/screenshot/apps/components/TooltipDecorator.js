import Button from '../../../../Button';
import TooltipDecorator from '../../../../TooltipDecorator';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const TooltipDecoratorTests = [
	<TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipDelay={100} tooltipText="tooltip">Click me</TooltipButton>,
	<TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>
];

export default TooltipDecoratorTests;
