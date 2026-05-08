import {useGlobals} from 'storybook/manager-api';
import {WithTooltip, TooltipLinkList} from 'storybook/internal/components';
import React, {memo} from 'react';

import ColorPicker from './ColorPicker.js';
import DefaultSkinToolbarTab from './DefaultSkinToolbarTab.js';
import ToolbarTab from './ToolbarTab.js';

const getToolTipLink = (colorPickerType, isColorPicker) => {
	if (isColorPicker) {
		return {
			center: React.createElement(ColorPicker, {colorPickerType: colorPickerType}),
			id: colorPickerType,
			key: colorPickerType,
			name: colorPickerType,
			title: true
		};
	}
};

const getColorPickerTab = (defaultSkins, isColorPicker, toolbarParamKey) => {
	const toolTipLink = [getToolTipLink(toolbarParamKey, isColorPicker)];

	if (defaultSkins) return null;
	return React.createElement(
		WithTooltip,
		{
			closeOnOutsideClick: true,
			placement: "top",
			tooltip: () => React.createElement(TooltipLinkList, {links: toolTipLink}), //eslint-disable-line
			trigger: "click"
		},
		React.createElement(ToolbarTab, {toolbarParamKey: toolbarParamKey})
	);
};

const getToolbarComponent = (globals, isColorPicker, toolbarParamKey) => {
	if (isColorPicker) {
		return getColorPickerTab(globals['default skin styles'], isColorPicker, toolbarParamKey);
	}

	if (globals['show all skins'] === "true") return null;

	return React.createElement(DefaultSkinToolbarTab, {toolbarParamKey: toolbarParamKey});
};

const Toolbar = memo(({isColorPicker, param}) => {
	const [globals] = useGlobals();

	return getToolbarComponent(globals, isColorPicker, param);
});

export default Toolbar;
