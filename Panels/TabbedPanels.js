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

const TabBase = kind({
	name: 'Tab',
	styles: {
		css: componentCss,
		className: 'tab'
	},
	render: ({children, css, icon = 'star', labelPosition, onClick, orientation, style = {}, ...rest}) => {
		let inline;
		if (orientation === 'horizontal') {
			style.textAlign = 'center';
			inline = true;
		}
		return (
			<Cell {...rest} style={style} onClick={onClick}>
				<LabeledIcon
					className={css.labeledIcon}
					icon={icon}
					inline={inline}
					labelPosition={labelPosition}
				>
					{children}
				</LabeledIcon>
			</Cell>
		);
	}
});
const Tab = Skinnable(Spottable(TabBase));

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

	render: ({afterTabs, beforeTabs, className, css, labelPosition, orientation, style, tabEndStyle, tabGroupStyle, ...rest}) => {
		delete rest.tabPosition;

		return (
			<Layout orientation={orientation} className={className} align="stretch" style={style}>
				{beforeTabs ? <Cell className={css.tabEnds} shrink>
					{beforeTabs}
				</Cell> : null}
				<Cell>
					<Layout
						{...rest}
						className={css.tabGroup}
						align="stretch center"
						childComponent={Tab}
						childSelect="onClick"
						component={Group}
						itemProps={{
							labelPosition,
							orientation,
							shrink: (orientation === 'vertical')
						}}
						orientation={orientation}
						select="radio"
					/>
				</Cell>
				{afterTabs ? <Cell className={css.tabEnds} shrink>
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
