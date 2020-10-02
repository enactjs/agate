import kind from '@enact/core/kind';
import React from 'react';

import Marquee from '@enact/ui/Marquee';

import css from './Picker.module.less';

const PickerItemBase = kind({
	name: 'PickerItem',

	styles: {
		css,
		className: 'item',
		publicClassNames: true
	},

	computed: {
		className: ({children, styler}) => styler.append({numeric: !isNaN(Number(children))})
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
