import Button from '../../../../Button';
import React from 'react';

import {withConfig} from './utils';

const ButtonTests = [
	<Button>Click me</Button>,
	<Button icon="home" iconPosition="after" selected>Click me</Button>,
	<Button highlighted size="small">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button badge={10} badgeColor="#FDC902">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,

	<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button disabled>click me</Button>,

	<Button> ฟิ้  ไั  ஒ  து</Button>,
	<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
	<Button>Bản văn</Button>,
	<Button>តន្ត្រី</Button>,

	// iconPosition = before (Default) + small (default) + large
	// Leaving size small here as example but it is not required since it is the default.
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

	// Selected buttons
	<Button selected>click me</Button>,
	<Button selected icon="plus" />,
	<Button selected backgroundOpacity="transparent">click me</Button>,
	<Button selected backgroundOpacity="transparent" icon="plus" />,
	<Button selected backgroundOpacity="opaque">click me</Button>,

	// iconFlip
	<Button icon="arrowharpoonright" iconFlip="horizontal">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="vertical">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="both">click me</Button>,
	<Button icon="arrowharpoonright" iconFlip="auto">click me</Button>,


	// *************************************************************
	// Tallglyph validation
	// locale = 'vi-VN'
	// *************************************************************
	...withConfig({locale: 'vi-VN'}, [
		<Button>Vietnamese Text</Button>,
		<Button small>Vietnamese Text</Button>,
		<Button icon="star" />,
		<Button icon="star">Vietnamese Text</Button>,

		// Real tall glyphs
		<Button> ฟิ้  ไั  ஒ  து</Button>,
		<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
		<Button>Bản văn</Button>,
		<Button>តន្ត្រី</Button>

	]),


	// *************************************************************
	// Tallglyph validation
	// locale = 'km-KH'
	// *************************************************************
	...withConfig({locale: 'km-KH'}, [
		<Button>Cambodian Text</Button>,
		<Button small>Cambodian Text</Button>,
		<Button icon="star" />,
		<Button icon="star">Cambodian Text</Button>,

		// Real tall glyphs
		<Button size="small">តន្ត្រី</Button>
	]),


	// *************************************************************
	// RTL
	// locale = 'ar-SA'
	// *************************************************************
	// [GT-28181]
	...withConfig({locale: 'ar-SA'}, [
		<Button>Click me</Button>,
		<Button icon="home" iconPosition="after" selected>Click me</Button>,
		<Button highlighted size="small">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
		<Button badge={10} badgeColor="#FDC902">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,

		<Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
		<Button disabled>click me</Button>,

		<Button> ฟิ้  ไั  ஒ  து</Button>,
		<Button>ÃÑÕÂÊÎÔÛÄËÏÖÜŸ</Button>,
		<Button>Bản văn</Button>,
		<Button>តន្ត្រី</Button>,

		// iconPosition = before (Default) + small (default) + large
		// Leaving size small here as example but it is not required since it is the default.
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

		// Selected buttons
		<Button selected>click me</Button>,
		<Button selected icon="plus" />,
		<Button selected backgroundOpacity="transparent">click me</Button>,
		<Button selected backgroundOpacity="transparent" icon="plus" />,
		<Button selected backgroundOpacity="opaque">click me</Button>,

		// iconFlip
		<Button icon="arrowharpoonright" iconFlip="horizontal">click me</Button>,
		<Button icon="arrowharpoonright" iconFlip="vertical">click me</Button>,
		<Button icon="arrowharpoonright" iconFlip="both">click me</Button>,
		<Button icon="arrowharpoonright" iconFlip="auto">click me</Button>,
	])
];

export default ButtonTests;
