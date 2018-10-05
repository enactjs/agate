import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import React from 'react';

const propRemapper = (slotNames, props) => {
	if (!props.arrangement) return props;

	const origRest = {...props};

	slotNames.forEach(prop => {
		if (props.arrangement[prop] && props.arrangement[prop] !== prop) {
			// If there is a new destination for a prop, assign it there... sourceProp -> destinationProp
			props[prop] = origRest[props.arrangement[prop]];
		}
	});
	return props;
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
 * {slots: [`dayOne`, `dayTwo`]}
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
 * // Now with an arragement prop filled-in,
 * <RearrangeableComponent dayOne="swimming" dayTwo="hiking" arrangement={{dayOne: 'dayTwo', dayTwo: 'dayOne'}} />
 *
 * // The generated output from the above would be:
 * // <Component dayOne="hiking" dayTwo="swimming" />
 * ```
 *
 * @param  {Object} (config, Wrapped)      accepts a single key (`slots`)
 *
 * @return {Component}
 */
const Rearrangeable = hoc((config, Wrapped) => kind({
	name: 'Rearrangeable',
	render: (props) => {
		props = propRemapper(config.slots, props);
		// delete rest.arrangement;
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
