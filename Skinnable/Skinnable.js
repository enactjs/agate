/**
 * Exports the {@link agate/Skinnable.Skinnable} Higher-order Component (HOC).
 *
 * @module agate/Skinnable
 * @exports Skinnable
 * @public
 */

import hoc from '@enact/core/hoc';
import UiSkinnable from '@enact/ui/Skinnable';

const defaultConfig = {
	skins: {
		carbon: 'carbon',
		cobalt: 'cobalt',
		copper: 'copper',
		electro: 'electro',
		gallium: 'gallium',
		silicon: 'silicon',
		titanium: 'titanium'
	},
	allowedVariants: ['night', 'highContrast'],
	defaultVariants: null
};

/**
 * This Higher-order Component is based on [ui/Skinnable]{@link ui/Skinnable.Skinnable} and comes
 * pre-configured for Agate's supported skins: 'carbon', 'cobalt', 'copper', 'electro', 'gallium',
 * 'silicon', and 'titanium'. It is used to apply the relevant skinning classes to each component
 * and has been used to pre-select specific skins for some components.
 *
 * @class Skinnable
 * @hoc
 * @memberof agate/Skinnable
 * @public
 */
const Skinnable = hoc(defaultConfig, UiSkinnable);

/**
 * Select a skin by name by specifying this property. This may be changed at runtime. All components
 * already use their defaults, but a skin may be changed via this prop or by using
 * {@link agate/Skinnable} directly and a config object.
 *
 * Example:
 * ```
 * <Button skin="gallium" />
 * ```
 *
 * @name skin
 * @type {String}
 * @memberof agate/Skinnable.Skinnable
 * @instance
 * @public
 */

export default Skinnable;
export {
	Skinnable
};
