// HOC that receives 2 colors (accent and highlight) and returns 2 different colors
import {useCallback, useEffect, useState} from 'react';

const useLinearSkinColor = (accentColor, highlightColor) => {
	const [linearAccentColor, setLinearAccentColor] = useState(accentColor);
	const [linearHighlightColor, setLinearHighlightColor] = useState(highlightColor);

	const generateNewColor = useCallback((hexColor) => {
		// Convert the HEX color to RGB
		const r = parseInt(hexColor.substring(1, 3), 16);
		const g = parseInt(hexColor.substring(3, 5), 16);
		const b = parseInt(hexColor.substring(5, 7), 16);

		// Generate a random number between -50 and 50 for each RGB component
		const randomR = Math.floor(Math.random() * 101) - 50;
		const randomG = Math.floor(Math.random() * 101) - 50;
		const randomB = Math.floor(Math.random() * 101) - 50;

		// Apply the random values to the RGB components and ensure they are within the valid range (0-255)
		const newR = Math.min(255, Math.max(0, r + randomR));
		const newG = Math.min(255, Math.max(0, g + randomG));
		const newB = Math.min(255, Math.max(0, b + randomB));

		// Convert the RGB color back to HEX format and return it
		return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`;
	}, [])

	useEffect(() => {
		const newAccentColor = generateNewColor(accentColor);
		const newHighlightColor = generateNewColor(highlightColor);
		setLinearAccentColor(newAccentColor);
		setLinearHighlightColor(newHighlightColor);
	}, []);

	return [linearAccentColor, linearHighlightColor];
};

export default useLinearSkinColor;
