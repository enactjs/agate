// Theme Environment

import kind from '@enact/core/kind';
import {color} from '@storybook/addon-knobs';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {Row, Cell} from '@enact/ui/Layout';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React from 'react';

import Header from '@enact/agate/Header';
import Heading from '@enact/agate/Heading';
import {Panels, Panel} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';
import Skinnable from '@enact/agate/Skinnable';
import ThemeDecorator from '@enact/agate/ThemeDecorator';

import css from './ThemeEnvironment.module.less';

const globalGroup = 'Global Knobs';

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
	name: 'ThemeEnvironmentPanels',

	propTypes: {
		description: PropTypes.string,
		noHeader: PropTypes.bool,
		noPanel: PropTypes.bool,
		noPanels: PropTypes.bool,
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'themeEnvironmentPanels'
	},

	render: ({children, description, noHeader, noPanel, noPanels, title, ...rest}) => (
		<div {...rest}>
			{!noPanels ?<Panels {...rest} onApplicationClose={reloadPage}>
				{!noPanel ? <Panel className={css.panel}>
					{!noHeader ? (
						<Header title={title} subtitle={description} />
					) : null}
					{children}
				</Panel> : children}
			</Panels> : <div {...rest}>{children}</div>}
		</div>
	)
});

const FullscreenBase = kind({
	name: 'ThemeEnvironment',

	render: (props) => (
		<div {...props} />
	)
});

const Theme = ThemeDecorator({overlay: false}, PanelsBase);
const ThemeFullscreen = ThemeDecorator({overlay: false}, FullscreenBase);

// NOTE: Locales taken from strawman. Might need to add more in the future.
const locales = {
	'local': '',
	'en-US - US English': 'en-US',
	'ko-KR - Korean': 'ko-KR',
	'es-ES - Spanish, with alternate weekends': 'es-ES',
	'am-ET - Amharic, 5 meridiems': 'am-ET',
	'th-TH - Thai, with tall characters': 'th-TH',
	'ar-SA - Arabic, RTL and standard font': 'ar-SA',
	'ur-PK - Urdu, RTL and custom Urdu font': 'ur-PK',
	'zh-Hans-HK - Simplified Chinese, custom Hans font': 'zh-Hans-HK',
	'zh-Hant-HK - Traditional Chinese, custom Hant font': 'zh-Hant-HK',
	'vi-VN - Vietnamese, Special non-latin font handling': 'vi-VN',
	'ta-IN - Tamil, custom Indian font': 'ta-IN',
	'ja-JP - Japanese, custom Japanese font': 'ja-JP',
	'en-JP - English, custom Japanese font': 'en-JP',
	'si-LK - Sinhala, external font family with different line metrics': 'si-LK'
};

// This mapping/remapping is necessary to support objects being used as select-knob values, since
// they cannot be safely URL encoded during the knob saving/linking process.
const backgroundLabels = {
	'Default (Based on Skin)': '',
	'Strawberries (Red)': 'backgroundColorful1',
	'Tunnel (Green)': 'backgroundColorful2',
	'Mountains (Blue)': 'backgroundColorful3',
	'Misty River': 'backgroundColorful4',
	'Turbulant Tides': 'backgroundColorful5',
	'Space Station': 'backgroundColorful6',
	'Warm Pup': 'backgroundColorful7',
	'Random': 'backgroundColorful8'
};

// Values of `backgroundLabels` must be kept in sync with keys of `backgroundLabelMap`.
const backgroundLabelMap = {
	'': '',
	'backgroundColorful1': '#bb3352 url("http://picsum.photos/1280/720?image=1080") no-repeat center/cover',
	'backgroundColorful2': '#4e6a40 url("http://picsum.photos/1280/720?image=1063") no-repeat center/cover',
	'backgroundColorful3': '#5985a8 url("http://picsum.photos/1280/720?image=930") no-repeat center/cover',
	'backgroundColorful4': '#71736d url("http://picsum.photos/1280/720?image=1044") no-repeat center/cover',
	'backgroundColorful5': '#547460 url("http://picsum.photos/1280/720?image=1053") no-repeat center/cover',
	'backgroundColorful6': '#7c4590 url("http://picsum.photos/1280/720?image=967") no-repeat center/cover',
	'backgroundColorful7': '#5d6542 url("http://picsum.photos/1280/720?image=1025") no-repeat center/cover',
	'backgroundColorful8': '#555 url("http://picsum.photos/1280/720") no-repeat center/cover'
};

const skins = {
	'Carbon': 'carbon',
	'Cobalt': 'cobalt',
	'Copper': 'copper',
	'Electro': 'electro',
	'Gallium': 'gallium',
	'Silicon': 'silicon',
	'Titanium': 'titanium'
};

const getArgs = (str) => {
	return qs.parse(str || (typeof window !== 'undefined' ? window.parent.location.search : ''));
};

// This allows any knob to be taken from the URL.
const getKnobFromArgs = (args, propName, fallbackValue) => {
	const knob = 'knob-' + propName;
	let value = fallbackValue;

	if (args && knob in args) {
		try {
			// If it's valid JSON, parse it
			value = JSON.parse(args[knob]);
		} catch (e) {
			// no handling required; allow fallbackValue to be used
		}
	}

	return value;
};

const StorybookDecorator = (story, config = {}) => {
	const sample = story();
	const Config = {
		defaultProps: {
			locale: 'en-US',
			'night mode': false,
			skin: 'gallium'
		},
		groupId: globalGroup
	};
	const DevelopmentConfig = {
		defaultProps: {
			'debug aria': false,
			'debug layout': false,
			'debug spotlight': false
		},
		groupId: 'Development'
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
		silicon: {
			accent: '#f1304f',
			highlight: '#9e00d8'
		},
		titanium: {
			accent: '#a6a6a6',
			highlight: '#2a48ca'
		}
	};

	if (config.parameters) {
		if (config.parameters.info && config.parameters.info.text) {
			config.description = config.parameters.info.text;
		}
		if (config.parameters.props) {
			config.props = config.parameters.props;
		}
	}

	const args = getArgs();
	const classes = {
		aria: boolean('debug aria', DevelopmentConfig, getKnobFromArgs(args, 'debug aria')),
		layout: boolean('debug layout', DevelopmentConfig, getKnobFromArgs(args, 'debug layout')),
		spotlight: boolean('debug spotlight', DevelopmentConfig, getKnobFromArgs(args, 'debug spotlight'))
	};
	if (Object.keys(classes).length > 0) {
		classes.debug = true;
	}
	const skinKnobs = {};
	const allSkins = boolean('show all skins', Config);

	if (!allSkins) {
		skinKnobs.skin = select('skin', skins, Config, getKnobFromArgs(args, 'skin'));
		const useSkinDefaultStyles = boolean('default skin styles', Config);

		const defaultAccent = defaultColors[skinKnobs.skin].accent;
		const defaultHighlight = defaultColors[skinKnobs.skin].highlight;

		skinKnobs.accent = useSkinDefaultStyles ? defaultAccent : color('accent', defaultAccent, Config.groupId);
		skinKnobs.highlight = useSkinDefaultStyles ? defaultHighlight : color('highlight',defaultHighlight, Config.groupId);
	}

	return (
		<Theme
			className={classnames(classes)}
			description={config.description}
			locale={select('locale', locales, Config)}
			skinVariants={boolean('night mode', Config) && 'night'}
			style={{
				'--sand-env-background': backgroundLabelMap[select('background', backgroundLabels, Config, getKnobFromArgs(args, 'background'))]
			}}
			title={`${config.kind} ${config.story}`.trim()}
			{...skinKnobs}
			{...config.props}
			>
			<Scroller>
				{allSkins ? Object.keys(skins).map(skin => (
					<SkinFrame skin={skins[skin]} key={skin}>
						<Cell size="20%" component={Heading}>{skin}</Cell>
						<Cell>{sample}</Cell>
					</SkinFrame>
				)) : sample}
			</Scroller>
		</Theme>
	);
};

const FullscreenStorybookDecorator = (story, config = {}) => {
	const sample = story();
	const args = getArgs();
	return (
		<ThemeFullscreen
			description={config.description}
			locale={select('locale', locales, 'en-US')}
			style={backgroundLabelMap[select('background', backgroundLabels, getKnobFromArgs(args, 'background'))]}
			skinVariants={boolean('night mode', Config) && 'night'}
			title={`${config.kind} ${config.story}`.trim()}
		>
			{sample}
		</ThemeFullscreen>
	);
};

export default StorybookDecorator;
export {StorybookDecorator as Theme, FullscreenStorybookDecorator as ThemeFullscreen};
