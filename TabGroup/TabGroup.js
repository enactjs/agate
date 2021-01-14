/**
 * Provides an Agate-themed tab group.
 *
 * @example
 * <TabGroup tabPosition={'before'} tabs={[{title: 'Home'},{title: 'Settings'}]} />
 *
 * @module agate/TabGroup
 * @exports TabGroup
 * @exports TabGroupBase
 * @exports TabGroupDecorator
 */

import kind from '@enact/core/kind';
import {cap} from '@enact/core/util';
import Group from '@enact/ui/Group';
import {Cell, Layout} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import LabeledIcon from '../LabeledIcon';
import Skinnable from '../Skinnable';
import ToggleButton from '../ToggleButton';

import componentCss from './TabGroup.module.less';

/**
 * A Tab component.
 *
 * @class TabBase
 * @memberof agate/TabGroup
 * @ui
 * @public
 */
const TabBase = kind({
	name: 'Tab',

	propTypes: /** @lends agate/TabGroup.TabBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `tab` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon displayed on the tab.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * The position of the label on the tab.
		 *
		 * @type {String}
		 * @public
		 */
		labelPosition: PropTypes.string,

		/**
		 * Called when the tab is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Orientation of the tab.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @public
		 */
		orientation: PropTypes.string,

		/**
		 * Provides a way to call special interface attention to the tab. It will be "featured"
		 * in some way by the theme's visual rules.
		 *
		 * @type {Boolean}
		 * @public
		 */
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
 * A Tab Group component.
 *
 * @class TabGroupBase
 * @memberof agate/TabGroup
 * @ui
 * @public
 */
const TabGroupBase = kind({
	name: 'TabGroup',

	propTypes: /** @lends agate/TabGroup.TabGroupBase.prototype */ {
		/**
		 * The position of the TabGroup related to the tab contents.
		 *
		 * @type {String}
		 * @required
		 */
		tabPosition: PropTypes.string.isRequired,

		/**
		 * The provided list of tabs.
		 *
		 * @type {Array}
		 * @required
		 * @public
		 */
		tabs: PropTypes.array.isRequired,

		/**
		 * Nodes to be inserted before the tabs.
		 *
		 * @type {Node}
		 * @public
		 */
		afterTabs: PropTypes.node,

		/**
		 * Nodes to be inserted after the tabs.
		 *
		 * @type {Node}
		 * @public
		 */
		beforeTabs: PropTypes.node,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `tabBar` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Orientation of the tabs.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @public
		 */
		orientation: PropTypes.string,

		/**
		 * Index of the selected tab.
		 *
		 * @type {Number}
		 * @required
		 */
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

/**
 * Applies Agate specific behaviors to [TabGroup]{@link agate/TabGroup.TabGroupBase} components.
 *
 * @hoc
 * @memberof agate/TabGroup
 * @mixes agate/Skinnable.Skinnable
 * @mixes ui/Slottable.Slottable
 * @public
 */
const TabGroupDecorator = compose(
	Skinnable,
	Slottable({slots: ['tabs', 'afterTabs', 'beforeTabs']})
);

/**
 * An Tab Group component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <TabGroup
 *   tabPosition={'before'}
 *   tabs={[
 *     {title: 'Home', icon: 'home'},
 *     {title: 'Settings', icon: 'setting'},
 *     {title: 'Theme', icon: 'display'}
 *   ]}
 * />
 * ```
 *
 * @class TabGroup
 * @memberof agate/TabGroup
 * @extends agate/TabGroup.TabGroupBase
 * @mixes agate/TabGroup.TabGroupDecorator
 * @ui
 * @public
 */
const TabGroup = TabGroupDecorator(TabGroupBase);

export default TabGroup;
export {
	TabGroup,
	TabGroupBase,
	TabGroupDecorator
};
