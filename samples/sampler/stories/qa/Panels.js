/* eslint-disable react/jsx-no-bind */
import {handle, forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import Routable, {Route, Linkable} from '@enact/ui/Routable';
import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Header from '@enact/agate/Header';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import {Panels, Panel, BreadcrumbPanels} from '@enact/agate/Panels';

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const BasicPanels = (props) => {
	const [index, setIndex] = React.useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));

	return (
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

const RoutablePanelsApp = class extends React.Component {
	static displayName = 'RoutablePanelsApp';

	constructor (props) {
		super(props);
		this.state = {appPath: '/settings'};
	}

	onNavigate = ({path}) => {
		this.setState({appPath: path});
	};

	render () {
		return (
			<div {...this.props}>
				<RoutablePanels path={this.state.appPath} onNavigate={this.onNavigate} cover="partial">
					<Route path="settings" component={MainPanel}>
						<Route path="page1" component={Page1}>
							<Route path="endPage" component={EndPage} />
						</Route>
						<Route path="page2" component={Page2}>
							<Route path="endPage" component={EndPage} />
						</Route>
					</Route>
				</RoutablePanels>
			</div>
		);
	}
};

storiesOf('Panels', module)
	.add(
		'preserve focus',
		() => (
			<BasicPanels
				noAnimation={boolean('noAnimation', Config)}
				noCloseButton={boolean('noCloseButton', Config)}
				orientation={select('orientation', ['horizontal', 'vertical'], Config)}
			/>
		),
		{
			props: {
				noPanels: true
			}
		}
	)
	.add(
		'preserve route focus',
		() => (<RoutablePanelsApp />)
	);
