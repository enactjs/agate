import Slider, {SliderTooltip} from '../../../../Slider';

import {withConfig} from './utils';

const props = {
	wrapper: {
		padded: true
	},
	focus: true
};

const SliderSmokeTests = [
	<Slider />,
	<Slider disabled />,
	<Slider active />,
	<Slider min={0} max={20} progressAnchor={0.4} />,
	<Slider value={60} />,
	<Slider progressAnchor={0.7} value={60} />,
	<Slider progressAnchor={0.6} value={60} />,
	<Slider progressAnchor={0.4} value={60} />,
	<Slider backgroundProgress={0.5} value={25} />,
	<Slider backgroundProgress={0.25} value={75} progressAnchor={0.5} />,
	<Slider disabled backgroundProgress={0.25} value={50} />
];

const SliderAdditionalTests = [
	<Slider backgroundProgress={0.5} />,
	<Slider backgroundProgress={1} />,
	<Slider backgroundProgress={0.25} value={50} />,
	<Slider backgroundProgress={0.5} value={50} />,
	<Slider backgroundProgress={0.75} value={25} progressAnchor={0.5} />,
	<Slider backgroundProgress={0.1} value={25} progressAnchor={0.2} />,
	<Slider orientation="vertical" />,
	<Slider orientation="vertical" value={60} />,
	<Slider progressAnchor={0.7} orientation="vertical" value={60} />,
	<Slider progressAnchor={0.4} orientation="vertical" value={60} />,
	<Slider orientation="vertical" backgroundProgress={0.5} />,
	<Slider orientation="vertical" backgroundProgress={1} />,
	<Slider orientation="vertical" backgroundProgress={0.25} value={50} />,
	<Slider orientation="vertical" disabled backgroundProgress={0.25} value={50} />,
	<Slider orientation="vertical" backgroundProgress={0.5} value={25} />,
	<Slider orientation="vertical" backgroundProgress={0.25} value={75} progressAnchor={0.5} />,
	<Slider orientation="vertical" backgroundProgress={0.75} value={25} progressAnchor={0.5} />,
	<Slider orientation="vertical" backgroundProgress={0.1} value={25} progressAnchor={0.2} />
];

const SliderTests = [
	...SliderSmokeTests,
	...SliderAdditionalTests,
	{
		component: <Slider orientation="vertical" value={25} progressAnchor={0.5} tooltip />,
		...props
	},
	{
		component: <Slider value={25} progressAnchor={0.5} tooltip />,
		...props
	},
	{
		component: <Slider tooltip value={50} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip percent />} value={50} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="above" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="above left" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="above right" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="above before" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="above after" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="before" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="left" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="right" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="after" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="below" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="below left" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="below right" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="below before" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider tooltip={<SliderTooltip position="below after" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	// Vertical tooltip placement -- valid positions: before/after/left/right
	{
		component: <Slider orientation="vertical" tooltip={<SliderTooltip position="before" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider orientation="vertical" tooltip={<SliderTooltip position="after" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider orientation="vertical" tooltip={<SliderTooltip percent position="left" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	{
		component: <Slider orientation="vertical" tooltip={<SliderTooltip position="right" />} value={40} backgroundProgress={0.5} />,
		...props
	},
	...withConfig({locale: 'ar-SA'}, SliderSmokeTests) // RTL
];

export default SliderTests;
