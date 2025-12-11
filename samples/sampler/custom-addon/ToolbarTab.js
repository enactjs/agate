import {IconButton} from 'storybook/internal/components';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line

const ToolbarTab = ({isActive, toggleState, toolbarParamKey}) => {
	return React.createElement(
		IconButton,
		{
			active: isActive,
			key: toolbarParamKey,
			onClick: toggleState ? toggleState : null,
			style: {display:'flex', flexDirection:'column'}
		},
		toolbarParamKey
	);
};

ToolbarTab.propTypes = {
	isActive: PropTypes.bool,
	toggleState: PropTypes.func,
	toolbarParamKey: PropTypes.string
};

export default ToolbarTab;
