import React from 'react'; // eslint-disable-line
import {useGlobals} from '@storybook/api';
import ToolbarTab from './ToolbarTab';
import PropTypes from 'prop-types';

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
			toggleState={toggleState} // eslint-disable-line react/jsx-no-bind
			isActive={isActive}
			toolbarParamKey={toolbarParamKey}
		/>
	);
};

DefaultSkinToolbarTab.propTypes = {
	toolbarParamKey: PropTypes.string
};

export default DefaultSkinToolbarTab;
