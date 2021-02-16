import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {Route} from '@enact/ui/Routable';
import {storiesOf} from '@storybook/react';

import {Panels, Panel, BreadcrumbPanels} from '@enact/agate/Panels';
import Item, {ItemBase} from '@enact/agate/Item';
import {clamp} from '@enact/core/util';

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
			// onApplicationClose={action('onClose')}
			// onBack={goPrevious}
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
    >
      <Panel spotlightId="first-panel-container">
        <Item onClick={goNext}>First</Item>
        <Item onClick={goPrevious}>Second</Item>
      </Panel>
      <Panel spotlightId="second-panel-container">
        <Item onClick={goNext}>First</Item>
        <Item onClick={goPrevious}>Second</Item>
      </Panel>
      <Panel spotlightId="third-panel-container">
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




  // const BreadcrumbsPanels = () => {
  //   const [index, setIndex] = React.useState(0);
  //   const goNext = () => setIndex(clamp(0, 2, index + 1));
  //   const goPrevious = () => setIndex(clamp(0, 2, index - 1));
  
  //   return (
  //     <BreadcrumbPanels 
  //       // className={css.panels} 
  //       // path={this.state.appPath} 
  //       index={index} 
  //       animate={false}
  //       noAnimation={boolean('noAnimation', Config, false)}
  //       // onNavigate={this.onNavigate} 
  //       cover="partial">
	// 			<Route path="settings" component={MainPanel}>
	// 				<Route path="page1" component={Page1}>
	// 					<Route path="endPage" component={EndPage} />
	// 				</Route>
	// 				<Route path="page2" component={Page2}>
	// 					<Route path="endPage" component={EndPage} />
	// 				</Route>
	// 			</Route>
	// 		</BreadcrumbPanels>
  //   );
  // };

const MainPanel = () => {
  return (
    <Item>Main panel</Item>
  )
}
const Page1 = () => {
  return (
    <Item>Page1</Item>
  )
}
const Page2 = () => {
  return (
    <Item>Page2</Item>
  )
}
const EndPage = () => {
  return (
    <Item>End page</Item>
  )
}

storiesOf('Panels', module)
	.add(
		'Route preserve focus',
    () => (
      <BreadcrumbPanels 
        // className={css.panels} 
        // path={this.state.appPath} 
        index="0" 
        // onNavigate={this.onNavigate} 
        cover="partial">
				<Route path="settings" component={MainPanel}>
					<Route path="page1" component={Page1}>
						<Route path="endPage" component={EndPage} />
					</Route>
					<Route path="page2" component={Page2}>
						<Route path="endPage" component={EndPage} />
					</Route>
				</Route>
			</BreadcrumbPanels>
      // <BreadcrumbsPanels />
    ),
    {
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic Panels'
		}
	);
