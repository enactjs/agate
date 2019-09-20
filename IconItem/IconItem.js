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

import css from './IconItem.module.less';

// eslint-disable-next-line enact/prop-types
const IconItemBase = ({children, iconAfter, iconBefore, iconSize, ...rest}) => (
	<Item {...rest}>
		{iconBefore ? (
			<slotBefore>
				<Icon className={css.iconBefore} size={iconSize}>{iconBefore}</Icon>
			</slotBefore>
		) : null}
		{children}
		{iconAfter ? (
			<slotAfter>
				<Icon className={css.iconAfter} size={iconSize}>{iconAfter}</Icon>
			</slotAfter>
		) : null}
	</Item>
);

export default IconItemBase;
export {
	IconItemBase as IconItem,
	IconItemBase
};
