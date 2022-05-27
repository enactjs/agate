import {useGlobals} from '@storybook/api';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line

import ToolbarTab from './ToolbarTab';

const DefaultSkinToolbarTab = ({toolbarParamKey}) => {
	const [globals, updateGlobals] = useGlobals();
	const isActive = globals[toolbarParamKey] || false;

	const toggleState = () => {
		updateGlobals({
			[toolbarParamKey]: !isActive
		});
	};

	return (
		<ToolbarTab
			isActive={isActive}
			toggleState={toggleState} // eslint-disable-line react/jsx-no-bind
			toolbarParamKey={toolbarParamKey}
		/>
	);
};

DefaultSkinToolbarTab.propTypes = {
	toolbarParamKey: PropTypes.string
};

export default DefaultSkinToolbarTab;
