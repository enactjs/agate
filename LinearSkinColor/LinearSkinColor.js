// HOC that receives 2 colors (accent and highlight) and returns 2 different colors
import {useEffect, useState} from 'react';

import {generateColorsDayMode, generateColorsNightMode, generateTimestamps, getIndex} from './utils';

const useLinearSkinColor = (accentColor, highlightColor, skinVariants) => {
	const [linearAccentColor, setLinearAccentColor] = useState(accentColor);
	const [linearHighlightColor, setLinearHighlightColor] = useState(highlightColor);
	const [linearSkinVariants, setLinearSkinVariants] = useState(skinVariants);

	const accentColors = {};
	const highlightColors = {};

	const timestamps = generateTimestamps(5);

	const accentColorsArray = () => {
		const dayColorsArray = generateColorsDayMode(accentColor, 72);
		const nightColorsArray = generateColorsNightMode(accentColor, 72);
		const array = [...nightColorsArray.reverse(), ...dayColorsArray, ...dayColorsArray.reverse(), ...nightColorsArray.reverse()];
		const offset = array.splice(0, 12);

		return [...array, ...offset];
	};

	const highlightColorsArray = () => {
		const dayColorsArray = generateColorsDayMode(highlightColor, 72);
		const nightColorsArray = generateColorsNightMode(highlightColor, 72)
		const array = [...dayColorsArray.reverse(), ...nightColorsArray, ...nightColorsArray.reverse(), ...dayColorsArray.reverse()];
		const offset = array.splice(0, 12);

		return [...array, ...offset];
	}

	timestamps.forEach((element, index) => {
		accentColors[element] = accentColorsArray()[index];
	});

	timestamps.forEach((element, index) => {
		highlightColors[element] = highlightColorsArray()[index];
	});

	useEffect(() => {
		let fakeIndex = 0
		const realTime = false;
		let changeColor = setInterval(() => {
			if (realTime) {
				const index = getIndex();
				let skinVariant;
				if (index >= '06:00' && index < '18:00') {
					skinVariant = '';
					setLinearSkinVariants(skinVariant);
				} else {
					skinVariant = 'night';
					setLinearSkinVariants(skinVariant);
				}

				setLinearAccentColor(accentColors[index]);
				setLinearHighlightColor(highlightColors[index]);
			} else {
				let skinVariant;
				if (60 <= fakeIndex && fakeIndex <= 203) {
					skinVariant = '';
					setLinearSkinVariants(skinVariant);
				} else {
					skinVariant = 'night';
					setLinearSkinVariants(skinVariant);
				}

				setLinearAccentColor(accentColorsArray()[fakeIndex]);
				setLinearHighlightColor(highlightColorsArray()[fakeIndex]);

				if (fakeIndex < 287) {
					fakeIndex++;
				} else {
					fakeIndex = 0;
				}
			}
		}, realTime ? 30 * 1000 : 100)

		return () => {
			clearInterval(changeColor);
			fakeIndex = 0;
		};
	}, []);

	return [linearAccentColor, linearHighlightColor, linearSkinVariants];
};

export default useLinearSkinColor;
