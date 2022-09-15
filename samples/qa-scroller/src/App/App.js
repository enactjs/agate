import ThemeDecorator from '@enact/agate/ThemeDecorator';
import kind from '@enact/core/kind';

import MainView from '../views/MainView';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<MainView />
		</div>
	)
});

export default ThemeDecorator(App);
