/* global FocusEvent, MutationObserver, cancelAnimationFrame, requestAnimationFrame */

import {cap} from '@enact/core/util';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {getBooleanType, getObjectType} from '@enact/storybook-utils/addons/controls';
import {useEffect} from 'react';

import ThemeEnvironment from '../src/ThemeEnvironment';

const tvViewports = {
	tvHD: {name: 'TV 720p (HD)', type: 'desktop', styles: {width: '1280px', height: '720px'}},
	tvFHD: {name: 'TV 1080p (FHD)', type: 'desktop', styles: {width: '1920px', height: '1080px'}},
	tvUHD: {name: 'TV 2160p (UHD / 4K)', type: 'desktop', styles: {width: '3840px', height: '2160px'}},
	portraitFHD: {name: 'Portrait 1080p (FHD)', type: 'mobile', styles: {width: '1080px', height: '1920px'}},
	portraitUHD: {name: 'Portrait 2160p (UHD / 4K)', type: 'mobile', styles: {width: '2160px', height: '3840px'}}
};

const locales = {
	'local': '',
	'en-US - US English': 'en-US',
	'ko-KR - Korean': 'ko-KR',
	'es-ES - Spanish, with alternate weekends': 'es-ES',
	'am-ET - Amharic, 5 meridiems': 'am-ET',
	'th-TH - Thai, with tallglyph characters': 'th-TH',
	'ar-SA - Arabic, RTL and standard font': 'ar-SA',
	'ur-PK - Urdu, RTL and custom Urdu font': 'ur-PK',
	'zh-Hans-HK - Simplified Chinese, custom Hans font': 'zh-Hans-HK',
	'zh-Hant-HK - Traditional Chinese, custom Hant font': 'zh-Hant-HK',
	'vi-VN - Vietnamese, with tallglyph characters': 'vi-VN',
	'ta-IN - Tamil, custom Indian font': 'ta-IN',
	'ja-JP - Japanese, custom Japanese font': 'ja-JP',
	'en-JP - English, custom Japanese font': 'en-JP',
	'si-LK - Sinhala, external font family with tallglyph characters': 'si-LK',
	'km-KH - Cambodian Khmer, with tallglyph characters': 'km-KH'
};

const skins = {
	'Carbon': 'carbon',
	'Cobalt': 'cobalt',
	'Copper': 'copper',
	'Electro': 'electro',
	'Gallium': 'gallium',
	'Titanium': 'titanium'
};

if (process.env.SKINS) {
	JSON.parse(process.env.SKINS).forEach(skin => {
		skins[cap(skin)] = skin;
	});
}

configureActions();

export const parameters = {
	options: {
		storySort: {
			method: 'alphabetical'
		}
	},
	pseudo: {
		rootSelector: 'body'
	},
	viewport: {
		options: {
			...tvViewports
		}
	}
};

export const globalTypes = {
	'locale': getObjectType('locale', 'en-US', locales),
	'night mode': getBooleanType('night mode'),
	'show all skins': getBooleanType('show all skins'),
	'skin': getObjectType('skins', 'gallium', skins),
	'accent': '#8B7EFE',
	'highlight': '#E16253',
	'default skin styles': false
};

// storybook-addon-pseudo-states bridge.
//
// The addon only toggles CSS pseudo-classes; it cannot drive Enact's focus visuals, which are gated
// by Spotlight input-mode (`.spotlight-input-*` on `#storybook-root`) and, for components like
// TooltipDecorator, by React state that only real focus/hover events set. This decorator observes the
// forcing class the addon applies to `<body>` (`pseudo-focus-all` / `pseudo-hover-all` ) and mirrors
// it with genuine Enact focus on the story's own spottable element:
//   - `.focus()` sets `document.activeElement`, so CSS `:focus` styling applies,
//     and `spotlight-input-key` is added so Enact's input-mode-gated focus rules are eligible.
//   - a bubbling `focusin` is dispatched so React's delegated `onFocus` runs even when the preview
//     iframe doesn't hold system focus (as when the pseudo-state is toggled from the addon toolbar),
//     which is what makes state-driven UI such as the tooltip appear and stay shown.
const PseudoStateFocusBridge = (story) => {
	useEffect(() => {
		const root = document.getElementById('storybook-root');
		if (!root) return;

		const isForced = () => /pseudo-(focus|hover|active)/.test(document.body.className);
		// Skip the sampler chrome (Panel Header + Panels controls) and target the story's own control.
		const findSpottable = () => [...root.querySelectorAll('.spottable')].find((el) => !el.closest('[class*="_Header_"], [class*="Panels_controls"]'));

		let rafId = null;
		let target = null;
		let wasForced = false;

		const forceFocus = (tries = 0) => {
			const spottable = findSpottable();
			if (spottable) {
				target = spottable;
				root.classList.add('spotlight-input-key');
				spottable.focus();
				spottable.dispatchEvent(new FocusEvent('focusin', {bubbles: true}));
			} else if (tries < 10) {
				rafId = requestAnimationFrame(() => forceFocus(tries + 1));
			}
		};

		const clearFocus = () => {
			const el = target || findSpottable();
			if (el) {
				el.blur();
				el.dispatchEvent(new FocusEvent('focusout', {bubbles: true}));
			}
			target = null;
		};

		const sync = () => {
			if (rafId) cancelAnimationFrame(rafId);
			const forced = isForced();
			if (forced) {
				forceFocus();
			} else if (wasForced) {
				clearFocus();
			}
			wasForced = forced;
		};

		const observer = new MutationObserver(sync);
		observer.observe(document.body, {attributes: true, attributeFilter: ['class']});
		sync();

		return () => {
			observer.disconnect();
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	return story();
};

export const decorators = [ThemeEnvironment, PseudoStateFocusBridge];
