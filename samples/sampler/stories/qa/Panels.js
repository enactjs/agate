import Header from '@enact/agate/Header';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import {BreadcrumbPanels, Panel, Panels} from '@enact/agate/Panels';
import {handle, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import Routable, {Route, Linkable} from '@enact/ui/Routable';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const BasicPanels = (props) => {
	const [index, setIndex] = useState(0);
	const goNext = useCallback(() => setIndex(clamp(0, 2, index + 1)), [index]);
	const goPrevious = useCallback(() => setIndex(clamp(0, 2, index - 1)), [index]);

	return (
		<div style={{minHeight: ri.scaleToRem(399)}}>
			<Panels
				index={index}
				{...props}
			>
				<Panel>
					<Header title="First Panel" />
					<Item onClick={goNext}>Next1</Item>
					<Item onClick={goNext}>Next2</Item>
				</Panel>
				<Panel>
					<Header title="Second Panel" />
					<Item onClick={goPrevious}>Previous</Item>
					<Item onClick={goNext}>Next</Item>
				</Panel>
				<Panel>
					<Header title="Third Panel" />
					<Item onClick={goPrevious}>Previous</Item>
				</Panel>
			</Panels>
		</div>
	);
};

const MenuItemBase = kind({
	name: 'MenuItem',

	propTypes: {
		path: PropTypes.string
	},

	handlers: {
		onClick: handle(
			forward('onClick'),
			action('onClick')
		)
	},

	render: ({...rest}) => {
		return (
			<Item
				{...rest}
				slotAfter={
					<Icon size="small">arrowlargeright</Icon>
				}
			/>
		);
	}
});

const MenuItem = Linkable(MenuItemBase);

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel spotlightId="main-panel-container" {...props}> {/* Set a unique ID to preserve last focus */}
			<MenuItem path="./page1">Pages</MenuItem>
			<MenuItem path="./page2">General</MenuItem>
		</Panel>
	)
});

const Page1 = kind({
	name: 'Page1',

	render: (props) => (
		<Panel spotlightId="page1-container" {...props}> {/* Set a unique ID to preserve last focus */}
			<MenuItem path="./endPage">Page1</MenuItem>
			<MenuItem path="./endPage">Page2</MenuItem>
		</Panel>
	)
});

const Page2 = kind({
	name: 'Page2',

	render: (props) => (
		<Panel spotlightId="page2-container" {...props}> {/* Set a unique ID to preserve last focus */}
			<MenuItem path="./endPage">General1</MenuItem>
			<MenuItem path="./endPage">General2</MenuItem>
		</Panel>
	)
});

const EndPage = () => <h1>EndPage</h1>;

const BreadcrumbPanelsBase  = kind({
	name: 'Panels',
	propTypes: {
		onNavigate: PropTypes.func
	},
	render: ({onNavigate, ...rest}) => {
		return (
			<BreadcrumbPanels {...rest} noCloseButton onSelectBreadcrumb={onNavigate} />
		);
	}
});

const RoutablePanels = Routable({navigate: 'onNavigate'}, BreadcrumbPanelsBase);

const RoutablePanelsApp = (props) => {
	const [appPath, setAppPath] = useState('/settings');

	const onNavigate = useCallback(({path}) => {
		setAppPath(path);
	}, []);

	return (
		<div style={{minHeight: ri.scaleToRem(399)}} {...props}>
			<RoutablePanels path={appPath} onNavigate={onNavigate} cover="partial">
				<Route component={MainPanel} path="settings">
					<Route component={Page1} path="page1">
						<Route component={EndPage} path="endPage" />
					</Route>
					<Route component={Page2} path="page2">
						<Route component={EndPage} path="endPage" />
					</Route>
				</Route>
			</RoutablePanels>
		</div>
	);
};

RoutablePanelsApp.displayName = 'RoutablePanelsApp';

export default {
	title: 'Agate/Panels',
	component: 'Panels'
};

export const PreserveFocus = (args) => (
	<BasicPanels
		noAnimation={args['noAnimation']}
		noCloseButton={args['noCloseButton']}
		orientation={args['orientation']}
	/>
);

boolean('noAnimation', PreserveFocus, Config);
boolean('noCloseButton', PreserveFocus, Config);
select('orientation', PreserveFocus, ['horizontal', 'vertical'], Config);

PreserveFocus.storyName = 'preserve focus';
PreserveFocus.parameters = {
	props: {
		noPanels: true
	}
};

export const PreserveRouteFocus = () => <RoutablePanelsApp />;

PreserveRouteFocus.storyName = 'preserve route focus';
