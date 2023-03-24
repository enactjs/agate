import ThemeDecorator from '@enact/agate/ThemeDecorator';
import useLinearSkinColor from '@enact/agate/LinearSkinColor';

import App from './App';

const config = {
	accent: '#68da58',
	highlight: '#ce40d3',
	skinVariants: ''
}

const ThemedAppBase = () => {
	const {accent, highlight, skinVariants} = config;
	const [newAccent, newHighlight, newSkinVariants] = useLinearSkinColor(accent, highlight, skinVariants);
	// console.log('aaa', newAccent);
	// console.log('bbb', newHighlight);

	return (<App accent={newAccent} highlight={newHighlight} skinVariants={newSkinVariants} />)
};

const ThemedApp = ThemeDecorator(ThemedAppBase);

export default ThemedApp;
