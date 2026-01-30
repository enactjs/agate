import {checkPropTypes} from '@enact/core/util';
import {IconButton} from 'storybook/internal/components';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line

const ToolbarTab = (props) => {
	checkPropTypes(props);
	const {isActive, toggleState, toolbarParamKey} = props;
	return (
		<IconButton
			active={isActive}
			key={toolbarParamKey}
			onClick={toggleState ? toggleState : null}
			style={{display:'flex', flexDirection:'column'}}
		>
			{toolbarParamKey}
		</IconButton>
	);
};

ToolbarTab.propTypes = {
	isActive: PropTypes.bool,
	toggleState: PropTypes.func,
	toolbarParamKey: PropTypes.string
};

export default ToolbarTab;
