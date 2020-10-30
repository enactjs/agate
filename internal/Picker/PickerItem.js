import kind from '@enact/core/kind';
import React from 'react';

import Marquee from '@enact/ui/Marquee';

import css from './Picker.module.less';

/**
 * Renders an Agate-styled Picker Item without any behavior.
 *
 * @class PickerItemBase
 * @memberof agate/PickerItem
 * @ui
 * @public
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

export default PickerItemBase;
export {
	PickerItemBase as PickerItem,
	PickerItemBase
};
