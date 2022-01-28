import React, {useCallback} from 'react';
import {useGlobals} from '@storybook/api';
import {ToolbarTab} from './ToolbarTab';

export const DefaultSkinToolbarTab = ({toolbarParamKey}) => {

	const [globals, updateGlobals] = useGlobals();
	const isActive = globals[toolbarParamKey] || false;

	const toggleState = useCallback(
		() =>
			updateGlobals({
				[toolbarParamKey]: !isActive
			}),
		[isActive]
	);

	return <ToolbarTab toggleState={toggleState} isActive={isActive} toolbarParamKey={toolbarParamKey} />;
};
