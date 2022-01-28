import React, {useEffect} from 'react';
import {useGlobals} from '@storybook/api';
import PropTypes from 'prop-types';
import {
	ACCENT_DEFAULT_VALUE,
	ACCENT_PARAM_KEY,
	HIGHLIGHT_DEFAULT_VALUE
} from './constants';

const getDefaultColor = (colorPickerType) => {
	if (colorPickerType === ACCENT_PARAM_KEY) return ACCENT_DEFAULT_VALUE;
	return HIGHLIGHT_DEFAULT_VALUE;
};

const ColorPicker = ({colorPickerType}) => {
	const [globals, updateGlobals] = useGlobals();

	useEffect(() => {
		if (globals[colorPickerType]) return;

		updateGlobals({
			[colorPickerType]: getDefaultColor(colorPickerType)
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<input
			type="color"
			value={globals[colorPickerType] || getDefaultColor(colorPickerType)}
			onChange={(e) => { // eslint-disable-line react/jsx-no-bind
				updateGlobals({[colorPickerType]: e.target.value});
			}}
		/>
	);
};

ColorPicker.propTypes = {
	colorPickerType: PropTypes.string
};

export default ColorPicker;
