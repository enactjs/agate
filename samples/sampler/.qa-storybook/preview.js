import {cap} from '@enact/core/util';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {getBooleanType, getObjectType} from '@enact/storybook-utils/addons/controls';
import {DocsPage, DocsContainer} from '@enact/storybook-utils/addons/docs';
import {themes} from '@storybook/theming';

import ThemeEnvironment from '../src/ThemeEnvironment';

configureActions();

const locales = {
	local: '',
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

export const parameters = {
	docs: {
		container: DocsContainer,
		page: DocsPage,
		iframeHeight: 360,
		theme: themes.light
	},
	options: {
		storySort: {
			method: 'alphabetical'
		}
	}
};

export const globalTypes = {
	'locale': getObjectType('locale', 'en-US', locales),
	'night mode': getBooleanType('night mode'),
	'show all skins': getBooleanType('show all skins'),
	'skin': getObjectType('skins', 'gallium', skins),
};
export const decorators = [ThemeEnvironment];
