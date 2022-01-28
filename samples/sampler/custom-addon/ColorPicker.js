import React, {useEffect} from 'react';
import {useGlobals} from '@storybook/api';
import {
	ACCENT_DEFAULT_VALUE,
	ACCENT_PARAM_KEY,
	HIGHLIGHT_DEFAULT_VALUE
} from './constants';

const getDefaultColor = (colorPickerType) => {
	if (colorPickerType === ACCENT_PARAM_KEY) return ACCENT_DEFAULT_VALUE;
	return HIGHLIGHT_DEFAULT_VALUE;
};

export const ColorPicker = ({colorPickerType}) => {
	const [globals, updateGlobals] = useGlobals();

	useEffect(() => {
		if (globals[colorPickerType]) return;

		updateGlobals({
			[colorPickerType]: getDefaultColor(colorPickerType)
		});
	}, []);

	return (
		<input
			type="color"
			value={globals[colorPickerType] || getDefaultColor(colorPickerType)}
			onChange={(e) => {
				updateGlobals({
					[colorPickerType]: e.target.value
				});
			}}
		/>
	);
};
