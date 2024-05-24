import AgateDecorator from '@enact/agate/ThemeDecorator';
import Panels from '@enact/agate/Panels';
import kind from '@enact/core/kind';

import MainPanel from '../views/MainPanel';

import * as css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	)
});

export default AgateDecorator(App);
