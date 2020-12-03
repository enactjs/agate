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

import Panels from './Panels';

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
		items: PropTypes.array,
		noAnimation: PropTypes.bool,
		onBack: PropTypes.func,
		onSelect: PropTypes.func
	},
	defaultProps: {
		index: 0
	},
	styles: {
		css: componentCss,
		className: 'listedPanels enact-fit'
	},
	computed: {
		listItems: ({items, onSelect}) => {
			const handleClick = () => handle(
				adaptEvent(({selected}) => ({index: selected}), forward('onSelect'))
			);
			if (items) {
				return items.map((item, index) => {
					const {title: children, itemProps} = item;
					return <Item key={index} onClick={() => handleClick(index)} {...itemProps}>{children}</Item>;
				});
			}
		}
	},
	render: ({
		arranger,
		children,
		css,
		duration,
		index,
		noAnimation,
		listItems,
		onBack,
		...rest
	}) => {
		return (
			<Layout {...rest}>
				<Cell
					arranger={arranger}
					className={css.listPanels}
					component={Panels}
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton
					onBack={onBack}
					size="30%"
				>
					<Scroller>
						{listItems}
					</Scroller>
				</Cell>
				<Cell
					arranger={arranger}
					className={css.panels}
					component={Panels}
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton
					onBack={onBack}
					index={index}
					size="70%"
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
