import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import Routable, {Link, Route} from '@enact/ui/Routable';
import {storiesOf} from '@storybook/react';

import {Panels, Panel, BreadcrumbPanels} from '@enact/agate/Panels';
import Item from '@enact/agate/Item';
import {clamp} from '@enact/core/util';
import Header from '../../../../Header';
import kind from "@enact/core/kind";
import Button from "../../../../Button";
import * as PropTypes from "prop-types";

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);


const BasicPanels = () => {
	const [index, setIndex] = React.useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));

	return (
		<Panels
			index={index}
			noAnimation={boolean('noAnimation', Config, false)}
			noCloseButton={boolean('noCloseButton', Config, false)}
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
		>
			<Panel spotlightId="first-panel-container">
				<Header title="First Panel" />
				<Item onClick={goPrevious}>First</Item>
				<Item onClick={goNext}>Second</Item>
			</Panel>
			<Panel spotlightId="second-panel-container">
				<Header title="Second Panel" />
				<Item onClick={goNext}>Third</Item>
				<Item onClick={goPrevious}>First</Item>
			</Panel>
			<Panel spotlightId="third-panel-container">
				<Header title="Third Panel" />
				<Item onClick={goNext}>First</Item>
				<Item onClick={goPrevious}>Second</Item>
			</Panel>
		</Panels>
	);
};


storiesOf('Panels', module)
	.add(
		'Panels',
		() => (<BasicPanels />),
		{
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic Panels'
		}
	);



const MainPanel = () => {
	return (
		<Item>Main panel</Item>
	);
};
const Page1 = () => {
	return (
		<Item>Page1</Item>
	);
};
const Page2 = () => {
	return (
		<Item>Page2</Item>
	);
};
const EndPage = () => {
	return (
		<Item>End page</Item>
	);
};

const BreadcrumbPanelsBase  = kind({
	name: 'Panels',
	propTypes: {
		onNavigate: PropTypes.func
	},
	render: ({onNavigate, ...rest}) => {
		return (
			<BreadcrumbPanels {...rest} onSelectBreadcrumb={onNavigate} />
		);
	}
});

const RoutablePanels = Routable({navigate: 'onNavigate'}, BreadcrumbPanelsBase);

let appPath ='/settings'

const App = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {appPath: '/settings'};
	}

	onNavigate = ({path}) => {
		console.log(`path=${path} ${appPath}`);
		this.setState({appPath: path})
	}

	render() {
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
}

storiesOf('Panels', module)
	.add(
		'Route preserve focus',
		() => (
				<App />
		),
		{
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic Panels'
		}
	);
