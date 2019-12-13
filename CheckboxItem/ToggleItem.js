/**
 * Agate styled toggleable item.
 *
 * @example
 * <ToggleItem component={Item} iconComponent={Icon} onToggle={console.log}>
 * 	Item Toggle
 * </ToggleItem>
 *
 * @module agate/ToggleItem
 * @exports ToggleItem
 * @exports ToggleItemDecorator
 */

import hoc from '@enact/core/hoc';
import Pure from '@enact/ui/internal/Pure';
import Spottable from '@enact/spotlight/Spottable';
import {ToggleItemBase, ToggleItemDecorator as UiToggleItemDecorator} from '@enact/ui/ToggleItem';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable/Skinnable';

/**
 * Adds interactive functionality to `ToggleItemBase`.
 *
 * @class ToggleItemDecorator
 * @memberof agate/ToggleItem
 * @mixes ui/ToggleItem.ToggleItemDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Marquee.MarqueeDecorator
 * @mixes agate/Skinnable
 * @hoc
 * @private
 */
const ToggleItemDecorator = hoc((config, Wrapped) => {
	return compose(
		Pure,
		UiToggleItemDecorator,
		Spottable,
		Skinnable
	)(Wrapped);
});

/**
 * A Agate-styled item with built-in support for toggling and `Spotlight` focus.
 *
 * This is not intended to be used directly, but should be extended by a component that will
 * customize this component's appearance by supplying an `iconComponent` prop.
 *
 * @class ToggleItem
 * @memberof agate/ToggleItem
 * @extends agate/ToggleItem.ToggleItemBase
 * @mixes agate/ToggleItem.ToggleItemDecorator
 * @ui
 * @private
 */
const ToggleItem = ToggleItemDecorator(ToggleItemBase);

export default ToggleItem;
export {
	ToggleItem,
	ToggleItemDecorator
};
