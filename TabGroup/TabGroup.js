/**
 * Provides an Agate-themed tab group.
 *
 * @module agate/TabGroup
 * @exports TabGroup
 * @exports TabGroupBase
 */

import {cap} from '@enact/core/util';
import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import ToggleButton from '../ToggleButton';
import LabeledIcon from '../LabeledIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Spottable from '@enact/spotlight/Spottable';

import Skinnable from '../Skinnable';

import componentCss from './TabGroup.module.less';

const TabBase = kind({
	name: 'Tab',

	propTypes: {
		css: PropTypes.object,
		icon: PropTypes.string,
		labelPosition: PropTypes.string,
		onClick: PropTypes.func,
		orientation: PropTypes.string,
		selected: PropTypes.bool
	},

	defaultProps: {
		icon: 'star'
	},

	styles: {
		css: componentCss,
		className: 'tab'
	},

	computed: {
		className: ({selected, styler}) => styler.append({selected}),
		tabLabel: ({children, className, css, icon, labelPosition, orientation, selected}) => {
			let inline;
			if (orientation === 'horizontal') {
				inline = true;
			}

			if (className.includes('copper') || className.includes('cobalt')) {
				return (
					<div aria-label={children} className={css.labeledIcon} role="region">
						<ToggleButton
							icon={icon}
							selected={selected}
						/>
						{children}
					</div>
				);
			} else {
				return (
					<LabeledIcon
						className={css.labeledIcon}
						icon={icon}
						inline={inline}
						labelPosition={labelPosition}
					>
						{children}
					</LabeledIcon>
				);
			}
		}
	},

	render: ({onClick, orientation, style = {}, tabLabel, ...rest}) => {
		delete rest.labelPosition;
		delete rest.selected;

		if (orientation === 'horizontal') {
			style.textAlign = 'center';
		}
		return (
			<Cell {...rest} style={style} onClick={onClick}>
				{tabLabel}
			</Cell>
		);
	}
});
const Tab = Skinnable(Spottable(TabBase));

/**
 * TBD.
 *
 * @class TabGroup
 * @memberof agate/TabGroup
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const TabGroupBase = kind({
	name: 'TabGroup',

	propTypes: /** @lends agate/TabGroup.TabGroup.prototype */ {
		tabPosition: PropTypes.string.isRequired,
		tabs: PropTypes.array.isRequired,
		afterTabs: PropTypes.node,
		beforeTabs: PropTypes.node,
		css: PropTypes.object,
		orientation: PropTypes.string,
		selectedIndex: PropTypes.number
	},

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
		},
		children: ({tabs}) => tabs.map((tab, i) => {
			tab.key = 'tab' + i;
			tab.children = tab.title || tab.children;
			delete tab.title;
			return tab;
		})
	},

	render: ({afterTabs, beforeTabs, className, css, labelPosition, orientation, selectedIndex, style, ...rest}) => {
		delete rest.tabPosition;
		delete rest.tabs;

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
						component={Group}
						itemProps={{
							labelPosition,
							orientation,
							shrink: (orientation === 'vertical')
						}}
						orientation={orientation}
						select="radio"
						selected={selectedIndex}
						selectedProp="selected"
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

// Only documenting TabGroup since base is not useful for extension as-is
const TabGroup = Skinnable(Slottable({slots: ['tabs', 'afterTabs', 'beforeTabs']}, TabGroupBase));

export default TabGroup;
export {
	TabGroup,
	TabGroupBase
};
