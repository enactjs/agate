/**
 * Provides behaviors for rearrangeable UIs
 *
 * @module agate/Rearrangeable
 * @exports Rearrangeable
 * @public
 */

import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import React from 'react';

const propRemapper = (arrangementProp, slotNames, props) => {
	if (!props[arrangementProp]) return props;

	const origRest = {...props};

	slotNames.forEach(prop => {
		if (props[arrangementProp][prop] && props[arrangementProp][prop] !== prop) {
			// If there is a new destination for a prop, assign it there... sourceProp -> destinationProp
			props[prop] = origRest[props[arrangementProp][prop]];
		}
	});
	return props;
};

/**
 * Default config for `Rearrangeable`.
 *
 * @memberof agate/Rearrangeable.Rearrangeable
 * @hocconfig
 * @public
 */
const defaultConfig = /** @lends agate/Rearrangeable.Rearrangeable.defaultConfig */ {
	/**
	 * The prop name for the object sent to the wrapped component containing the arrangement object.
	 * This DOES NOT apply to the incoming arrangement prop name.
	 *
	 * @type {String}
	 * @default 'arrangement'
	 */
	arrangementProp: 'arrangement',

	/**
	 * Array of remappable slot names.
	 *
	 * @type {String[]}
	 */
	slots: null
};

/**
 * A hoc to remap props to different props. Provide an `arrangement` prop which is a map of keys
 * relating to destination prop names and values related to the props to send to the key.
 *
 * In the `config` for this HOC, provide a `slots` key which is set to an array listing any prop
 * names you intend to be remappable. For example, if your component has the following props:
 * `dayOne`, `dayTwo`, and `dayThree`, and you only want `dayOne` and `dayTwo` to have the
 * capability to be swapped or reassigned, the config and array should look like the following:
 *
 * ```
 * {slots: ['dayOne', 'dayTwo']}
 * ```
 *
 * Now the this HOC is configured, it can act on the `arrangement` prop supplied at runtime.
 * Any slots provided in the config can be reassigned in the arrangement mapping. To extend our
 * above example, the incoming props being the following:
 *
 * ```
 * const RearrangeableComponent = Rearrangeable({slots: [`dayOne`, `dayTwo`]}, Component);
 *
 * <RearrangeableComponent dayOne="swimming" dayTwo="hiking" />
 * // The generated output from the above would be:
 * // <Component dayOne="swimming" dayTwo="hiking" />
 *
 * // Now with an arrangement prop filled-in,
 * <RearrangeableComponent dayOne="swimming" dayTwo="hiking" arrangement={{dayOne: 'dayTwo', dayTwo: 'dayOne'}} />
 *
 * // The generated output from the above would be:
 * // <Component dayOne="hiking" dayTwo="swimming" />
 * ```
 *
 * @memberof agate/Rearrangeable
 * @hoc
 * @public
 */
const Rearrangeable = hoc(defaultConfig, (config, Wrapped) => kind({
	name: 'Rearrangeable',
	render: (props) => {
		props = propRemapper(config.arrangementProp, config.slots, props);
		return (
			<Wrapped {...props} />
		);
	}
}));

export default Rearrangeable;
export {
	Rearrangeable,
	propRemapper
};
