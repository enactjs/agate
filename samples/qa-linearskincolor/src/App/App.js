import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import MainPanel from '../views/MainPanel';
import SecondView from '../views/SecondView';
import ThirdView from '../views/ThirdView';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPanel />
	},
	{
		path: "/secondView",
		element: <SecondView />
	},
	{
		path: "/thirdView",
		element: <ThirdView />
	},
]);

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<RouterProvider router={router} />
		</div>
	)
});

export default ThemeDecorator(App);
