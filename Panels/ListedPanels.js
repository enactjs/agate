import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import {shape} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Item from '../Item';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import {CrossFadeArranger} from './Arrangers';
import {Panel} from './Panel';
import {Panels} from './Panels';

import componentCss from './ListedPanels.module.less';

/**
 * Listed Panels component.
 *
 * Usage:
 * ```
 * <ListedPanels
 *   items={[
 *     {title: 'Panel1'},
 *     {title: 'Panel2'}
 *   ]}
 * >
 *   <Panel>Hello Panel 1</Panel>
 *   <Panel>Hello Panel 2</Panel>
 * </ListedPanels>
 * ```
 *
 * @class ListedPanels
 * @memberof agate/Panels
 * @ui
 * @public
 */
const ListedPanelsBase = kind({
	name: 'ListedPanels',
	propTypes: /** @lends agate/Panels.ListedPanels.prototype */ {
		arranger: shape,
		closeButtonAriaLabel: PropTypes.string,
		css: PropTypes.object,
		duration: PropTypes.number,
		index: PropTypes.number,
		itemComponent: PropTypes.renderable,
		items: PropTypes.array,
		noAnimation: PropTypes.bool,
		onBack: PropTypes.func,
		onSelect: PropTypes.func
	},
	defaultProps: {
		arranger: CrossFadeArranger,
		index: 0,
		itemComponent: Item
	},
	styles: {
		css: componentCss,
		className: 'listedPanels enact-fit'
	},
	handlers: {
		onSelect: handle(
			adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
		)
	},
	computed: {
		listChildren: ({items, itemComponent: ItemComponent, onSelect}) => {
			if (items) {
				return (
					<Panel>
						<Scroller>
							{items.map((item, index) => {
								const {title: children, ...itemProps} = item;
								// eslint-disable-next-line react/jsx-no-bind
								return <ItemComponent key={index} onClick={() => onSelect({selected: index})} {...itemProps}>{children}</ItemComponent>;
							})}
						</Scroller>
					</Panel>);
			}
		}
	},
	render: ({
		arranger,
		children,
		css,
		duration,
		index,
		listChildren,
		noAnimation,
		...rest
	}) => {
		return (
			<Layout {...rest}>
				<Cell
					className={css.listPanel}
					size="30%"
				>
					{listChildren}
				</Cell>
				<Cell
					arranger={arranger}
					className={css.panels}
					component={Panels}
					cover="partial"
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

// Currently not documenting the base output since it's not exported from index.js
const ListedPanels = Changeable(
	{prop: 'index', change: 'onSelect'},
	Skinnable(ListedPanelsBase)
);

export default ListedPanels;
export {
	ListedPanels,
	ListedPanelsBase
};
