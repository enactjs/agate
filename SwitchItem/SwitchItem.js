/**
 * Provides Agate-ez-themed Item component and interactive toggle switch icon.
 *
 * @module agate-ez/SwitchItem
 * @exports SwitchItem
 */

import React from 'react';

import AgateSwitchItem from '@enact/agate/SwitchItem';
import AgateSwitch from '@enact/agate/Switch';

import componentCss from './SwitchItem.less';

const Switch = ({label, ...rest}) => (
	<div>
		<span className={componentCss.label}>{label}</span>
		<AgateSwitch {...rest} />
	</div>
);

/**
 * Renders an `Item` with a radio-dot component. Useful to show a selected state on an Item.
 *
 * @class SwitchItem
 * @memberof agate-ez/SwitchItem
 * @extends agate/SwitchItem.SwitchItem
 * @ui
 * @public
 */
const SwitchItem = ({label, ...rest}) => (
	<AgateSwitchItem
		{...rest}
		css={componentCss}
		iconComponent={<Switch label={label} />}
	/>
);

export default SwitchItem;
export {
	SwitchItem
};
