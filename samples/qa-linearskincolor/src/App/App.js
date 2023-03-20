// import LinearSkinColor HOC
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

// TODO: Wrap App in LinearSkinColor HOC
export default App;
