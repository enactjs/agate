import {useGlobals} from 'storybook/manager-api';
import {WithTooltip, TooltipLinkList} from 'storybook/internal/components';
import React, {memo} from 'react'; // eslint-disable-line

import ColorPicker from './ColorPicker';
import DefaultSkinToolbarTab from './DefaultSkinToolbarTab';
import ToolbarTab from './ToolbarTab';

const getToolTipLink = (colorPickerType, isColorPicker) => {
	if (isColorPicker) {
		return {
			center: <ColorPicker colorPickerType={colorPickerType} />,
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
	return (
		<WithTooltip
			closeOnOutsideClick
			placement="top"
			tooltip={() => <TooltipLinkList links={toolTipLink} />} // eslint-disable-line react/jsx-no-bind
			trigger="click"
		>
			<ToolbarTab toolbarParamKey={toolbarParamKey} />
		</WithTooltip>
	);
};

const getToolbarComponent = (globals, isColorPicker, toolbarParamKey) => {
	if (isColorPicker) {
		return getColorPickerTab(globals['default skin styles'], isColorPicker, toolbarParamKey);
	}

	if (globals['show all skins'] === "true") return null;

	return <DefaultSkinToolbarTab toolbarParamKey={toolbarParamKey} />;
};

const Toolbar = memo(({isColorPicker, param}) => {
	const [globals] = useGlobals();

	return getToolbarComponent(globals, isColorPicker, param);
});

export default Toolbar;
