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
 * @deprecated Will be removed in 2.0.0.
 * @private
 */

import kind from '@enact/core/kind';
import deprecate from '@enact/core/internal/deprecate';
import Pure from '@enact/ui/internal/Pure';
import UiToggleIcon from '@enact/ui/ToggleIcon';
import compose from 'ramda/src/compose';
import React from 'react';

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

	render: deprecate((props) => {
		return (
			<UiToggleIcon {...props} iconComponent={Icon} />
		);
	}, {
		name: 'agate/internal/ToggleIcon',
		until: '2.0.0'
	})
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
 * @ui
 * @private
 */
const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

export default ToggleIcon;
export {
	ToggleIcon,
	ToggleIconBase,
	ToggleIconDecorator
};
