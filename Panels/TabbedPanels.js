import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import LabeledIcon from '@enact/agate/LabeledIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Spottable from '@enact/spotlight/Spottable';

import Skinnable from '../Skinnable';

import Panels from './Panels';

import componentCss from './TabbedPanels.less';

const SpottableLabeledIcon = Spottable(LabeledIcon);

const TabBase = kind({
	name: 'Tab',
	styles: {
		css: componentCss,
		className: 'tab'
	},
	render: ({children, labelPosition, onClick, ...rest}) => {
		return (
			<Cell
				icon="star"
				{...rest}
				component={SpottableLabeledIcon}
				labelPosition={labelPosition}
				onClick={onClick}
			>
				{children}
			</Cell>
		);
	}
});
const Tab = Skinnable(TabBase);

const TabGroupBase = kind({
	name: 'TabGroup',
	styles: {
		css: componentCss,
		className: 'tabBar'
	},
	computed: {
		labelPosition: ({orientation, tabPosition}) => {
			// TODO: this keeps the label always between the icon and the panels, is it necessary?
			if (orientation === 'vertical') {
				if (tabPosition === 'before') {
					return 'after';
				} else {
					return 'before';
				}
			} else if (tabPosition === 'before') {
				return 'below';
			} else {
				return 'above';
			}
		}
	},
	render: ({afterTabs, beforeTabs, className, labelPosition, style, ...rest}) => {
		delete rest.tabPosition;

		return (

			<Layout orientation={rest.orientation} className={className} align="center" style={style}>
				{beforeTabs ? <Cell shrink>
					{beforeTabs}
				</Cell> : null}
				<Cell>
					<Layout
						{...rest}
						align="center center"
						childComponent={Tab}
						childSelect="onClick"
						component={Group}
						itemProps={{
							labelPosition,
							shrink: (rest.orientation === 'vertical')
						}}
						select="radio"
					/>
				</Cell>
				{afterTabs ? <Cell shrink>
					{afterTabs}
				</Cell> : null}
			</Layout>
		);
	}
});

TabGroupBase.defaultSlot = 'tabs';

const TabGroup = Skinnable(TabGroupBase);


const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: {
		index: PropTypes.number,
		tabPosition: PropTypes.string
		// tabs: PropTypes.oneOfType([TabGroup])
	},
	defaultProps: {
		index: 0,
		tabPosition: 'before'
	},
	styles: {
		css: componentCss,
		className: 'tabbed-panels enact-fit'
	},
	computed: {
		children: ({children, tabs}) => {
			// if there are children use them
			if (children) {
				return children;
			}
			// otherwise try to make children from the tabs' view and viewProps
			else if (tabs) {
				return tabs.map((tab, index) => {
					const {view: View, viewProps} = tab;
					return <View key={index} {...viewProps} />;
				});
			}
		},
		className: ({css, orientation, styler, tabPosition}) => styler.append(tabPosition == 'after' ? css.reverse : '', orientation == 'vertical' ? css.column : ''),
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical',
		tabs: ({tabs}) => tabs.map((tab, i) => {
			return {key: 'tab' + i, children: tab.title, icon: tab.icon};
		})
	},
	render: ({afterTabs, beforeTabs, children, css, index, onSelect, tabOrientation, tabPosition, tabs, ...rest}) => {
		return (
			<Layout {...rest}>
				<Cell
					afterTabs={afterTabs}
					beforeTabs={beforeTabs}
					className={css.tabs}
					component={TabGroup}
					onSelect={onSelect}
					orientation={tabOrientation}
					tabPosition={tabPosition}
					selected={index}
					shrink
				>
					{tabs}
				</Cell>
				<Cell
					className={css.panels}
					component={Panels}
					orientation={tabOrientation}
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

const TabbedPanels = Slottable({slots: ['tabs', 'afterTabs', 'beforeTabs']}, TabbedPanelsBase);

export default TabbedPanels;
export {TabbedPanels, TabbedPanelsBase};
