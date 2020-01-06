// Agate Environment

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {color} from '@storybook/addon-knobs';
import {Column, Cell} from '@enact/ui/Layout';
import AgateDecorator from '@enact/agate/AgateDecorator';
import Heading from '@enact/agate/Heading';
import {Panels, Panel} from '@enact/agate/Panels';
import {select} from '../enact-knobs';

import css from './AgateEnvironment.module.less';

const globalGroup = 'Global Knobs';

// const reloadPage = () => {
// 	const {protocol, host, pathname} = window.parent.location;
// 	window.parent.location.href = protocol + '//' + host + pathname;
// };

const PanelsBase = kind({
	name: 'AgateEnvironment',

	propTypes: {
		description: PropTypes.string,
		title: PropTypes.string
	},

	render: ({children, title, description, ...rest}) => (
		<div {...rest}>
			<Panels>
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

const skins = {
	'Carbon': 'carbon',
	'Cobalt': 'cobalt',
	'Cobalt Day': 'cobalt-day',
	'Copper': 'copper',
	'Copper Day': 'copper-day',
	'Electro': 'electro',
	'Gallium Day': 'gallium-day',
	'Gallium Night': 'gallium-night',
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
			skin: 'gallium-day'
		},
		groupId: globalGroup
	};
	const defaultColors = {
		carbon: {
			accent: '#8fd43a',
			highlight: '#6abe0b'
		},
		cobalt: {
			accent: '#fc7982',
			highlight: '#ffffff'
		},
		'cobalt-day': {
			accent: '#8c81ff',
			highlight: '#ffffff'
		},
		copper: {
			accent: '#a47d66',
			highlight: '#ffffff'
		},
		'copper-day': {
			accent: '#a47d66',
			highlight: '#ffffff'
		},
		electro: {
			accent: '#0359f0',
			highlight: '#ff8100'
		},
		'gallium-day': {
			accent: '#8b7efe',
			highlight: '#e16253'
		},
		'gallium-night': {
			accent: '#fc7982',
			highlight: '#bd10e0'
		},
		titanium: {
			accent: '#a6a6a6',
			highlight: '#2a48ca'
		}
	};
	const skinFromURL = getPropFromURL('skin');
	const currentSkin = skinFromURL ? skinFromURL : 'gallium-day';
	const newSkin = (memory.skin !== currentSkin);
	memory.skin = currentSkin;  // Remember the skin for the next time we load.
	const accentFromURL = getPropFromURL('accent');
	const highlightFromURL = getPropFromURL('highlight');

	return (
		<Agate
			title={`${config.kind} ${config.story}`.trim()}
			description={config.description}
			skin={select('skin', skins, Config, currentSkin)}
			accent={color('accent', (!newSkin && accentFromURL ? accentFromURL : defaultColors[currentSkin].accent), Config.groupId)}
			highlight={color('highlight', (!newSkin && highlightFromURL ? highlightFromURL : defaultColors[currentSkin].highlight), Config.groupId)}
		>
			{sample}
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
