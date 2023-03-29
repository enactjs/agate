import ThemeDecorator from '@enact/agate/ThemeDecorator';
import useLinearSkinColor from '@enact/agate/useLinearSkinColor';
import {createContext, useState} from 'react';

import App from './App';

export const AppContext = createContext();

const config = {
	skinVariants: ''
};

const ThemedAppBase = () => {
	const [accent, setAccent] = useState('#8b7efe'); // default gallium accent color
	const [highlight, setHighlight] = useState('#c6c0fe'); // default gallium highlight color
	const [realTime, setRealTime] = useState(true);
	const [skin, setSkin] = useState('gallium');

	const {skinVariants} = config;
	const [newAccent, newHighlight, newSkinVariants] = useLinearSkinColor(accent, highlight, skinVariants, realTime);

	return (
		<AppContext.Provider value={{realTime, setAccent, setHighlight, setRealTime, setSkin}}>
			<App accent={newAccent} highlight={newHighlight} skinVariants={newSkinVariants} skin={skin} />
		</AppContext.Provider>
	);
};

const ThemedApp = ThemeDecorator(ThemedAppBase);

export default ThemedApp;
