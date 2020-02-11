// Agate Environment

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {color} from '@storybook/addon-knobs';
import {Row, Column, Cell} from '@enact/ui/Layout';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';

import AgateDecorator from '@enact/agate/AgateDecorator';
import Heading from '@enact/agate/Heading';
import {Panels, Panel} from '@enact/agate/Panels';
import Skinnable from '@enact/agate/Skinnable';
import Scroller from '@enact/agate/Scroller';

import css from './AgateEnvironment.module.less';

const globalGroup = 'Global Knobs';

// const reloadPage = () => {
// 	const {protocol, host, pathname} = window.parent.location;
// 	window.parent.location.href = protocol + '//' + host + pathname;
// };

const SkinFrame = Skinnable(kind({
	name: 'SkinFrame',
	styles: {
		css,
		className: 'skinFrame'
	},
	render: (props) => (
		<Row {...props} />
	)
}));

const reloadPage = () => {
	const {protocol, host, pathname} = window.parent.location;
	window.parent.location.href = protocol + '//' + host + pathname;
};

const PanelsBase = kind({
	name: 'AgateEnvironment',

	propTypes: {
		description: PropTypes.string,
		title: PropTypes.string
	},

	render: ({children, title, description, ...rest}) => (
		<div {...rest}>
			<Panels onApplicationClose={reloadPage}>
				<Panel className={css.panel}>
					<Column>
						<Cell shrink>
							<Heading showLine>{title}</Heading>
							{description ? (
								<div className={css.description}>
									<p>{description}</p>
								</div>
							) : null}
						</Cell>
						<Cell className={css.storyBody}>
							{children}
						</Cell>
					</Column>
				</Panel>
			</Panels>
		</div>
	)
});

const FullscreenBase = kind({
	name: 'AgateEnvironment',

	render: (props) => (
		<div {...props} />
	)
});

const Agate = AgateDecorator({overlay: false}, PanelsBase);
const AgateFullscreen = AgateDecorator({overlay: false}, FullscreenBase);

const locales = {
	'local':                                                             '',
	'en-US - US English':                                                'en-US',
	'ko-KR - Korean':                                                    'ko-KR',
	'es-ES - Spanish, with alternate weekends':                          'es-ES',
	'am-ET - Amharic, 5 meridiems':                                      'am-ET',
	'th-TH - Thai, with tall characters':                                'th-TH',
	'ar-SA - Arabic, RTL and standard font':                             'ar-SA',
	'ur-PK - Urdu, RTL and custom Urdu font':                            'ur-PK',
	'zh-Hans-HK - Simplified Chinese, custom Hans font':                 'zh-Hans-HK',
	'zh-Hant-HK - Traditional Chinese, custom Hant font':                'zh-Hant-HK',
	'vi-VN - Vietnamese, Special non-latin font handling':               'vi-VN',
	'ta-IN - Tamil, custom Indian font':                                 'ta-IN',
	'ja-JP - Japanese, custom Japanese font':                            'ja-JP',
	'en-JP - English, custom Japanese font':                             'en-JP',
	'si-LK - Sinhala, external font family with different line metrics': 'si-LK'
};

const skins = {
	'Carbon': 'carbon',
	'Cobalt': 'cobalt',
	'Copper': 'copper',
	'Electro': 'electro',
	'Gallium': 'gallium',
	'Titanium': 'titanium'
};

// NOTE: Knobs cannot set locale in fullscreen mode. This allows any knob to be taken from the URL.
const getPropFromURL = (propName, fallbackValue) => {
	propName = encodeURI(propName);
	const locationParams = window.parent.location.search;

	const startIndex = locationParams.indexOf('knob-' + propName);
	if (startIndex > -1) {
		const keyIndex = locationParams.indexOf('=', startIndex);

		if (locationParams.indexOf('&', keyIndex) > -1 ) {
			const valueIndex = locationParams.indexOf('&', keyIndex);
			return decodeURIComponent(locationParams.substring(keyIndex + 1, valueIndex));
		} else {
			return decodeURIComponent(locationParams.substring(keyIndex + 1, locationParams.length));
		}
	}

	return fallbackValue;
};

const memory = {
	skin: null
};

const StorybookDecorator = (story, config) => {
	const sample = story();
	const Config = {
		defaultProps: {
			locale: 'en-US',
			'night mode': false,
			skin: 'gallium'
		},
		groupId: globalGroup
	};
	const defaultColors = {
		carbon: {
			accent: '#8fd43a',
			highlight: '#6abe0b'
		},
		cobalt: {
			accent: '#8c81ff',
			highlight: '#ffffff'
		},
		copper: {
			accent: '#a47d66',
			highlight: '#ffffff'
		},
		electro: {
			accent: '#0359f0',
			highlight: '#ff8100'
		},
		gallium: {
			accent: '#8b7efe',
			highlight: '#e16253'
		},
		titanium: {
			accent: '#a6a6a6',
			highlight: '#2a48ca'
		}
	};
	const skinFromURL = getPropFromURL('skin');
	const currentSkin = skinFromURL ? skinFromURL : Config.defaultProps.skin;
	const newSkin = (memory.skin !== currentSkin);
	memory.skin = currentSkin;  // Remember the skin for the next time we load.
	const accentFromURL = getPropFromURL('accent');
	const highlightFromURL = getPropFromURL('highlight');
	const localeFromURL = getPropFromURL('locale');
	const currentLocale = localeFromURL ? localeFromURL : Config.defaultProps.locale;
	const locale = select('locale', locales, Config, currentLocale);
	const allSkins = boolean('show all skins', Config);
	const skinKnobs = {};
	if (!allSkins) {
		skinKnobs.skin = select('skin', skins, Config, currentSkin);
	}

	return (
		<Agate
			title={`${config.kind} ${config.story}`.trim()}
			description={config.description}
			locale={locale}
			{...skinKnobs}
			skinVariants={boolean('night mode', Config) && 'night'}
			accent={color('accent', (!newSkin && accentFromURL ? accentFromURL : defaultColors[currentSkin].accent), Config.groupId)}
			highlight={color('highlight', (!newSkin && highlightFromURL ? highlightFromURL : defaultColors[currentSkin].highlight), Config.groupId)}
		>
			<Scroller>
				{allSkins ? Object.keys(skins).map(skin => (
					<SkinFrame skin={skins[skin]} key={skin}>
						<Cell size="20%" component={Heading}>{skin}</Cell>
						<Cell>{sample}</Cell>
					</SkinFrame>
				)) : sample}
			</Scroller>
		</Agate>
	);
};

const FullscreenStorybookDecorator = (story, config) => {
	const sample = story();
	return (
		<AgateFullscreen
			title={`${config.kind} ${config.story}`.trim()}
			description={config.description}
			skin={select('skin', skins, getPropFromURL('skin'))}
		>
			{sample}
		</AgateFullscreen>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Agate, FullscreenStorybookDecorator as AgateFullscreen};
