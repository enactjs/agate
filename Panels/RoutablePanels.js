import {adaptEvent, forward, handle} from '@enact/core/handle';
import compose from 'ramda/src/compose';
import Changeable from '@enact/ui/Changeable';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Panels from './Panels';
import Routable from './Routable';

const decorateRoutes = (routes, routeProps) => React.Children.map(routes, (route) => {
	return React.cloneElement(route, {...routeProps});
});

const navigateHandler = handle(
	adaptEvent(({path}) => {
		return {path: Array.isArray(path) ? [...path] : path};
	}, forward('onChange'))
);

const RoutablePanelsBase = kind({
	name: 'RoutablePanels',
	propTypes: {
		onNavigate: PropTypes.func,
		path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
	},
	handlers: {
		onBack: navigateHandler,
		onNavigate: navigateHandler
	},
	computed: {
		children: ({children, onNavigate, path}) => decorateRoutes(children, {onNavigate, path})
	},
	render: (props) => {
		delete props.onNavigate;

		return (<Panels {...props} />);
	}
});

const RoutableDecorator = compose(
	Changeable({prop: 'path'}),
	Routable({navigate: 'onNavigate'})
);

const RoutablePanels = RoutableDecorator(RoutablePanelsBase);

export default RoutablePanels;
export {RoutablePanels, RoutablePanelsBase};
