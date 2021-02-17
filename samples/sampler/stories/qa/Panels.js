import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import Routable, {Route, Linkable} from '@enact/ui/Routable';
import {storiesOf} from '@storybook/react';
import {handle, forward} from '@enact/core/handle';
import kind from "@enact/core/kind";
import {clamp} from '@enact/core/util';

import Button from "@enact/agate/Button";
import Header from '@enact/agate/Header';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import {Panels, Panel, BreadcrumbPanels} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';
import * as PropTypes from "prop-types";

import componentCss from './MenuItem.module.less';

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const BasicPanels = () => {
	const [index, setIndex] = React.useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));
	const goFirst = () => setIndex(0);
	const goThird = () => setIndex(2);

	return (
		<Panels
			index={index}
			noAnimation={boolean('noAnimation', Config, false)}
			noCloseButton={boolean('noCloseButton', Config, false)}
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
		>
			<Panel>
				<Header title="First Panel" />
				<Item onClick={goNext}>Second</Item>
				<Item onClick={goThird}>Third</Item>
			</Panel>
			<Panel>
				<Header title="Second Panel" />
				<Item onClick={goPrevious}>First</Item>
				<Item onClick={goNext}>Third</Item>
			</Panel>
			<Panel>
				<Header title="Third Panel" />
				<Item onClick={goFirst}>First</Item>
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

const MenuItemBase = kind({
	name: 'MenuItem',

	propTypes: {
		css: PropTypes.object,
		icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	defaultProps: {
		disabled: false,
		invisible: false
	},

	styles: {
		css: componentCss,
		className: 'menuItem'
	},

	handlers: {
		onClick: handle(
			forward('onClick')
		)
	},

	computed: {
		iconBefore: ({icon}) => {
			if (!icon) return;

			return (<Button size="large" backgroundOpacity="lightOpaque" icon={icon} />);
		}
	},

	render: ({css, iconBefore, invisible, disabled, ...rest}) => {
		return (
			(invisible)? null :
			<Item
				css={css}
				{...rest}
				disabled={disabled}
				slotAfter={
					<Icon size="small">arrowlargeright</Icon>
				}
				slotBefore={iconBefore}
			/>
		);
	}
});

const LinkedMenuItem = Linkable(MenuItemBase);

const MenuItem = ({...rest}) => {
	if (!rest.path) rest.path = '';
	return (
		<LinkedMenuItem {...rest} />
	);
};

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Panel spotlightId="main-panel-container">
			<Scroller>
				<MenuItem path="./page1">Pages</MenuItem>
				<MenuItem path="./page2">General</MenuItem>
			</Scroller>
		</Panel>
	)
});

const Page1 = kind({
	name: 'Page',

	render: () => (
    <Panel spotlightId="page1-container">
      <Scroller>
          <MenuItem path="./endPage">Page1</MenuItem>
          <MenuItem path="./endPage">Page2</MenuItem>
      </Scroller>
    </Panel>
	)
});

const Page2 = kind({
	name: 'Page',

	render: () => (
    <Panel spotlightId="page2-container">
      <Scroller>
          <MenuItem path="./endPage">Page1</MenuItem>
          <MenuItem path="./endPage">Page2</MenuItem>
      </Scroller>
    </Panel>
	)
});

const EndPage = kind({
	name: 'Page',

	render: () => (
    <div>
        <h1>EndPage</h1>
    </div>
	)
});

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

const App = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {appPath: '/settings'};
	}

	onNavigate = ({path}) => {
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
			text: 'Routable panels'
		}
	);
