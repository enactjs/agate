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

import deprecate from '@enact/core/internal/deprecate';
import React from 'react';

import Icon from '../Icon';
import Item from '../Item';

import css from './IconItem.module.less';

const IconItemBase = deprecate(
	({children, icon, iconSize, titleIcon, ...rest}) => (
		<Item {...rest}>
			{icon ? (
				<Icon slot="slotBefore" className={css.iconBefore} size={iconSize}>{icon}</Icon>
			) : null}
			{children}
			{titleIcon ? (
				<Icon className={css.iconAfter} size={iconSize}>{titleIcon}</Icon>
			) : null}
		</Item>
	),
	{
		name: 'IconItem',
		replacedBy: 'Item'
	}
);

export default IconItemBase;
export {
	IconItemBase as IconItem,
	IconItemBase
};
