import {cap} from '@enact/core/util';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {getBooleanType, getObjectType} from '@enact/storybook-utils/addons/controls';
import {createPseudoStateFocusBridge} from '@enact/storybook-utils/decorators';

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
	controls: {
		disableSaveFromUI: true
	},
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

// storybook-addon-pseudo-states focus bridge (shared factory in @enact/storybook-utils/decorators).
// Agate additionally renders `Panels controls` chrome, so extend the default `ignoreSelector` to skip it.
const PseudoStateFocusBridge = createPseudoStateFocusBridge({ignoreSelector: '[class*="_Header_"], [class*="Panels_controls"]'});

export const decorators = [ThemeEnvironment, PseudoStateFocusBridge];
