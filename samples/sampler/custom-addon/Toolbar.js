import React, {memo} from 'react';
import {WithTooltip, TooltipLinkList} from '@storybook/components';
import {useGlobals} from '@storybook/api';
import {ColorPicker} from './ColorPicker';
import {ToolbarTab} from './ToolbarTab';
import {DefaultSkinToolbarTab} from './DefaultSkinToolbarTab';

const getToolTipLink = (isColorPicker, colorPickerType) => {
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

const getColorPickerTab = (isColorPicker, toolbarParamKey) => {
	const toolTipLink = [getToolTipLink(isColorPicker, toolbarParamKey)];
	const [globals, updateGlobals] = useGlobals();

	if (globals['show default skins']) return null;
	return (
		<WithTooltip
			placement="top"
			trigger="click"
			closeOnClick
			tooltip={() => <TooltipLinkList links={toolTipLink} />}
		>
			<ToolbarTab toolbarParamKey={toolbarParamKey} />
		</WithTooltip>
	);
};

const getToolbarComponent = (isColorPicker, toolbarParamKey) => {
	// const toolTipLink = [getToolTipLink(isColorPicker, toolbarParamKey)];
	// const [globals, updateGlobals] = useGlobals();

	if (isColorPicker) {
		// if (globals['show default skins']) return null;
		// return (
		//   <WithTooltip
		//     placement="top"
		//     trigger="click"
		//     closeOnClick
		//     tooltip={() => <TooltipLinkList links={toolTipLink} />}
		//   >
		//     <ToolbarTab toolbarParamKey={toolbarParamKey} />
		//   </WithTooltip>
		// );
		return getColorPickerTab(isColorPicker, toolbarParamKey);
	}

	return <DefaultSkinToolbarTab toolbarParamKey={toolbarParamKey} />;
};

export const Toolbar = memo(({isColorPicker, param}) => {
	return getToolbarComponent(isColorPicker, param);
});
