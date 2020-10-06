/**
 * Agate styled toggle icon.
 *
 * @example
 * <ToggleIcon selected>check</ToggleIcon>
 *
 * @module agate/ToggleIcon
 * @exports ToggleIcon
 * @exports ToggleIconBase
 * @exports ToggleIconDecorator
 * @private
 */

import kind from '@enact/core/kind';
import React from 'react';
import compose from 'ramda/src/compose';

import Pure from '@enact/ui/internal/Pure';
import UiToggleIcon from '@enact/ui/ToggleIcon';

import Icon from '../../Icon/Icon';
import Skinnable from '../../Skinnable/Skinnable';

/**
 * A component that indicates a boolean state.
 *
 * @class ToggleIconBase
 * @memberof agate/ToggleIcon
 * @extends ui/ToggleIcon.ToggleIcon
 * @ui
 * @private
 */
const ToggleIconBase = kind({
	name: 'ToggleIcon',

	render: (props) => {
		return (
			<UiToggleIcon {...props} iconComponent={Icon} />
		);
	}
});

/**
 * Agate-specific behaviors to apply to `ToggleIconBase`.
 *
 * @hoc
 * @memberof agate/ToggleIcon
 * @mixes agate/Skinnable.Skinnable
 * @private
 */
const ToggleIconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A customizable Agate starting point [Icon]{@link agate/Icon.Icon} that responds to the
 * `selected` prop.
 *
 * @class ToggleIcon
 * @memberof agate/ToggleIcon
 * @extends agate/ToggleIcon.ToggleIconBase
 * @mixes agate/ToggleIcon.ToggleIconDecorator
 * @private
 */
const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

export default ToggleIcon;
export {
	ToggleIcon,
	ToggleIconBase,
	ToggleIconDecorator
};
