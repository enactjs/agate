/**
 * Provides Moonstone-themed dial-like gauge component.
 *
 * @example
 * <Needle progress={0.5} backgroundProgress={0.75} />
 *
 * @module moonstone/Needle
 * @exports Needle
 * @exports NeedleBase
 * @exports NeedleDecorator
 */

import kind from '@enact/core/kind';
import UiNeedle from '@enact/ui/Needle';
// import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import React from 'react';

import needle from './assets/needle1.svg';

import componentCss from './Needle.module.less';

/**
 * Renders a moonstone-styled progress bar.
 *
 * @class NeedleBase
 * @memberof moonstone/Needle
 * @ui
 * @public
 */
const NeedleBase = kind({
	name: 'Needle',

	propTypes: /** @lends moonstone/Needle.NeedleBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `Needle` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		src: PropTypes.string
	},

	defaultProps: {
		src: needle
	},

	styles: {
		css: componentCss,
		publicClassNames: ['needle']
	},

	render: ({css, ...rest}) => {
		return (
			<UiNeedle
				{...rest}
				css={css}
			/>
		);
	}
});

export default NeedleBase;
export {
	NeedleBase as Needle,
	NeedleBase
};
