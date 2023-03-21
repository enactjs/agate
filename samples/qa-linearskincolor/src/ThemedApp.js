import ThemeDecorator from '@enact/agate/ThemeDecorator';
import useLinearSkinColor from '@enact/agate/LinearSkinColor';

import App from './App';

const colors = {
	accent: '#68da58',
	highlight: '#ce40d3'
}

const ThemedAppBase = () => {
	const {accent, highlight} = colors;
	const [newAccent, newHighlight] = useLinearSkinColor(accent, highlight);

	return (<App accent={newAccent} highlight={newHighlight} />)
};

const ThemedApp = ThemeDecorator(ThemedAppBase);

export default ThemedApp;
