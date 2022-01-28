import React from 'react';
import {Icons, IconButton} from '@storybook/components';

export const ToolbarTab = ({toolbarParamKey, isActive, toggleState}) => {
	return (
		<IconButton
			key={toolbarParamKey}
			active={isActive}
			onClick={toggleState ? toggleState : null}
		>
			<Icons /> {toolbarParamKey}
		</IconButton>
	);
};
