import Button from '../../../../Button';
import TooltipDecorator from '../../../../TooltipDecorator';

import {withConfig} from './utils';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

const TooltipDecoratorTests = [
	{
		component: <TooltipButton tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipDelay={100} tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipText="Tooltip to test tooltipWidth prop" tooltipWidth={50}>Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipText="Long tooltip to test that Marquee applies" tooltipMarquee tooltipWidth={150}>Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},

	// tooltip position
	{
		component: <TooltipButton tooltipPosition="above" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="above center" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="above left" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="above right" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="below" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="below center" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="below left" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="below right" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="left bottom" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="left middle" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="left top" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="right bottom" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="right middle" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
		focus: true
	},
	{
		component: <TooltipButton tooltipPosition="right top" tooltipText="tooltip">Click me</TooltipButton>,
		wrapper: {
			padded: true
		},
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
