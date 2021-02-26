import kind from '@enact/core/kind';
import Marquee from '@enact/ui/Marquee';

import css from './Picker.module.less';

/**
 * Renders an Agate-styled Picker Item without any behavior.
 *
 * @class PickerItemBase
 * @memberof agate/PickerItem
 * @extends ui/Marquee.Marquee
 * @ui
 * @private
 */
const PickerItemBase = kind({
	name: 'PickerItem',

	styles: {
		css,
		className: 'item',
		publicClassNames: true
	},

	render: (props) => (
		<Marquee {...props} alignment="center" />
	)
});

/**
 * An Agate styled PickerItem with built-in support for marqueed text.
 *
 * @class PickerItem
 * @memberof agate/PickerItem
 * @extends agate/PickerItem.PickerItemBase
 * @ui
 * @private
 */
export default PickerItemBase;
export {
	PickerItemBase as PickerItem,
	PickerItemBase
};
