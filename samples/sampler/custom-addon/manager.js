import {addons, types} from 'storybook/manager-api';
import React from 'react'; // eslint-disable-line

import {ACCENT_ADDON_ID, ACCENT_PARAM_KEY, DEFAULTSKINS_ADDON_ID, DEFAULTSKINS_PARAM_KEY, HIGHLIGHT_ADDON_ID, HIGHLIGHT_PARAM_KEY} from './constants.js';
import Toolbar from './Toolbar.js';

addons.register(ACCENT_ADDON_ID, () => {
	const renderAccentColorPickerTab = () =>
		React.createElement(Toolbar, {param: ACCENT_PARAM_KEY, isColorPicker: true});

	const renderHighlightColorPickerTab = () =>
		React.createElement(Toolbar, {param: HIGHLIGHT_PARAM_KEY, isColorPicker: true});

	const renderDefaultSkinsTab = () =>
		React.createElement(Toolbar, {param: DEFAULTSKINS_PARAM_KEY, isColorPicker: false});

	addons.add(ACCENT_ADDON_ID, {
		title: 'Accent tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: renderAccentColorPickerTab,
		paramKey: ACCENT_ADDON_ID
	});

	addons.add(HIGHLIGHT_ADDON_ID, {
		title: 'Highlight tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: renderHighlightColorPickerTab,
		paramKey: HIGHLIGHT_PARAM_KEY
	});

	addons.add(DEFAULTSKINS_ADDON_ID, {
		title: 'Default skins tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: renderDefaultSkinsTab,
		paramKey: DEFAULTSKINS_PARAM_KEY
	});
});