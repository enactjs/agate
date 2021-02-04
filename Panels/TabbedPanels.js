import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';
import TabGroup from '../TabGroup';

import Panels from './Panels';

import componentCss from './TabbedPanels.module.less';

/**
 * Tabbed Panels component.
 *
 * Usage:
 * ```
 * <TabbedPanels
 *   orientation={'vertical'}
 *   tabs={[
 *     {title: 'Panel1', icon: 'netbook'},
 *     {title: 'Panel2', icon: 'aircirculation'}
 *   ]}
 * >
 *   <Panel>Hello Panel 1</Panel>
 *   <Panel>Hello Panel 2</Panel>
 * </TabbedPanels>
 * ```
 *
 * @class TabbedPanels
 * @memberof agate/Panels
 * @ui
 * @public
 */
const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: /** @lends agate/Panels.TabbedPanels.prototype */ {
		/**
		* Nodes to be included after the tabs.
		*
		* @type {Node}
		* @public
		*/
		afterTabs: PropTypes.node,

		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport.
		 *
		 * @see {@link ui/ViewManager.SlideRightArranger}
		 * @type {ui/ViewManager.Arranger}
		 * @public
		 */
		arranger: shape,

		/**
		* Nodes to be included before the tabs.
		*
		* @type {Node}
		* @public
		*/
		beforeTabs: PropTypes.node,

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @default 'Exit app'
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Duration of the animation (in ms) when transitioning between `Panel` components.
		 *
		 * @type {Number}
		 * @public
		 */
		duration: PropTypes.number,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 */
		index: PropTypes.number,

		/**
		 * Disables tabbed panels transition animations.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Indicates the close button will not be rendered on the top right corner.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onApplicationClose: PropTypes.func,

		/**
		 * Called with cancel/back key events.
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * The position of the tab.
		 *
		 * @type {String}
		 * @default 'before'
		 * @public
		 */
		tabPosition: PropTypes.string,

		/**
		 * The tab array.
		 *
		 * @type {Array}
		 * @public
		 */
		tabs: PropTypes.array
	},
	defaultProps: {
		closeButtonAriaLabel: 'Exit app',
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
	render: ({
		afterTabs,
		arranger,
		beforeTabs,
		children,
		closeButtonAriaLabel,
		css,
		duration,
		index,
		noAnimation,
		noCloseButton,
		onApplicationClose,
		onBack,
		onSelect,
		tabOrientation,
		tabPosition,
		tabs,
		...rest
	}) => {
		return (
			<Layout {...rest}>
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
					arranger={arranger}
					className={css.panels}
					closeButtonAriaLabel={closeButtonAriaLabel}
					component={Panels}
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton={noCloseButton}
					onApplicationClose={onApplicationClose}
					onBack={onBack}
					orientation={tabOrientation}
					index={index}
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
		Skinnable(TabbedPanelsBase)
	)
);

export default TabbedPanels;
export {
	TabbedPanels,
	TabbedPanelsBase
};
