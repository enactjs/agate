import React, {memo} from 'react'; // eslint-disable-line
import {WithTooltip, TooltipLinkList} from '@storybook/components';
import {useGlobals} from '@storybook/api';
import ColorPicker from './ColorPicker';
import ToolbarTab from './ToolbarTab';
import DefaultSkinToolbarTab from './DefaultSkinToolbarTab';

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

const getColorPickerTab = (isColorPicker, defaultSkins, toolbarParamKey) => {
	const toolTipLink = [getToolTipLink(isColorPicker, toolbarParamKey)];

	if (defaultSkins) return null;
	return (
		<WithTooltip
			placement="top"
			trigger="click"
			closeOnClick
			tooltip={() => <TooltipLinkList links={toolTipLink} />} // eslint-disable-line react/jsx-no-bind
		>
			<ToolbarTab toolbarParamKey={toolbarParamKey} />
		</WithTooltip>
	);
};

const getToolbarComponent = (isColorPicker, defaultSkins, toolbarParamKey) => {
	if (isColorPicker) {
		return getColorPickerTab(isColorPicker, defaultSkins, toolbarParamKey);
	}

	return <DefaultSkinToolbarTab toolbarParamKey={toolbarParamKey} />;
};

const Toolbar = memo(({isColorPicker, param}) => {
	const [globals] = useGlobals();

	return getToolbarComponent(isColorPicker, globals['show default skins'], param);
});

export default Toolbar;
