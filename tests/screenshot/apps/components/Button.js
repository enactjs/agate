import Button from '../../../../Button';

import {TallglyphKhmer, TallglyphLatin, TallglyphMultiScript, withConfig} from './utils';

const ButtonSmokeTests = [
	<Button>Click me</Button>,
	<Button icon="home" iconPosition="after" selected>Click me</Button>,
	<Button highlighted size="small">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button badge={10} badgeColor="#FDC902">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,

	<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button disabled>click me</Button>
];

const ButtonIconTests = [
	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example, but it is not required since it is the default.
	<Button size="smallest">click me</Button>,
	<Button size="small">click me</Button>,
	<Button size="huge">click me</Button>,

	// iconPosition = before (Default) + icon + iconPosition + different sizes
	<Button icon="minus" iconPosition="after">click me</Button>,
	<Button icon="minus" iconPosition="after" size="smallest">click me</Button>,
	<Button icon="minus" iconPosition="after" size="small">click me</Button>,
	<Button icon="minus" iconPosition="after" size="huge">click me</Button>,
	<Button icon="plus" iconPosition="before">click me</Button>,
	<Button icon="plus" iconPosition="after" size="smallest">click me</Button>,
	<Button icon="plus" iconPosition="after" size="small">click me</Button>,
	<Button icon="plus" iconPosition="after" size="huge">click me</Button>,

	// Icon only, iconPosition = before (Default) + icon + iconPosition + + different sizes
	<Button icon="minus" iconPosition="after" />,
	<Button icon="minus" iconPosition="after" size="smallest" />,
	<Button icon="minus" iconPosition="after" size="small" />,
	<Button icon="minus" iconPosition="after" size="huge" />,
	<Button icon="plus" iconPosition="before" />,
	<Button icon="plus" iconPosition="before" size="smallest" />,
	<Button icon="plus" iconPosition="before" size="small" />,
	<Button icon="plus" iconPosition="before" size="huge" />,

	// iconPosition = before (Default) + backgroundOpacity
	<Button icon="plus" backgroundOpacity="transparent">click me</Button>,
	<Button backgroundOpacity="opaque">click me</Button>,

	// iconFlip
	<Button icon="arrowharpoonright" iconFlip="horizontal">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="vertical">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="both">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="auto">click me</Button>
];

const ButtonSelectedTests = [
	// Selected buttons
	<Button selected>click me</Button>,
	<Button selected icon="plus" />,
	<Button selected backgroundOpacity="transparent">click me</Button>,
	<Button selected backgroundOpacity="transparent" icon="plus" />,
	<Button selected backgroundOpacity="opaque">click me</Button>
];

const ButtonWithTallglyphTests = [
	<Button>Tallglyph Text</Button>,
	<Button small>Tallglyph Text</Button>,
	<Button icon="star" />,
	<Button icon="star">Tallglyph Text</Button>,

	// Real tall glyphs
	<Button>{TallglyphMultiScript}</Button>,
	<Button>{TallglyphLatin}</Button>,
	<Button>Bản văn</Button>,
	<Button>{TallglyphKhmer}</Button>
];

const ButtonTests = [
	...ButtonSmokeTests,
	...ButtonIconTests,
	...ButtonSelectedTests,
	...ButtonWithTallglyphTests,

	// Focused
	...withConfig({focus: true}, [
		...ButtonSmokeTests,
		...ButtonIconTests,
		...ButtonSelectedTests,
		...ButtonWithTallglyphTests,
	]),

	// *************************************************************
	// Tallglyph validation
	// locale = 'vi-VN'
	// *************************************************************
	...withConfig({locale: 'vi-VN'}, ButtonWithTallglyphTests),

	// *************************************************************
	// Tallglyph validation
	// locale = 'km-KH'
	// *************************************************************
	...withConfig({locale: 'km-KH'}, ButtonWithTallglyphTests),

	// *************************************************************
	// RTL
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28181]
	...withConfig({locale: 'ar-SA'}, [
		...ButtonSmokeTests,
		...ButtonIconTests,
		...ButtonSelectedTests,
		...ButtonWithTallglyphTests,
	])
];

export default ButtonTests;
