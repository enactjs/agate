import {useGlobals} from '@storybook/api';
import {WithTooltip, TooltipLinkList} from '@storybook/components';
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
			left: <span style={{color: 'white'}}>{colorPickerType}</span>,
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
			closeOnClick
			placement="top"
			tooltip={() => <TooltipLinkList links={toolTipLink} />} // eslint-disable-line react/jsx-no-bind
			trigger="click"
		>
			<ToolbarTab toolbarParamKey={toolbarParamKey} />
		</WithTooltip>
	);
};

const getToolbarComponent = (defaultSkins, isColorPicker, toolbarParamKey) => {
	if (isColorPicker) {
		return getColorPickerTab(defaultSkins, isColorPicker, toolbarParamKey);
	}

	return <DefaultSkinToolbarTab toolbarParamKey={toolbarParamKey} />;
};

const Toolbar = memo(({isColorPicker, param}) => {
	const [globals] = useGlobals();

	return getToolbarComponent(globals['default skin styles'], isColorPicker, param);
});

export default Toolbar;
