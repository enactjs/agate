import {adaptEvent, forward, handle} from '@enact/core/handle';
import {cap} from '@enact/core/util';
import {Cell, Layout} from '@enact/ui/Layout';
import {Changeable} from '@enact/ui/Changeable';
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

const SpottableTab = Spottable('div');

const TabBase = kind({
	name: 'Tab',
	styles: {
		css: componentCss,
		className: 'tab'
	},
	render: ({children, icon, labelPosition, onClick, ...rest}) => {
		return (
			<Cell
				{...rest}
				component={SpottableTab}
				onClick={onClick}
			>
				<div className={componentCss.label}>
					<LabeledIcon
						labelPosition={labelPosition}
						icon={icon}
					>
						{children}
					</LabeledIcon>
				</div>
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
		className: ({orientation, tabPosition, styler}) => styler.append(orientation, ['position' + cap(tabPosition)]),
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

	render: ({afterTabs, beforeTabs, className, labelPosition, style, tabEndStyle, tabGroupStyle, ...rest}) => {
		delete rest.tabPosition;

		return (
			<Layout orientation={rest.orientation} className={className} align="stretch" style={style}>
				{beforeTabs ? <Cell className={componentCss.tabEnds} shrink>
					{beforeTabs}
				</Cell> : null}
				<Cell>
					<Layout
						{...rest}
						className={componentCss.tabGroup}
						align="stretch center"
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
				{afterTabs ? <Cell className={componentCss.tabEnds} shrink>
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
				<Cell shrink>
					<TabGroup
						afterTabs={afterTabs}
						beforeTabs={beforeTabs}
						className={css.tabs}
						onSelect={onSelect}
						orientation={tabOrientation}
						tabPosition={tabPosition}
						selected={index}
					>
						{tabs}
					</TabGroup>
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

const TabbedPanels = Slottable(
	{slots: ['tabs', 'afterTabs', 'beforeTabs']},
	Changeable(
		{prop: 'index', change: 'onSelect'},
		TabbedPanelsBase
	)
);

export default TabbedPanels;
export {TabbedPanels, TabbedPanelsBase};
