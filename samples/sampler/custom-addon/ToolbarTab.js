import {Icons, IconButton} from '@storybook/components';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line

const ToolbarTab = ({toolbarParamKey, isActive, toggleState}) => {
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

ToolbarTab.propTypes = {
	isActive: PropTypes.bool,
	toggleState: PropTypes.func,
	toolbarParamKey: PropTypes.string
};

export default ToolbarTab;
