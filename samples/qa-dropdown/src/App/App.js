import ThemeDecorator from '@enact/agate/ThemeDecorator';
import kind from '@enact/core/kind';

import MainPanel from '../views/MainPanel';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<MainPanel />
		</div>
	)
});

export default ThemeDecorator(App);
