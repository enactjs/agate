import {useGlobals} from 'storybook/manager-api';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line

import ToolbarTab from './ToolbarTab.js';

const DefaultSkinToolbarTab = ({toolbarParamKey}) => {
	const [globals, updateGlobals] = useGlobals();
	const isActive = globals[toolbarParamKey] || false;

	const toggleState = () => {
		updateGlobals({
			[toolbarParamKey]: !isActive
		});
	};

	return React.createElement(ToolbarTab, {
		isActive: isActive,
		toggleState: toggleState,
		toolbarParamKey: toolbarParamKey
	});
};

DefaultSkinToolbarTab.propTypes = {
	toolbarParamKey: PropTypes.string
};

export default DefaultSkinToolbarTab;
