import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';

import Panels from './Panels';

import componentCss from './TabbedPanels.less';

const Tab = kind({
	name: 'Tab',
	render: ({onClick, title}) => {
		return (
			<Cell onClick={onClick}>
				{title}
			</Cell>
		);
	}
});

const TabGroup = kind({
	name: 'TabGroup',
	render: ({...rest}) => {
		return(
			<Layout
				{...rest}
				childComponent={Tab}
				childSelect='onClick'
				component={Group}
				select="radio"
			/>
		);
	}
});

TabGroup.defaultSlot = 'tabs';

const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: {
		index: PropTypes.number,
		// tabs: PropTypes.oneOfType([TabGroup])
	},
	defaultProps: {
		index: 0
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
		}
	},
	render: ({children, css, index, onSelect, tabOrientation, tabs, ...rest}) => {
		return (
			<Layout {...rest}>
				<Cell
					className={css.tabs}
					component={TabGroup}
					onSelect={onSelect}
					orientation={tabOrientation}
					selected={index}
					shrink
				>
					{tabs}
				</Cell>
				<Cell
					className={css.panels}
					component={Panels}
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

const TabbedPanels = Slottable({slots: ['tabs']}, TabbedPanelsBase);

export default TabbedPanels;
export {TabbedPanels, TabbedPanelsBase};
