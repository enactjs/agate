import {adaptEvent, forward, handle} from '@enact/core/handle';
import {Cell, Layout} from '@enact/ui/Layout';
import {Changeable} from '@enact/ui/Changeable';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';

import TabGroup from '../TabGroup';

import Panels from './Panels';

import componentCss from './TabbedPanels.module.less';

/**
 * Tabbed Panels component.
 *
 * @class TabbedPanels
 * @memberof agate/Panels
 * @ui
 * @public
 */
const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: /** @lends agate/Panels.TabbedPanels.prototype */ {
		afterTabs: PropTypes.node,
		beforeTabs: PropTypes.node,
		css: PropTypes.object,
		index: PropTypes.number,
		noCloseButton: PropTypes.bool,
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),
		tabPosition: PropTypes.string,
		tabs: PropTypes.oneOfType([TabGroup])
	},
	defaultProps: {
		index: 0,
		noCloseButton: false,
		tabPosition: 'before'
	},
	styles: {
		css: componentCss,
		className: 'tabbedPanels enact-fit'
	},
	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},
	computed: {
		children: ({children, tabs}) => {
			// if there are children use them
			if (children) {
				return children;
			}
			// otherwise try to make children from the tabs' view and viewProps
			if (tabs) {
				return tabs.map((tab, index) => {
					const {view: View, viewProps} = tab;
					return <View key={index} {...viewProps} />;
				});
			}
		},
		className: ({css, orientation, styler, tabPosition}) => styler.append(tabPosition === 'after' ? css.reverse : '', orientation === 'vertical' ? css.column : ''),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical'
	},
	render: ({afterTabs, beforeTabs, children, className, css, index, noCloseButton, onSelect, orientation, tabOrientation, tabPosition, tabs, ...rest}) => {
		delete rest.disabled;

		return (
			<Layout
				className={className}
				orientation={orientation}
			>
				<Cell shrink>
					<TabGroup
						afterTabs={afterTabs}
						beforeTabs={beforeTabs}
						className={css.tabs}
						onSelect={onSelect}
						orientation={tabOrientation}
						tabs={tabs}
						tabPosition={tabPosition}
						selectedIndex={index}
					/>
				</Cell>
				<Cell
					className={css.panels}
					component={Panels}
					noCloseButton={noCloseButton}
					orientation={tabOrientation}
					index={index}
					{...rest}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

// Currently not documenting the base output since it's not exported from index.js
const TabbedPanels = Slottable(
	{slots: ['tabs', 'afterTabs', 'beforeTabs']},
	Changeable(
		{prop: 'index', change: 'onSelect'},
		TabbedPanelsBase
	)
);

export default TabbedPanels;
export {
	TabbedPanels,
	TabbedPanelsBase
};
