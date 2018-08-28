/**
 * Exports the {@link agate/Skinnable.Skinnable} Higher-order Component (HOC).
 *
 * @module agate/Skinnable
 * @public
 */

import hoc from '@enact/core/hoc';
import SkinnableBase, {withSkinnableProps} from '@enact/ui/Skinnable';

const defaultConfig = {
	skins: {
		main: 'agate'
	}
};

/**
 * This Higher-order Component is based on [ui/Skinnable]{@link ui/Skinnable.Skinnable} and comes
 * pre-configured for Agate's supported skins: "dark" (default) and "light". It is used to apply
 * the relevant skinning classes to each component and has been used to pre-select specific skins
 * for some components.
 *
 * @class Skinnable
 * @memberof agate/Skinnable
 * @hoc
 * @public
 */
const Skinnable = hoc(defaultConfig, SkinnableBase);

/**
 * Select a skin by name by specifying this property. This may be changed at runtime. All components
 * already use their defaults, but a skin may be changed via this prop or by using
 * {@link agate/Skinnable} directly and a config object.
 *
 * Example:
 * ```
 * <Button skin="light">
 * ```
 *
 * @name skin
 * @type {String}
 * @default 'dark'
 * @memberof agate/Skinnable.Skinnable
 * @instance
 * @public
 */

export default Skinnable;
export {
	Skinnable,
	withSkinnableProps
};
