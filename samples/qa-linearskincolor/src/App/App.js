import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import MainPanel from '../views/MainPanel';
import SecondPanel from '../views/SecondPanel';

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPanel />
	},
	{
		path: "/secondView",
		element: <SecondPanel />
	}
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
