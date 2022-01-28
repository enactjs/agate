import React from 'react';
import {addons, types} from '@storybook/addons';

import {Toolbar} from './Toolbar';
import {ACCENT_ADDON_ID, ACCENT_PARAM_KEY, DEFAULTSKINS_ADDON_ID, DEFAULTSKINS_PARAM_KEY, HIGHLIGHT_ADDON_ID, HIGHLIGHT_PARAM_KEY} from './constants';


addons.register(ACCENT_ADDON_ID, () => {
	addons.add(ACCENT_ADDON_ID, {
		title: 'Accent tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: () => <Toolbar param={ACCENT_PARAM_KEY} isColorPicker />,
		paramKey: ACCENT_ADDON_ID
	});
	addons.add(HIGHLIGHT_ADDON_ID, {
		title: 'Highlight tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: () => <Toolbar param={HIGHLIGHT_PARAM_KEY} isColorPicker />,
		paramKey: HIGHLIGHT_PARAM_KEY
	});
	addons.add(DEFAULTSKINS_ADDON_ID, {
		title: 'Default skins tab',
		type: types.TOOL,
		match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
		render: () => <Toolbar param={DEFAULTSKINS_PARAM_KEY} isColorPicker={false} />,
		paramKey: DEFAULTSKINS_PARAM_KEY
	});
});
