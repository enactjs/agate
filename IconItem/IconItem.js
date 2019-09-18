/**
 * Agate styled item with an icon and a label below.
 *
 * @example
 * <IconItem icon="plus" label="Label">Hello IconItem</IconItem>
 *
 * @module agate/IconItem
 * @exports IconItem
 * @exports IconItemBase
 */

import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

// eslint-disable-next-line enact/prop-types
const IconItemBase = ({children, icon, titleIcon, ...rest}) => (
	<Item {...rest}>
		{icon ? (
			<Icon slot="slotBefore">{icon}</Icon>
		) : null}
		{children}
		{titleIcon ? (
			<Icon size="small">{titleIcon}</Icon>
		) : null}
	</Item>
);

export default IconItemBase;
export {
	IconItemBase as IconItem,
	IconItemBase
};
