import {useGlobals} from 'storybook/manager-api';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect} from 'react'; // eslint-disable-line

import {ACCENT_DEFAULT_VALUE, ACCENT_PARAM_KEY, HIGHLIGHT_DEFAULT_VALUE} from './constants';

const getDefaultColor = (colorPickerType) => {
	if (colorPickerType === ACCENT_PARAM_KEY) return ACCENT_DEFAULT_VALUE;
	return HIGHLIGHT_DEFAULT_VALUE;
};

const ColorPicker = ({colorPickerType}) => {
	const [globals, updateGlobals] = useGlobals();
	const handleChange = useCallback((ev) => {
		updateGlobals({[colorPickerType]: ev.target.value});
	}, [colorPickerType, updateGlobals]);

	useEffect(() => {
		if (globals[colorPickerType]) return;

		updateGlobals({
			[colorPickerType]: getDefaultColor(colorPickerType)
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<span style={{color: 'white', paddingRight: '40px'}}>{colorPickerType}</span>
			<input
				type="color"
				value={globals[colorPickerType] || getDefaultColor(colorPickerType)}
				onChange={handleChange}
			/>
		</>
	);
};

ColorPicker.propTypes = {
	colorPickerType: PropTypes.string
};

export default ColorPicker;
