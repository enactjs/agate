import ThemeDecorator from '@enact/agate/ThemeDecorator';
import useLinearSkinColor from '@enact/agate/LinearSkinColor';
import {createContext, useState} from 'react';

import App from './App';

export const AppContext = createContext();

const config = {
	accent: '#68da58',
	highlight: '#ce40d3',
	skinVariants: ''
}

const ThemedAppBase = () => {
	const [realTime, setRealTime] = useState(true);
	const [skin, setSkin] = useState(null);

	const {accent, highlight, skinVariants} = config;
	const [newAccent, newHighlight, newSkinVariants] = useLinearSkinColor(accent, highlight, skinVariants, realTime);

	return (
		<AppContext.Provider value={{realTime, setRealTime, setSkin}}>
			<App accent={newAccent} highlight={newHighlight} skinVariants={newSkinVariants} skin={skin} />
		</AppContext.Provider>
	)
};

const ThemedApp = ThemeDecorator(ThemedAppBase);

export default ThemedApp;
