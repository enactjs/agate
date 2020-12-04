import {adaptEvent, forward, handle} from '@enact/core/handle';
import kind from '@enact/core/kind';
import {Changeable} from '@enact/ui/Changeable';
import {Cell, Layout} from '@enact/ui/Layout';
import {shape, SlideLeftArranger} from '@enact/ui/ViewManager';
import PropTypes from 'prop-types';
import React from 'react';

import Item from '../Item';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import {Panels} from './Panels';
import {Panel} from './Panel';
import {CrossFadeArranger} from './Arrangers';

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
		listIndex: PropTypes.number,
		noAnimation: PropTypes.bool,
		onBack: PropTypes.func,
		onSelect: PropTypes.func
	},
	defaultProps: {
		arranger: SlideLeftArranger,
		index: 0,
		listIndex: 0
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
		listChildren: ({items, onSelect}) => {
			if (items) {
				return items.map((item) => {
					return (<Panel>
						<Scroller>
							{item.map((i, index) => {
								const {title: children, itemProps} = i;
								// eslint-disable-next-line react/jsx-no-bind
								return <Item key={index} onClick={() => onSelect({selected: index})} {...itemProps}>{children}</Item>;
							})}
						</Scroller>
					</Panel>);
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
		listChildren,
		listIndex,
		onBack,
		...rest
	}) => {
		return (
			<Layout {...rest}>
				<Cell
					arranger={arranger}
					className={css.listPanels}
					component={Panels}
					cover="partial"
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton
					onBack={onBack}
					index={listIndex}
					size="30%"
				>
					{listChildren}
				</Cell>
				<Cell
					arranger={CrossFadeArranger}
					className={css.panels}
					component={Panels}
					duration={duration}
					noAnimation={noAnimation}
					noCloseButton
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
