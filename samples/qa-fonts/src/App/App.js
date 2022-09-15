import {Panels} from '@enact/agate/Panels';
import ThemeDecorator from '@enact/agate/ThemeDecorator';

import MainPanel from '../views/MainPanel';

const App = (props) => {
	return (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	);
};

export default ThemeDecorator(App);
